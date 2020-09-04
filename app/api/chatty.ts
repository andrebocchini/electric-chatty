import formurlencoded from 'form-urlencoded';
import GetChattyResponse from '../types/GetChattyReponse';
import Credentials from '../types/Credentials';
import VerifyCredentialsResponse from '../types/VerifyCredentialsResponse';
import GenericSuccessResponse from '../types/GenericSuccessResponse';
import Thread from '../types/Thread';
import {
  rootPost,
  orderedPostsByThread,
  threadWithCalculatedPostDepths,
} from '../utils/threadUtils';
import WaitForEventResponse from '../types/WaitForEventResponse';
import GetNewestEventIdResponse from '../types/GetNewestEventIdResponse';
import { defaultHeaders, handleRequestErrors, handleApiErrors } from './common';

export function fetchThreads(threadIds?: number[]): Promise<Thread[]> {
  let url: string;

  if (threadIds && threadIds.length > 0) {
    url = `https://winchatty.com/v2/getThread?id=${threadIds[0]}`;
    for (let i = 1; i < threadIds.length; i += 1) {
      url = `${url},${threadIds[i]}`;
    }
  } else {
    url = 'https://winchatty.com/v2/getChatty';
  }

  return new Promise((resolve, reject) => {
    fetch(url, defaultHeaders)
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GetChattyResponse>(response))
      .then((response) => {
        const threads: Thread[] = [];

        response.threads.forEach((thread) => {
          const { posts, threadId } = thread;
          const root = rootPost(posts, threadId);

          let orderedThread: Thread = {
            threadId,
            root,
            posts: orderedPostsByThread(root, posts.slice()),
          };
          orderedThread = threadWithCalculatedPostDepths(orderedThread);
          threads.push(orderedThread);
        }, threads);

        return resolve(threads);
      })
      .catch((error) => reject(error));
  });
}

export function fetchThread(id: number): Promise<Thread> {
  return new Promise((resolve, reject) => {
    fetch(`https://winchatty.com/v2/getThread?id=${id}`, defaultHeaders)
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GetChattyResponse>(response))
      .then((json) => {
        if (json.threads.length <= 0) {
          throw new Error(`Failed to find thread with id ${id}`);
        }

        const response = json.threads[0];
        const { threadId } = response;
        const root = rootPost(response.posts, threadId);

        let orderedThread: Thread = {
          threadId,
          root,
          posts: response.posts = orderedPostsByThread(
            root,
            response.posts.slice()
          ),
        };
        orderedThread = threadWithCalculatedPostDepths(orderedThread);
        return resolve(orderedThread);
      })
      .catch((error) => reject(error));
  });
}

export function postComment(
  credentials: Credentials,
  parentId: number,
  comment: string
): Promise<GenericSuccessResponse> {
  return new Promise((resolve, reject) => {
    const requestBody = formurlencoded({
      username: credentials.username,
      password: credentials.password,
      parentId,
      text: comment,
    });

    fetch('https://winchatty.com/v2/postComment', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GenericSuccessResponse>(response))
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
}

export function postNewRootPost(
  credentials: Credentials,
  post: string
): Promise<GenericSuccessResponse> {
  return postComment(credentials, 0, post);
}

export function verifyCredentials(
  credentials: Credentials
): Promise<VerifyCredentialsResponse> {
  return new Promise((resolve, reject) => {
    const requestBody = formurlencoded(credentials);

    fetch('https://winchatty.com/v2/verifyCredentials', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<VerifyCredentialsResponse>(response))
      .then((json) => resolve(json))
      .catch((error) => reject(error));
  });
}

export function getNewestEventId(): Promise<GetNewestEventIdResponse> {
  return new Promise((resolve, reject) => {
    fetch('https://winchatty.com/v2/getNewestEventId', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<GetNewestEventIdResponse>(response))
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => reject(error));
  });
}

export function waitForEvent(eventId: number): Promise<WaitForEventResponse> {
  return new Promise((resolve, reject) => {
    fetch(`https://winchatty.com/v2/waitForEvent?lastEventId=${eventId}`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
    })
      .then(handleRequestErrors)
      .then((response) => handleApiErrors<WaitForEventResponse>(response))
      .then((json) => {
        return resolve(json);
      })
      .catch((error) => reject(error));
  });
}

export function lolPost(
  username: string,
  postId: number,
  tag: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const requestBody = formurlencoded({
      tag,
      who: username,
      what: postId,
      version: -1,
    });

    fetch('http://lmnopc.com/greasemonkey/shacklol/report.php', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: requestBody,
    })
      .then(handleRequestErrors)
      .then(async (response) => {
        const responseBody = await response.text();

        if (responseBody === 'ERROR! Who are you?') {
          throw new Error('You must be logged in to lol');
        }
        return resolve(responseBody);
      })
      .catch((error) => reject(error));
  });
}
