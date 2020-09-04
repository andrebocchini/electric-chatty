import Post from '../types/Post';
import Thread from '../types/Thread';
import dateDifferenceInHours from './dateUtils';

const MAX_THREAD_DURATION_IN_HOURS = 18;

export function isExpired(thread: Thread, now: Date) {
  const difference = dateDifferenceInHours(new Date(thread.root.date), now);
  return difference > 18;
}

export function rootPost(posts: Post[], threadId: number) {
  return posts.filter((post) => post.id === threadId)[0];
}

export function depthOfPost(post: Post, thread: Thread): number {
  let { parentId } = post;
  let depth = 0;

  while (parentId !== thread.threadId) {
    const filteredPosts = thread.posts.filter(
      // eslint-disable-next-line no-loop-func
      (currentPost: Post) => currentPost.id === parentId
    );

    if (filteredPosts.length > 0) {
      parentId = filteredPosts[0].parentId;
      depth += 1;
    } else {
      return depth;
    }
  }

  return depth;
}

export function threadWithCalculatedPostDepths(thread: Thread): Thread {
  // Deep copy
  const threadWithPostDepths = JSON.parse(JSON.stringify(thread));

  for (let i = 0; i < threadWithPostDepths.posts.length; i += 1) {
    const depth = depthOfPost(
      threadWithPostDepths.posts[i],
      threadWithPostDepths
    );

    threadWithPostDepths.posts[i].depth = depth;
  }

  return threadWithPostDepths;
}

export function firstDescendants(post: Post, posts: Post[]): Post[] {
  return posts.filter((current) => current.parentId === post.id);
}

export function orderedPostsByThread(root: Post, posts: Post[]): Post[] {
  const topLevel = firstDescendants(root, posts);
  let result: Post[] = [];

  topLevel.forEach((topLevelPost) => {
    result.push(topLevelPost);
    result = result.concat(orderedPostsByThread(topLevelPost, posts));
  }, result);

  return result;
}

export function hoursUntilExpiration(postTime: Date, currentTime: Date) {
  return (
    MAX_THREAD_DURATION_IN_HOURS -
    dateDifferenceInHours(new Date(postTime), currentTime)
  );
}

export function percentExpired(hoursUntilExpires: number) {
  return Math.round(
    ((MAX_THREAD_DURATION_IN_HOURS - hoursUntilExpires) * 100) /
      MAX_THREAD_DURATION_IN_HOURS
  );
}

export function replaceThread(threads: Thread[], thread: Thread) {
  for (let i = 0; i < threads.length; i += 1) {
    if (threads[i].threadId === thread.threadId) {
      threads[i] = thread;
      return threads;
    }
  }

  return threads;
}

export function mostRecentUpdate(thread: Thread) {
  let { date } = thread.root;

  thread.posts.forEach((post) => {
    if (post.date > date) {
      date = post.date;
    }
  }, date);

  return date;
}
