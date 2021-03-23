import fetchMock from 'fetch-mock';
import Store from 'electron-store';
import {
  fetchThread,
  fetchThreads,
  postComment,
  postNewRootPost,
  verifyCredentials,
  getNewestEventId,
  lolPost,
  waitForEvent,
} from './chatty';
import { postRootPost } from '../features/chatty/chattySlice';
import Thread from '../types/Thread';
import GetNewestEventIdResponse from '../types/GetNewestEventIdResponse';
import WaitForEventResponse from '../types/WaitForEventResponse';

jest.mock('electron-store');

Store as jest.Mocked<typeof Store>;

describe('Chatty API', () => {
  beforeEach(() => {
    fetchMock.restore();
  });

  it('should return a list of all chatty threads', async () => {
    const successResponse = {
      threads: [
        {
          threadId: 39790577,
          posts: [
            {
              id: 39790577,
              threadId: 39790577,
              parentId: 0,
              author: ']pm[chem',
              category: 'ontopic',
              date: '2020-07-17T21:09:00Z',
              body:
                '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
              lols: [
                {
                  tag: 'lol',
                  count: 5,
                },
              ],
            },
            {
              id: 39791857,
              threadId: 39790577,
              parentId: 39790577,
              author: 'gmoney',
              category: 'ontopic',
              date: '2020-07-18T09:53:00Z',
              body: "It doesn't make any sense. Not funny.",
              lols: [],
            },
            {
              id: 39791122,
              threadId: 39790577,
              parentId: 39790577,
              author: 'OverloadUT',
              category: 'ontopic',
              date: '2020-07-18T00:19:00Z',
              body:
                'What’s the word for finding it funny but also horribly crushingly depressing?',
              lols: [],
            },
          ],
        },
      ],
    };
    const expected: Thread[] = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body:
            '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        posts: [
          {
            id: 39791857,
            threadId: 39790577,
            parentId: 39790577,
            author: 'gmoney',
            category: 'ontopic',
            date: '2020-07-18T09:53:00Z',
            depth: 0,
            body: "It doesn't make any sense. Not funny.",
            lols: [],
          },
          {
            id: 39791122,
            threadId: 39790577,
            parentId: 39790577,
            author: 'OverloadUT',
            category: 'ontopic',
            date: '2020-07-18T00:19:00Z',
            depth: 0,
            body:
              'What’s the word for finding it funny but also horribly crushingly depressing?',
            lols: [],
          },
        ],
      },
    ];
    fetchMock.get('https://winchatty.com/v2/getChatty', successResponse);
    const response = await fetchThreads();
    expect(response).toEqual(expected);
  });

  it('should return a list of threads passed in', async () => {
    const successResponse = {
      threads: [
        {
          threadId: 39790577,
          posts: [
            {
              id: 39790577,
              threadId: 39790577,
              parentId: 0,
              author: ']pm[chem',
              category: 'ontopic',
              date: '2020-07-17T21:09:00Z',
              body:
                '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
              lols: [
                {
                  tag: 'lol',
                  count: 5,
                },
              ],
            },
            {
              id: 39791857,
              threadId: 39790577,
              parentId: 39790577,
              author: 'gmoney',
              category: 'ontopic',
              date: '2020-07-18T09:53:00Z',
              body: "It doesn't make any sense. Not funny.",
              lols: [],
            },
            {
              id: 39791122,
              threadId: 39790577,
              parentId: 39790577,
              author: 'OverloadUT',
              category: 'ontopic',
              date: '2020-07-18T00:19:00Z',
              body:
                'What’s the word for finding it funny but also horribly crushingly depressing?',
              lols: [],
            },
          ],
        },
      ],
    };
    const expected: Thread[] = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body:
            '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        posts: [
          {
            id: 39791857,
            threadId: 39790577,
            parentId: 39790577,
            author: 'gmoney',
            category: 'ontopic',
            date: '2020-07-18T09:53:00Z',
            depth: 0,
            body: "It doesn't make any sense. Not funny.",
            lols: [],
          },
          {
            id: 39791122,
            threadId: 39790577,
            parentId: 39790577,
            author: 'OverloadUT',
            category: 'ontopic',
            date: '2020-07-18T00:19:00Z',
            depth: 0,
            body:
              'What’s the word for finding it funny but also horribly crushingly depressing?',
            lols: [],
          },
        ],
      },
    ];
    fetchMock.get(
      'https://winchatty.com/v2/getThread?id=39790577',
      successResponse
    );
    const response = await fetchThreads([39790577]);
    expect(response).toEqual(expected);
  });

  it('should fail to return a list of chatty threads due to request error', async () => {
    fetchMock.get('https://winchatty.com/v2/getChatty', 400);
    await expect(fetchThreads()).rejects.toThrow();
  });

  it('should fail to return a list of chatty threads due to API error', async () => {
    const failResponse = {
      error: true,
      code: 'ERR_ARGUMENT',
      message: 'Some error message',
    };

    fetchMock.get('https://winchatty.com/v2/getChatty', failResponse);
    await expect(fetchThreads()).rejects.toThrow();
  });

  it('should post a comment successfully', async () => {
    const successResponse = { result: 'sucess' };
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/postComment', successResponse);
    const response = await postComment(credentials, 39790577, 'post');
    expect(response).toEqual(successResponse);
  });

  it('should fail to post a comment due to request error', async () => {
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/postComment', 400);
    await expect(postComment(credentials, 39790577, 'post')).rejects.toThrow();
  });

  it('should fail to post a comment due to API error', async () => {
    const failResponse = {
      error: true,
      code: 'ERR_ARGUMENT',
      message: 'Some error message',
    };
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/postComment', failResponse);
    await expect(postComment(credentials, 39790577, 'post')).rejects.toThrow();
  });

  it('should post a root post successfully', async () => {
    const successResponse = { result: 'sucess' };
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/postComment', successResponse);
    const response = await postNewRootPost(credentials, 'post');
    expect(response).toEqual(successResponse);
  });

  it('should fail to post a root post due to request error', async () => {
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/postComment', 400);
    await expect(postRootPost(credentials, 'post')).rejects.toThrow();
  });

  it('should fail to post a root post due to API error', async () => {
    const failResponse = {
      error: true,
      code: 'ERR_ARGUMENT',
      message: 'Some error message',
    };
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/postComment', failResponse);
    await expect(postNewRootPost(credentials, 'post')).rejects.toThrow();
  });

  it('should verify credentials successfully', async () => {
    const successResponse = { isValid: true, isMderator: true };
    const credentials = { username: 'username', password: 'password' };

    fetchMock.post(
      'https://winchatty.com/v2/verifyCredentials',
      successResponse
    );
    const response = await verifyCredentials(credentials);
    expect(response).toEqual(successResponse);
  });

  it('should fail to validate credentials due to request error', async () => {
    const credentials = { username: '', password: '' };

    fetchMock.post('https://winchatty.com/v2/verifyCredentials', 400);
    await expect(verifyCredentials(credentials)).rejects.toThrow();
  });

  it('should fail to validate credentials', async () => {
    const failResponse = {
      error: true,
      code: 'ERR_ARGUMENT',
      message: "Missing argument 'username'.",
    };
    const credentials = { username: '', password: 'password' };

    fetchMock.post('https://winchatty.com/v2/verifyCredentials', failResponse);
    await expect(verifyCredentials(credentials)).rejects.toThrow();
  });

  it('should fetch a single thread successfully', async () => {
    const apiResponse = {
      threads: [
        {
          threadId: 39790577,
          posts: [
            {
              id: 39791142,
              threadId: 39790577,
              parentId: 39790577,
              author: 'Clay',
              category: 'ontopic',
              date: '2020-07-18T00:26:00Z',
              body: "she's pretty funny",
              lols: [],
            },
            {
              id: 39790577,
              threadId: 39790577,
              parentId: 0,
              author: ']pm[chem',
              category: 'ontopic',
              date: '2020-07-17T21:09:00Z',
              body:
                '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
              lols: [
                {
                  tag: 'lol',
                  count: 5,
                },
              ],
            },
          ],
        },
      ],
    };
    const expectedResponse: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: '2020-07-17T21:09:00Z',
        body:
          '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
        lols: [
          {
            tag: 'lol',
            count: 5,
          },
        ],
      },
      posts: [
        {
          id: 39791142,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Clay',
          category: 'ontopic',
          date: '2020-07-18T00:26:00Z',
          depth: 0,
          body: "she's pretty funny",
          lols: [],
        },
      ],
    };
    fetchMock.get(
      'https://winchatty.com/v2/getThread?id=39790577',
      apiResponse
    );
    const response = await fetchThread(39790577);
    expect(response).toEqual(expectedResponse);
  });

  it('should fail to fetch a thread with an id that does not exist', async () => {
    const apiResponse = {
      threads: [],
    };
    fetchMock.get(
      'https://winchatty.com/v2/getThread?id=39790577',
      apiResponse
    );
    await expect(fetchThread(39790577)).rejects.toThrow();
  });

  it('should fetch the newest event id', async () => {
    const apiResponse: GetNewestEventIdResponse = {
      eventId: 1,
    };

    fetchMock.get('https://winchatty.com/v2/getNewestEventId', apiResponse);

    expect(await getNewestEventId()).toEqual(apiResponse);
  });

  it('should receive new events succesfully', async () => {
    const apiResponse: WaitForEventResponse = {
      lastEventId: 2,
      events: [
        {
          eventId: 23,
          eventDate: 'date',
          eventType: 'category',
          eventData: {
            postId: 1,
            category: 'category',
          },
        },
      ],
      tooManyEvents: false,
    };

    fetchMock.get(
      'https://winchatty.com/v2/waitForEvent?lastEventId=1',
      apiResponse
    );

    expect(await waitForEvent(1)).toEqual(apiResponse);
  });

  it('should lol a post successfully', async () => {
    const credentials = { username: 'username', password: 'password' };
    const success = {
      status: '1',
      data: {
        notifications:
          '<div class="gamification-notifcation">\n\t<ul>\n\t\t\t\t\t<li class="active">\n\t<span class="notification-wrapper">\n\t\t<span class="points">\n\t\t\t+1\t\t</span>\n\t\t<span class="message">\n\t\t\tWoohoo! You just lol\'d a post\t\t</span>\n\t</span>\n</li>\n\t\t\t</ul>\n</div>\n',
      },
      message: '',
    };

    fetchMock.post('https://winchatty.com/v2/lol', success);
    const response = await lolPost(credentials, 39790577, 'lol');
    expect(response).toEqual(success);
  });

  it('should fail to lol a post', async () => {
    const credentials = { username: 'username', password: 'password' };
    const failure = {
      error: true,
      code: 'ERR_INVALID_LOGIN',
      message: 'You must be logged in to lol',
    };

    fetchMock.post('https://winchatty.com/v2/lol', failure);
    await expect(lolPost(credentials, 39790577, 'lol')).rejects.toThrowError(
      new Error('You must be logged in to lol')
    );
  });
});
