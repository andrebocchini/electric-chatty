import Event from '../types/Event';
import Thread from '../types/Thread';
import EventLolTagsUpdate from '../types/EventLolTagsUpdate';
import LOL from '../types/LOL';
import EventNewPost from '../types/EventNewPost';
import {
  orderedPostsByThread,
  threadWithCalculatedPostDepths,
  replaceThread,
} from './threadUtils';
import EventCategoryChange from '../types/EventCategoryChange';

function updateLolCount(newLol: LOL, existingLols: LOL[]): LOL[] {
  const updatedLols = existingLols;

  for (let i = 0; i < updatedLols.length; i += 1) {
    if (updatedLols[i].tag === newLol.tag) {
      updatedLols[i] = newLol;
      return updatedLols;
    }
  }

  updatedLols.push(newLol);
  return updatedLols;
}

function processLolCountUpdateEvent(event: Event, threads: Thread[]) {
  const updatedThreads = threads;
  const { updates } = event.eventData as EventLolTagsUpdate;

  updates.forEach((update) => {
    for (let i = 0; i < updatedThreads.length; i += 1) {
      const thread = updatedThreads[i];

      if (thread.threadId === update.postId) {
        thread.root.lols = updateLolCount(
          { tag: update.tag, count: update.count },
          thread.root.lols
        );
      } else {
        for (let j = 0; j < updatedThreads[i].posts.length; j += 1) {
          const post = updatedThreads[i].posts[j];

          if (post.id === update.postId) {
            post.lols = updateLolCount(
              { tag: update.tag, count: update.count },
              post.lols
            );
          }
        }
      }
    }
  });

  return updatedThreads;
}

function processNewPostEvent(event: Event, threads: Thread[]) {
  const { post } = event.eventData as EventNewPost;
  let updatedThreads = threads;

  if (post.parentId === 0) {
    updatedThreads.push({
      threadId: post.id,
      root: post,
      posts: [],
    });
    return updatedThreads;
  }

  let thread = updatedThreads.find((t) => t.threadId === post.threadId);

  if (thread) {
    const existingPost = thread.posts.find((p) => p.id === post.id);
    if (!existingPost) {
      thread.posts.push(post);
    }
    thread.posts = orderedPostsByThread(thread.root, thread.posts);
    thread = threadWithCalculatedPostDepths(thread);
    updatedThreads = replaceThread(updatedThreads, thread);
  }

  return updatedThreads;
}

function threadForPost(postId: number, threads: Thread[]) {
  for (const thread of threads) {
    if (thread.root.id === postId) return thread.threadId;

    for (const post of thread.posts) {
      if (post.id === postId) return thread.threadId;
    }
  }

  return undefined;
}

function processCategoryChangeEvent(event: Event, threads: Thread[]) {
  const updatedThreads = threads;
  const eventData = event.eventData as EventCategoryChange;

  if (!eventData) return updatedThreads;

  const threadId = threadForPost(eventData.postId, updatedThreads);
  const thread = updatedThreads.find((t) => t.threadId === threadId);

  if (!thread) return updatedThreads;

  if (thread.root.id === eventData?.postId) {
    thread.root.category = eventData.category;
    return updatedThreads;
  }

  for (const post of thread.posts) {
    if (post.id === eventData.postId) {
      post.category = eventData.category;
      return updatedThreads;
    }
  }

  return updatedThreads;
}

export default function processEvents(
  events: Event[],
  threads: Thread[]
): Thread[] {
  let updatedThreads = JSON.parse(JSON.stringify(threads));

  events.forEach((event) => {
    switch (event.eventType) {
      case 'lolCountsUpdate':
        updatedThreads = processLolCountUpdateEvent(event, updatedThreads);
        break;
      case 'newPost':
        updatedThreads = processNewPostEvent(event, updatedThreads);
        break;
      case 'categoryChange':
        updatedThreads = processCategoryChangeEvent(event, updatedThreads);
        break;
      default:
        break;
    }
  }, updatedThreads);

  return updatedThreads;
}

export function numberOfNewRootPosts(events: Event[]) {
  let count = 0;

  events.forEach((event) => {
    if (event.eventType === 'newPost') {
      const { post } = event.eventData as EventNewPost;
      if (post.parentId === 0) count += 1;
    }
  }, count);

  return count;
}

export function isEligibleForReSort(events: Event[]) {
  for (const event of events) {
    if (event.eventType === 'newPost' || event.eventType === 'categoryChange')
      return true;
  }

  return false;
}
