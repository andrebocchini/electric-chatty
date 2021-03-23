import moment from 'moment';
import Store from 'electron-store';
import * as chattyAPI from '../../api/chatty';
import reducer, {
  composingCommentReplyBegin,
  composingCommentReplyCancel,
  composingRootPostBegin,
  composingRootPostCancel,
  composingRootReplyBegin,
  composingRootReplyCancel,
  dismissCommentReplyError,
  dismissFetchThreadsError,
  dismissRootPostError,
  dismissRootReplyError,
  dismissTaggingPostError,
  fetchSelectedThread,
  fetchSelectedThreadBegin,
  fetchSelectedThreadFailure,
  fetchSelectedThreadSuccess,
  fetchThreadsBegin,
  fetchThreadsFailure,
  fetchThreadsSuccess,
  postCommentReplyBegin,
  postCommentReplyFailure,
  postCommentReplySuccess,
  postRootPostBegin,
  postRootPostFailure,
  postRootPostSuccess,
  postRootReplyBegin,
  postRootReplyFailure,
  postRootReplySuccess,
  selectThread,
  selectPost,
  updateFilter,
  fetchThreads,
  postCommentReply,
  postRootPost,
  postRootReply,
  getFetchThreadsError,
  getFilter,
  getIsComposingCommentReply,
  getIsComposingRootPost,
  getIsComposingRootReply,
  getIsFetchingThreads,
  getIsPostingCommentReply,
  getIsPostingRootPost,
  getIsPostingRootReply,
  getCommentReplyError,
  getRootPostError,
  getRootReplyError,
  getSelectedPost,
  getSelectedThread,
  getThreads,
  getFilteredThreads,
  getIsFetchingSingleThread,
  getIsTaggingPost,
  getTaggingPostError,
  tagPostBegin,
  tagPost,
  tagPostFailure,
  tagPostSuccess,
  pinThread,
  fetchPinnedThreadsSuccess,
  fetchPinnedThreadsFailure,
  fetchPinnedThreadsBegin,
  fetchPinnedThreads,
  getMode,
  getPinnedThreads,
  fetchSingleThreadBegin,
  fetchSingleThreadFailure,
  fetchSingleThreadSuccess,
  fetchSingleThread,
  fetchSelectedPinnedThreadBegin,
  fetchSelectedPinnedThreadFailure,
  fetchSelectedPinnedThreadSuccess,
  fetchSelectedPinnedThread,
  getIsFetchingSelectedThread,
  getSingleThreadNavigationStack,
  fetchNewestEventId,
  getLatestEventId,
  waitForEvents,
  sortThreads,
  fetchNewestEventIdBegin,
  fetchNewestEventIdFailure,
  fetchNewestEventIdSuccess,
  waitForEventsBegin,
  waitForEventsSuccess,
  waitForEventsFailure,
  getFetchEventsError,
  getIsUpdatedSinceLastSort,
  getNumberOfNewThreadsSinceLastSort,
  unpinThread,
} from './chattySlice';
import Thread from '../../types/Thread';
import Post from '../../types/Post';
import { mockState, mockStore } from '../../utils/testUtils';
import * as modes from '../../constants/modes';

jest.mock('electron-store');
jest.mock('../../api/chatty');

Store as jest.Mocked<typeof Store>;
const mockChattyAPI = chattyAPI as jest.Mocked<typeof chattyAPI>;

// Redux mocks

describe('Chatty synchronous actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle composingReplyBegin', () => {
    expect(composingCommentReplyBegin()).toEqual({
      payload: undefined,
      type: composingCommentReplyBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isComposingCommentReply: false,
    };
    expect(reducer(state, composingCommentReplyBegin)).toEqual({
      ...state,
      isComposingCommentReply: true,
    });
  });

  it('should handle composingReplyCancel', () => {
    expect(composingCommentReplyCancel()).toEqual({
      payload: undefined,
      type: composingCommentReplyCancel.type,
    });

    const state = {
      ...mockState.chatty,
      isComposingCommentReply: true,
      commentReplyError: 'error',
    };
    expect(reducer(state, composingCommentReplyCancel)).toEqual({
      ...state,
      isComposingCommentReply: false,
      commentReplyError: undefined,
    });
  });

  it('should handle composingRootPostBegin', () => {
    expect(composingRootPostBegin()).toEqual({
      payload: undefined,
      type: composingRootPostBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isComposingRootPost: false,
    };
    expect(reducer(state, composingRootPostBegin)).toEqual({
      ...state,
      isComposingRootPost: true,
    });
  });

  it('should handle composingRootPostCancel', () => {
    expect(composingRootPostCancel()).toEqual({
      payload: undefined,
      type: composingRootPostCancel.type,
    });

    const state = {
      ...mockState.chatty,
      getIsComposingRootPost: true,
      rootPostError: 'error',
    };
    expect(reducer(state, composingRootPostCancel)).toEqual({
      ...state,
      isComposingRootPost: false,
      rootPostError: undefined,
    });
  });

  it('should handle composingRootReplyBegin', () => {
    expect(composingRootReplyBegin()).toEqual({
      payload: undefined,
      type: composingRootReplyBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isComposingRootReply: false,
    };
    expect(reducer(state, composingRootReplyBegin)).toEqual({
      ...state,
      isComposingRootReply: true,
    });
  });

  it('should handle composingRootReplyCancel', () => {
    expect(composingRootReplyCancel()).toEqual({
      payload: undefined,
      type: composingRootReplyCancel.type,
    });

    const state = {
      ...mockState.chatty,
      isComposingCommentReply: true,
      rootReplyError: 'error',
    };
    expect(reducer(state, composingRootReplyCancel)).toEqual({
      ...state,
      isComposingRootReply: false,
      rootReplyError: undefined,
    });
  });

  it('should handle dismissCommentReplyError', () => {
    expect(dismissCommentReplyError()).toEqual({
      payload: undefined,
      type: dismissCommentReplyError.type,
    });

    const state = {
      ...mockState.chatty,
      commentReplyError: 'error',
    };
    expect(reducer(state, dismissCommentReplyError)).toEqual({
      ...state,
      commentReplyError: undefined,
    });
  });

  it('should handle dismissFetchThreadsError', () => {
    expect(dismissFetchThreadsError()).toEqual({
      payload: undefined,
      type: dismissFetchThreadsError.type,
    });

    const state = {
      ...mockState.chatty,
      fetchThreadsError: 'error',
    };
    expect(reducer(state, dismissFetchThreadsError)).toEqual({
      ...state,
      fetchThreadsError: undefined,
    });
  });

  it('should handle dismissRootPostError', () => {
    expect(dismissRootPostError()).toEqual({
      payload: undefined,
      type: dismissRootPostError.type,
    });

    const state = {
      ...mockState.chatty,
      rootPostError: 'error',
    };
    expect(reducer(state, dismissRootPostError)).toEqual({
      ...state,
      rootPostError: undefined,
    });
  });

  it('should handle dismissRootReplyError', () => {
    expect(dismissRootReplyError()).toEqual({
      payload: undefined,
      type: dismissRootReplyError.type,
    });

    const state = {
      ...mockState.chatty,
      rootReplyError: 'error',
    };
    expect(reducer(state, dismissRootReplyError)).toEqual({
      ...state,
      rootReplyError: undefined,
    });
  });

  it('should handle dismissTaggingPostError', () => {
    expect(dismissTaggingPostError()).toEqual({
      payload: undefined,
      type: dismissTaggingPostError.type,
    });

    const state = {
      ...mockState.chatty,
      taggingPostError: 'error',
    };
    expect(reducer(state, dismissTaggingPostError)).toEqual({
      ...state,
      taggingPostError: undefined,
    });
  });

  it('should handle fetchNewestEventIdBegin', () => {
    expect(fetchNewestEventIdBegin()).toEqual({
      payload: undefined,
      type: fetchNewestEventIdBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingEvents: false,
      fetchEventsError: 'error',
    };
    expect(reducer(state, fetchNewestEventIdBegin)).toEqual({
      ...state,
      isFetchingEvents: true,
      fetchEventsError: undefined,
    });
  });

  it('should handle fetchNewestEventIdFailure', () => {
    const payload = 'error';
    expect(fetchNewestEventIdFailure(payload)).toEqual({
      payload,
      type: fetchNewestEventIdFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      fetchEventsError: undefined,
    };
    expect(reducer(state, fetchNewestEventIdFailure(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      fetchEventsError: payload,
    });
  });

  it('should handle fetchNewestEventIdSuccess', () => {
    const payload = 1;
    expect(fetchNewestEventIdSuccess(payload)).toEqual({
      payload,
      type: fetchNewestEventIdSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      fetchEventsError: undefined,
      latestEventId: 0,
    };
    expect(reducer(state, fetchNewestEventIdSuccess(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      fetchEventsError: undefined,
      latestEventId: payload,
    });
  });

  it('should handle waitForEventsBegin', () => {
    expect(waitForEventsBegin()).toEqual({
      payload: undefined,
      type: waitForEventsBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingEvents: false,
      fetchEventsError: 'error',
    };
    expect(reducer(state, waitForEventsBegin)).toEqual({
      ...state,
      isFetchingEvents: true,
      fetchEventsError: undefined,
    });
  });

  it('should handle waitForEventsFailure', () => {
    const payload = 'error';
    expect(waitForEventsFailure(payload)).toEqual({
      payload,
      type: waitForEventsFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      fetchEventsError: undefined,
    };
    expect(reducer(state, waitForEventsFailure(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      fetchEventsError: payload,
    });
  });

  it('should handle waitForEventsSuccess', () => {
    const payload = {
      lastEventId: 1,
      events: [],
      now: new Date(),
    };
    expect(waitForEventsSuccess(payload)).toEqual({
      payload,
      type: waitForEventsSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      fetchEventsError: undefined,
      latestEventId: 0,
    };
    expect(reducer(state, waitForEventsSuccess(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      fetchEventsError: undefined,
      latestEventId: payload.lastEventId,
    });
  });

  it('should handle waitForEventsSuccess with lol count updates', () => {
    const threadPostDate = moment(moment.now())
      .subtract(5, 'hours')
      .toISOString();
    const payload = {
      lastEventId: 1,
      now: new Date(),
      events: [
        {
          eventId: 7695,
          eventDate: '2020-08-23T13:42:44Z',
          eventType: 'lolCountsUpdate',
          eventData: {
            updates: [
              {
                postId: 39790577,
                tag: 'inf',
                count: 3,
              },
              {
                postId: 39791857,
                tag: 'lol',
                count: 5,
              },
            ],
          },
        },
      ],
    };
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: threadPostDate,
          body: 'Post body',
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
            body: "It doesn't make any sense. Not funny.",
            lols: [],
          },
          {
            id: 39791851,
            threadId: 39790577,
            parentId: 39791199,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39791199,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];
    const expectedThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: threadPostDate,
          body: 'Post body',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
            {
              tag: 'inf',
              count: 3,
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
            body: "It doesn't make any sense. Not funny.",
            lols: [
              {
                tag: 'lol',
                count: 5,
              },
            ],
          },
          {
            id: 39791851,
            threadId: 39790577,
            parentId: 39791199,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39791199,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];
    const inputSelectedThread = inputThreads[0];
    const expectedSelectedThread = expectedThreads[0];
    const inputSelectedPost = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      body: "It doesn't make any sense. Not funny.",
      lols: [],
    };
    const expectedSelectedPost = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      body: "It doesn't make any sense. Not funny.",
      lols: [
        {
          tag: 'lol',
          count: 5,
        },
      ],
    };

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      isUpdatedSinceLastSort: false,
      fetchEventsError: undefined,
      latestEventId: 0,
      threads: inputThreads,
      selectedThread: inputSelectedThread,
      selectedPost: inputSelectedPost,
    };
    expect(reducer(state, waitForEventsSuccess(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      isUpdatedSinceLastSort: false,
      fetchEventsError: undefined,
      latestEventId: payload.lastEventId,
      threads: expectedThreads,
      selectedThread: expectedSelectedThread,
      selectedPost: expectedSelectedPost,
    });
  });

  it('should preserve isUpdatedSinceLastSort and numberOfPostSSinceLastSort even when no events are received', () => {
    const payload = {
      lastEventId: 1,
      events: [],
      now: new Date(),
    };

    const state = {
      ...mockState.chatty,
      latestEventId: 0,
      isUpdatedSinceLastSort: true,
      numberOfNewThreadsSinceLastSort: 1,
    };
    expect(reducer(state, waitForEventsSuccess(payload))).toEqual({
      ...state,
      latestEventId: 1,
      isUpdatedSinceLastSort: true,
      numberOfNewThreadsSinceLastSort: 1,
    });
  });

  it('should handle waitForEventsSuccess with new posts', () => {
    const nonExpiredThreadPostDate = moment(moment.now())
      .subtract(5, 'hours')
      .toISOString();
    const payload = {
      lastEventId: 1,
      now: new Date(),
      events: [
        {
          eventId: 8184,
          eventDate: '2020-08-23T16:06:42Z',
          eventType: 'newPost',
          eventData: {
            postId: 39890788,
            post: {
              id: 39890788,
              threadId: 39790577,
              parentId: 39790577,
              author: 'Unleashed',
              category: 'ontopic',
              date: '2020-08-23T16:06:00Z',
              body: 'Spoken like a true fucking weirdo',
              lols: [],
            },
            parentAuthor: 'bradsh',
          },
        },
        {
          eventId: 8184,
          eventDate: '2020-08-23T16:10:42Z',
          eventType: 'newPost',
          eventData: {
            postId: 39890789,
            post: {
              id: 39890789,
              threadId: 39790577,
              parentId: 39791857,
              author: 'wtf242',
              category: 'ontopic',
              date: '2020-08-23T16:06:00Z',
              body: 'Random stuff',
              lols: [],
            },
            parentAuthor: 'mojoald',
          },
        },
        {
          eventId: 8184,
          eventDate: '2020-08-23T16:10:42Z',
          eventType: 'newPost',
          eventData: {
            postId: 39790523,
            post: {
              id: 39790523,
              threadId: 39790523,
              parentId: 0,
              author: 'Meg',
              category: 'ontopic',
              date: nonExpiredThreadPostDate,
              body: 'More stuff',
              lols: [],
            },
            parentAuthor: 'Meg',
          },
        },
      ],
    };
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: nonExpiredThreadPostDate,
          depth: 0,
          body: 'Post body',
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
            id: 39791851,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];
    const expectedThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: nonExpiredThreadPostDate,
          depth: 0,
          body: 'Post body',
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
            id: 39890789,
            threadId: 39790577,
            parentId: 39791857,
            author: 'wtf242',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            depth: 1,
            body: 'Random stuff',
            lols: [],
          },
          {
            id: 39791851,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
          {
            id: 39890788,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Unleashed',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            depth: 0,
            body: 'Spoken like a true fucking weirdo',
            lols: [],
          },
        ],
      },
      {
        threadId: 39790523,
        root: {
          id: 39790523,
          threadId: 39790523,
          parentId: 0,
          author: 'Meg',
          category: 'ontopic',
          date: nonExpiredThreadPostDate,
          body: 'More stuff',
          lols: [],
        },
        posts: [],
      },
    ];
    const inputSelectedThread = inputThreads[0];
    const expectedSelectedThread = expectedThreads[0];

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      isUpdatedSinceLastSort: false,
      fetchEventsError: undefined,
      latestEventId: 0,
      threads: inputThreads,
      selectedThread: inputSelectedThread,
    };
    expect(reducer(state, waitForEventsSuccess(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      isUpdatedSinceLastSort: true,
      fetchEventsError: undefined,
      latestEventId: payload.lastEventId,
      numberOfNewThreadsSinceLastSort: 1,
      threads: expectedThreads,
      selectedThread: expectedSelectedThread,
    });
  });

  it('should get rid of expired posts when processing new events', () => {
    const nonExpiredThreadPostDate = moment(moment.now())
      .subtract(5, 'hours')
      .toISOString();
    const expiredThreadPostDate = moment(moment.now())
      .subtract(19, 'hours')
      .toISOString();
    const payload = {
      lastEventId: 1,
      now: new Date(),
      events: [],
    };
    const expectedThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: nonExpiredThreadPostDate,
          depth: 0,
          body: 'Post body',
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
            id: 39791851,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: nonExpiredThreadPostDate,
          depth: 0,
          body: 'Post body',
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
            id: 39791851,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
      {
        threadId: 39790523,
        root: {
          id: 39790523,
          threadId: 39790523,
          parentId: 0,
          author: 'Meg',
          category: 'ontopic',
          date: expiredThreadPostDate,
          body: 'More stuff',
          lols: [],
        },
        posts: [],
      },
    ];
    const inputSelectedThread = inputThreads[0];
    const expectedSelectedThread = expectedThreads[0];

    const state = {
      ...mockState.chatty,
      isFetchingEvents: true,
      isUpdatedSinceLastSort: false,
      fetchEventsError: undefined,
      latestEventId: 0,
      threads: inputThreads,
      selectedThread: inputSelectedThread,
    };
    expect(reducer(state, waitForEventsSuccess(payload))).toEqual({
      ...state,
      isFetchingEvents: false,
      isUpdatedSinceLastSort: false,
      fetchEventsError: undefined,
      latestEventId: payload.lastEventId,
      numberOfNewThreadsSinceLastSort: 0,
      threads: expectedThreads,
      selectedThread: expectedSelectedThread,
    });
  });

  it('should handle fetchSelectedThreadBegin', () => {
    expect(fetchSelectedThreadBegin()).toEqual({
      payload: undefined,
      type: fetchSelectedThreadBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSelectedThread: false,
      fetchThreadsError: 'error',
    };
    expect(reducer(state, fetchSelectedThreadBegin)).toEqual({
      ...state,
      isFetchingSelectedThread: true,
      fetchThreadsError: undefined,
    });
  });

  it('should handle fetchSelectedThreadFailure', () => {
    const payload = 'error';
    expect(fetchSelectedThreadFailure(payload)).toEqual({
      payload,
      type: fetchSelectedThreadFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSelectedThread: true,
      fetchThreadsError: undefined,
    };
    expect(reducer(state, fetchSelectedThreadFailure('error'))).toEqual({
      ...state,
      isFetchingSelectedThread: false,
      fetchThreadsError: 'error',
    });
  });

  it('should handle fetchSelectedThreadSuccess', () => {
    const originalThread: Thread = {
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
    };
    const originalThreads = [originalThread];
    const newThread: Thread = {
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
          author: 'argh',
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
    };
    const newThreads = [newThread];

    expect(fetchSelectedThreadSuccess(newThread)).toEqual({
      payload: newThread,
      type: fetchSelectedThreadSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSelectedThread: true,
      fetchThreadsError: undefined,
      threads: originalThreads,
      selectedThread: originalThread,
    };
    expect(reducer(state, fetchSelectedThreadSuccess(newThread))).toEqual({
      ...state,
      isFetchingSelectedThread: false,
      fetchThreadsError: undefined,
      threads: newThreads,
      selectedThread: newThread,
    });
  });

  it('should handle fetchPinnedThreadsBegin', () => {
    expect(fetchPinnedThreadsBegin()).toEqual({
      payload: undefined,
      type: fetchPinnedThreadsBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingThreads: false,
      fetchThreadsError: undefined,
    };
    expect(reducer(state, fetchPinnedThreadsBegin)).toEqual({
      ...state,
      isFetchingThreads: true,
      fetchThreadsError: undefined,
    });
  });

  it('should handle fetchPinnedThreadsFailure', () => {
    const payload = 'error';
    expect(fetchPinnedThreadsFailure(payload)).toEqual({
      payload,
      type: fetchPinnedThreadsFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingThreads: true,
      fetchThreadsError: undefined,
    };
    expect(reducer(state, fetchPinnedThreadsFailure('error'))).toEqual({
      ...state,
      isFetchingThreads: false,
      fetchThreadsError: 'error',
    });
  });

  it('should handle fetchPinnedThreadsSuccess', () => {
    const originalThread: Thread = {
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
    };
    const originalThreads = [originalThread];
    const newThread: Thread = {
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
          author: 'argh',
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
    };
    const newThreads = [newThread];
    const payload = newThreads;

    expect(fetchPinnedThreadsSuccess(payload)).toEqual({
      payload,
      type: fetchPinnedThreadsSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingThreads: true,
      fetchThreadsError: undefined,
      threads: originalThreads,
    };
    expect(reducer(state, fetchPinnedThreadsSuccess(payload))).toEqual({
      ...state,
      isFetchingThreads: false,
      fetchThreadsError: undefined,
      pinnedThreads: newThreads,
    });
  });

  it('should handle fetchSelectedPinnedThreadBegin', () => {
    expect(fetchSelectedPinnedThreadBegin()).toEqual({
      payload: undefined,
      type: fetchSelectedPinnedThreadBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSelectedThread: false,
      fetchThreadsError: 'error',
    };
    expect(reducer(state, fetchSelectedPinnedThreadBegin)).toEqual({
      ...state,
      isFetchingSelectedThread: true,
      fetchThreadsError: undefined,
    });
  });

  it('should handle fetchSelectedPinnedThreadFailure', () => {
    const payload = 'error';
    expect(fetchSelectedPinnedThreadFailure(payload)).toEqual({
      payload,
      type: fetchSelectedPinnedThreadFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSelectedThread: true,
      fetchThreadsError: undefined,
    };
    expect(reducer(state, fetchSelectedPinnedThreadFailure('error'))).toEqual({
      ...state,
      isFetchingSelectedThread: false,
      fetchThreadsError: 'error',
    });
  });

  it('should handle fetchSelectedPinnedThreadSuccess', () => {
    const originalThread: Thread = {
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
    };
    const originalThreads = [originalThread];
    const newThread: Thread = {
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
          author: 'argh',
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
    };
    const newThreads = [newThread];

    expect(fetchSelectedPinnedThreadSuccess(newThread)).toEqual({
      payload: newThread,
      type: fetchSelectedPinnedThreadSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSelectedThread: true,
      fetchThreadsError: undefined,
      pinnedThreads: originalThreads,
      selectedThread: originalThread,
    };
    expect(reducer(state, fetchSelectedPinnedThreadSuccess(newThread))).toEqual(
      {
        ...state,
        isFetchingSelectedThread: false,
        fetchThreadsError: undefined,
        pinnedThreads: newThreads,
        selectedThread: newThread,
      }
    );
  });

  it('should handle fetchSingleThreadBegin', () => {
    expect(fetchSingleThreadBegin()).toEqual({
      payload: undefined,
      type: fetchSingleThreadBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSingleThread: false,
      fetchThreadsError: 'error',
    };
    expect(reducer(state, fetchSingleThreadBegin)).toEqual({
      ...state,
      isFetchingSingleThread: true,
      fetchThreadsError: undefined,
    });
  });

  it('should handle fetchSingleThreadFailure', () => {
    const payload = 'error';
    expect(fetchSingleThreadFailure(payload)).toEqual({
      payload,
      type: fetchSingleThreadFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSingleThread: true,
      fetchThreadsError: undefined,
      singleThreadNavigationStack: [],
    };
    expect(reducer(state, fetchSingleThreadFailure('error'))).toEqual({
      ...state,
      isFetchingSingleThread: false,
      fetchThreadsError: 'error',
      singleThreadNavigationStack: [],
    });
  });

  it('should handle fetchSingleThreadSuccess', () => {
    const thread: Thread = {
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
          author: 'argh',
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
    };
    const post = {
      id: 39791122,
      threadId: 39790577,
      parentId: 39790577,
      author: 'OverloadUT',
      category: 'ontopic',
      date: '2020-07-18T00:19:00Z',
      body:
        'What’s the word for finding it funny but also horribly crushingly depressing?',
      lols: [],
    };

    expect(fetchSingleThreadSuccess({ thread, post })).toEqual({
      payload: { thread, post },
      type: fetchSingleThreadSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingSingleThread: true,
      fetchThreadsError: undefined,
      singleThreadNavigationStack: [],
    };
    expect(reducer(state, fetchSingleThreadSuccess({ thread, post }))).toEqual({
      ...state,
      isFetchingSingleThread: false,
      fetchThreadsError: undefined,
      singleThreadNavigationStack: [{ thread, post }],
    });
  });

  it('should handle fetchThreadsBegin', () => {
    expect(fetchThreadsBegin()).toEqual({
      payload: undefined,
      type: fetchThreadsBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingThreads: false,
      isUpdatedSinceLastSort: true,
      numberOfNewThreadsSinceLastSort: 1,
      fetchThreadsError: undefined,
    };
    expect(reducer(state, fetchThreadsBegin)).toEqual({
      ...state,
      isFetchingThreads: true,
      isUpdatedSinceLastSort: false,
      numberOfNewThreadsSinceLastSort: 0,
      fetchThreadsError: undefined,
    });
  });

  it('should handle fetchThreadsFailure', () => {
    const payload = 'error';
    expect(fetchThreadsFailure(payload)).toEqual({
      payload,
      type: fetchThreadsFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingThreads: true,
      fetchThreadsError: undefined,
    };
    expect(reducer(state, fetchThreadsFailure('error'))).toEqual({
      ...state,
      isFetchingThreads: false,
      fetchThreadsError: 'error',
    });
  });

  it('should handle fetchThreadsSuccess', () => {
    const originalThread: Thread = {
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
    };
    const originalThreads = [originalThread];
    const newThread: Thread = {
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
          author: 'argh',
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
    };
    const newThreads = [newThread];
    const payload = newThreads;

    expect(fetchThreadsSuccess(payload)).toEqual({
      payload,
      type: fetchThreadsSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isFetchingThreads: true,
      fetchThreadsError: undefined,
      threads: originalThreads,
    };
    expect(reducer(state, fetchThreadsSuccess(payload))).toEqual({
      ...state,
      isFetchingThreads: false,
      fetchThreadsError: undefined,
      threads: newThreads,
    });
  });

  it('should handle pinThread', () => {
    const thread: Thread = {
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
    };

    expect(pinThread(thread)).toEqual({
      payload: thread,
      type: pinThread.type,
    });

    const state = {
      ...mockState.chatty,
      pinnedThreads: [],
    };
    expect(reducer(state, pinThread(thread))).toEqual({
      ...state,
      pinnedThreads: [thread],
    });
  });

  it('should handle unpinThread', () => {
    const thread: Thread = {
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
    };

    expect(unpinThread(thread)).toEqual({
      payload: thread,
      type: unpinThread.type,
    });

    const state = {
      ...mockState.chatty,
      pinnedThreads: [thread],
    };
    expect(reducer(state, unpinThread(thread))).toEqual({
      ...state,
      pinnedThreads: [],
    });
  });

  it('should handle postCommentReplyBegin', () => {
    expect(postCommentReplyBegin()).toEqual({
      payload: undefined,
      type: postCommentReplyBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingCommentReply: false,
      commentReplyError: 'error',
    };
    expect(reducer(state, postCommentReplyBegin())).toEqual({
      ...state,
      isPostingCommentReply: true,
      commentReplyError: undefined,
    });
  });

  it('should handle postCommentReplyFailure', () => {
    const payload = 'error';
    expect(postCommentReplyFailure(payload)).toEqual({
      payload,
      type: postCommentReplyFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingCommentReply: true,
      commentReplyError: undefined,
    };
    expect(reducer(state, postCommentReplyFailure('error'))).toEqual({
      ...state,
      isPostingCommentReply: false,
      commentReplyError: 'error',
    });
  });

  it('should handle postCommentReplySuccess', () => {
    expect(postCommentReplySuccess()).toEqual({
      payload: undefined,
      type: postCommentReplySuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingCommentReply: true,
      isComposingCommentReply: true,
      commentReplyError: 'error',
    };
    expect(reducer(state, postCommentReplySuccess())).toEqual({
      ...state,
      isPostingCommentReply: false,
      isComposingCommentReply: false,
      commentReplyError: undefined,
    });
  });

  it('should handle postRootPostBegin', () => {
    expect(postRootPostBegin()).toEqual({
      payload: undefined,
      type: postRootPostBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingRootPost: false,
      rootPostError: 'error',
    };
    expect(reducer(state, postRootPostBegin())).toEqual({
      ...state,
      isPostingRootPost: true,
      rootPostError: undefined,
    });
  });

  it('should handle postRootPostFailure', () => {
    const payload = 'error';
    expect(postRootPostFailure(payload)).toEqual({
      payload,
      type: postRootPostFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingRootPost: true,
      rootPostError: undefined,
    };
    expect(reducer(state, postRootPostFailure('error'))).toEqual({
      ...state,
      isPostingRootPost: false,
      rootPostError: 'error',
    });
  });

  it('should handle postRootPostSuccess', () => {
    expect(postRootPostSuccess()).toEqual({
      payload: undefined,
      type: postRootPostSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingRootPost: true,
      isComposingRootPost: true,
      rootPostError: 'error',
    };
    expect(reducer(state, postRootPostSuccess())).toEqual({
      ...state,
      isPostingRootPost: false,
      isComposingRootPost: false,
      rootPostError: undefined,
    });
  });

  it('should handle postRootReplyBegin', () => {
    expect(postRootReplyBegin()).toEqual({
      payload: undefined,
      type: postRootReplyBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingRootReply: false,
      rootReplyError: 'error',
    };
    expect(reducer(state, postRootReplyBegin())).toEqual({
      ...state,
      isPostingRootReply: true,
      rootReplyError: undefined,
    });
  });

  it('should handle postRootReplyFailure', () => {
    const payload = 'error';
    expect(postRootReplyFailure(payload)).toEqual({
      payload,
      type: postRootReplyFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingRootReply: true,
      isComposingRootReply: true,
      rootReplyError: undefined,
    };
    expect(reducer(state, postRootReplyFailure('error'))).toEqual({
      ...state,
      isPostingRootReply: false,
      isComposingRootReply: false,
      rootReplyError: 'error',
    });
  });

  it('should handle postRootReplySuccess', () => {
    expect(postRootReplySuccess()).toEqual({
      payload: undefined,
      type: postRootReplySuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isPostingRootReply: true,
      rootReplyError: 'error',
    };
    expect(reducer(state, postRootReplySuccess())).toEqual({
      ...state,
      isPostingRootReply: false,
      rootReplyError: undefined,
    });
  });

  it('should handle sortThreads', () => {
    const thread1: Thread = {
      threadId: 39790578,
      root: {
        id: 39790578,
        threadId: 39790578,
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
          id: 39791853,
          threadId: 39790578,
          parentId: 39790578,
          author: 'gmoney',
          category: 'ontopic',
          date: '2020-07-18T22:53:00Z',
          body: "It doesn't make any sense. Not funny.",
          lols: [],
        },
        {
          id: 39791123,
          threadId: 39790578,
          parentId: 39790578,
          author: 'OverloadUT',
          category: 'ontopic',
          date: '2020-07-18T21:19:00Z',
          body:
            'What’s the word for finding it funny but also horribly crushingly depressing?',
          lols: [],
        },
      ],
    };
    const thread2: Thread = {
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
          date: '2020-07-18T20:53:00Z',
          body: "It doesn't make any sense. Not funny.",
          lols: [],
        },
        {
          id: 39791122,
          threadId: 39790577,
          parentId: 39790577,
          author: 'OverloadUT',
          category: 'ontopic',
          date: '2020-07-18T15:19:00Z',
          body:
            'What’s the word for finding it funny but also horribly crushingly depressing?',
          lols: [],
        },
      ],
    };
    const unsortedThreads = [thread2, thread1];

    expect(sortThreads()).toEqual({
      payload: undefined,
      type: sortThreads.type,
    });

    const state = {
      ...mockState.chatty,
      isUpdatedSinceLastSort: true,
      numberOfNewThreadsSinceLastSort: 1,
      threads: unsortedThreads,
    };
    expect(reducer(state, sortThreads())).toEqual({
      ...state,
      isUpdatedSinceLastSort: false,
      numberOfNewThreadsSinceLastSort: 0,
      threads: [thread1, thread2],
    });
  });

  it('should handle selectThread', () => {
    const thread: Thread = {
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
    };

    expect(selectThread(thread)).toEqual({
      payload: thread,
      type: selectThread.type,
    });

    const state = {
      ...mockState.chatty,
      selectedThread: undefined,
    };
    expect(reducer(state, selectThread(thread))).toEqual({
      ...state,
      selectedThread: thread,
    });
  });

  it('should handle selectPost', () => {
    const post: Post = {
      id: 39791122,
      threadId: 39790577,
      parentId: 39790577,
      author: 'OverloadUT',
      category: 'ontopic',
      date: '2020-07-18T00:19:00Z',
      body:
        'What’s the word for finding it funny but also horribly crushingly depressing?',
      lols: [],
    };

    expect(selectPost(post)).toEqual({
      payload: post,
      type: selectPost.type,
    });

    const state = {
      ...mockState.chatty,
      selectedPost: undefined,
    };
    expect(reducer(state, selectPost(post))).toEqual({
      ...state,
      selectedPost: post,
    });
  });

  it('should handle updateFilter', () => {
    const filter = 'filter';

    expect(updateFilter(filter)).toEqual({
      payload: filter,
      type: updateFilter.type,
    });

    const state = {
      ...mockState.chatty,
      filter,
    };
    expect(reducer(state, updateFilter('something else'))).toEqual({
      ...state,
      filter: 'something else',
    });
  });

  it('should handle tagPostBegin', () => {
    expect(tagPostBegin()).toEqual({
      payload: undefined,
      type: tagPostBegin.type,
    });

    const state = {
      ...mockState.chatty,
      isTaggingPost: false,
      taggingPostError: 'error',
    };
    expect(reducer(state, tagPostBegin())).toEqual({
      ...state,
      isTaggingPost: true,
      taggingPostError: undefined,
    });
  });

  it('should handle tagPostFailure', () => {
    expect(tagPostFailure('error')).toEqual({
      payload: 'error',
      type: tagPostFailure.type,
    });

    const state = {
      ...mockState.chatty,
      isTaggingPost: true,
      taggingPostError: undefined,
    };
    expect(reducer(state, tagPostFailure('error'))).toEqual({
      ...state,
      isTaggingPost: false,
      taggingPostError: 'error',
    });
  });

  it('should handle tagPostSuccess', () => {
    expect(tagPostSuccess()).toEqual({
      payload: undefined,
      type: tagPostSuccess.type,
    });

    const state = {
      ...mockState.chatty,
      isTaggingPost: true,
      taggingPostError: 'error',
    };
    expect(reducer(state, tagPostSuccess())).toEqual({
      ...state,
      isTaggingPost: false,
      taggingPostError: undefined,
    });
  });

  it('should handle @@router/LOCATION_CHANGE for /', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/',
          search: '',
          hash: '',
          state: null,
        },
        action: 'PUSH',
        isFirstRendering: false,
      },
    };

    const state = {
      ...mockState.chatty,
      mode: modes.PINNED_THREADS,
    };
    expect(reducer(state, action)).toEqual({
      ...state,
      mode: modes.CHATTY,
    });
  });

  it('should handle @@router/LOCATION_CHANGE for /pinnedthreads', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/pinnedthreads',
          search: '',
          hash: '',
          state: null,
        },
        action: 'PUSH',
        isFirstRendering: false,
      },
    };

    const state = {
      ...mockState.chatty,
      mode: modes.CHATTY,
    };
    expect(reducer(state, action)).toEqual({
      ...state,
      mode: modes.PINNED_THREADS,
    });
  });

  it('should handle @@router/LOCATION_CHANGE for /thread', () => {
    const action = {
      type: '@@router/LOCATION_CHANGE',
      payload: {
        location: {
          pathname: '/thread',
          search: '?threadId=123456789&postId=123',
          hash: '',
          state: null,
        },
        action: 'PUSH',
        isFirstRendering: false,
      },
    };

    const state = {
      ...mockState.chatty,
      mode: modes.CHATTY,
    };
    expect(reducer(state, action)).toEqual({
      ...state,
      mode: modes.SINGLE_THREAD,
    });
  });
});

describe('Chatty asynchronous actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch the newest event id successfully', async () => {
    const eventId = 1;
    mockChattyAPI.getNewestEventId.mockResolvedValue({ eventId });
    const store = mockStore(mockState);

    await store.dispatch(fetchNewestEventId());
    expect(store.getActions()[0].type).toEqual(fetchNewestEventIdBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchNewestEventIdSuccess.type);
    expect(store.getActions()[1].payload).toEqual(eventId);
  });

  it('should fail to fetch the newest event id successfully', async () => {
    const expectedError = new Error(
      'Something went wrong while trying to fetch the most recent update from the API server. Try a manual refresh.'
    );
    mockChattyAPI.getNewestEventId.mockRejectedValue(expectedError);
    const store = mockStore(mockState);

    await store.dispatch(fetchNewestEventId());
    expect(store.getActions()[0].type).toEqual(fetchNewestEventIdBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchNewestEventIdFailure.type);
    expect(store.getActions()[1].payload).toEqual(expectedError.message);
  });

  it('should wait for and fetch events successfully', async () => {
    const now = new Date();
    const apiResponse = {
      lastEventId: 1,
      events: [],
      tooManyEvents: false,
    };
    mockChattyAPI.waitForEvent.mockResolvedValue(apiResponse);
    const store = mockStore(mockState);

    await store.dispatch(waitForEvents(1, now));
    expect(store.getActions()[0].type).toEqual(waitForEventsBegin.type);
    expect(store.getActions()[1].type).toEqual(waitForEventsSuccess.type);
    expect(store.getActions()[1].payload).toEqual({
      lastEventId: 1,
      events: [],
      now,
    });
  });

  it('should fail to wait and fetch events successfully', async () => {
    const expected = new Error(
      'Something went wrong while waiting for updates from the API server. Try a manual refresh.'
    );
    mockChattyAPI.waitForEvent.mockRejectedValue(expected);
    const store = mockStore(mockState);

    await store.dispatch(waitForEvents(1, new Date()));
    expect(store.getActions()[0].type).toEqual(waitForEventsBegin.type);
    expect(store.getActions()[1].type).toEqual(waitForEventsFailure.type);
    expect(store.getActions()[1].payload).toEqual(expected.message);
  });

  it('should fetch the selected thread successfully', async () => {
    const thread: Thread = {
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
      ],
    };
    mockChattyAPI.fetchThread.mockResolvedValue(thread);
    const store = mockStore(mockState);

    await store.dispatch(fetchSelectedThread(39790577));
    expect(store.getActions()[0].type).toEqual(fetchSelectedThreadBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchSelectedThreadSuccess.type);
    expect(store.getActions()[1].payload).toEqual(thread);
  });

  it('should fail to fetch the selected thread', async () => {
    mockChattyAPI.fetchThread.mockRejectedValue(new Error('error'));

    const store = mockStore(mockState);

    await store.dispatch(fetchSelectedThread(123456789));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(fetchSelectedThreadBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchSelectedThreadFailure.type);
    expect(store.getActions()[1].payload).toEqual('Failed to refresh thread');
  });

  it('should fetch the selected pinned thread successfully', async () => {
    const thread: Thread = {
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
      ],
    };
    mockChattyAPI.fetchThread.mockResolvedValue(thread);
    const store = mockStore(mockState);

    await store.dispatch(fetchSelectedPinnedThread(39790577));
    expect(store.getActions()[0].type).toEqual(
      fetchSelectedPinnedThreadBegin.type
    );
    expect(store.getActions()[1].type).toEqual(
      fetchSelectedPinnedThreadSuccess.type
    );
    expect(store.getActions()[1].payload).toEqual(thread);
  });

  it('should fail to fetch the selected pinned thread', async () => {
    mockChattyAPI.fetchThread.mockRejectedValue(new Error('error'));

    const store = mockStore(mockState);

    await store.dispatch(fetchSelectedPinnedThread(123456789));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(
      fetchSelectedPinnedThreadBegin.type
    );
    expect(store.getActions()[1].type).toEqual(
      fetchSelectedPinnedThreadFailure.type
    );
    expect(store.getActions()[1].payload).toEqual('Failed to refresh thread');
  });

  it('should fetch a single thread successfully', async () => {
    const post: Post = {
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
    };
    const thread: Thread = {
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
      ],
    };
    mockChattyAPI.fetchThread.mockResolvedValue(thread);
    const store = mockStore(mockState);

    await store.dispatch(fetchSingleThread(39790577, 39791122));
    expect(store.getActions()[0].type).toEqual(fetchSingleThreadBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchSingleThreadSuccess.type);
    expect(store.getActions()[1].payload).toEqual({ thread, post });
  });

  it('should fail to fetch a single thread', async () => {
    mockChattyAPI.fetchThread.mockRejectedValue(new Error('error'));

    const store = mockStore(mockState);

    await store.dispatch(fetchSingleThread(123456789));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(fetchSingleThreadBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchSingleThreadFailure.type);
    expect(store.getActions()[1].payload).toEqual('Failed to fetch thread');
  });

  it('should fetch pinned threads successfully and return at least one thread', async () => {
    const thread: Thread = {
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
      ],
    };
    mockChattyAPI.fetchThreads.mockResolvedValue([thread]);
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        preferences: {
          ...mockState.preferences.preferences,
          pinnedThreads: [39790577],
        },
      },
    });

    await store.dispatch(fetchPinnedThreads());
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toEqual(fetchPinnedThreadsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchPinnedThreadsSuccess.type);
    expect(store.getActions()[1].payload).toEqual([thread]);
  });

  it('should return an empty list of pinned threads', async () => {
    mockChattyAPI.fetchThreads.mockResolvedValue([]);
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        preferences: {
          ...mockState.preferences.preferences,
          pinnedThreads: [],
        },
      },
    });

    await store.dispatch(fetchPinnedThreads());
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toEqual(fetchPinnedThreadsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchPinnedThreadsSuccess.type);
    expect(store.getActions()[1].payload).toEqual([]);
  });

  it('should fail to fetch pinned threads', async () => {
    mockChattyAPI.fetchThreads.mockRejectedValue(new Error('error'));

    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        preferences: {
          ...mockState.preferences.preferences,
          pinnedThreads: [39790577],
        },
      },
    });

    await store.dispatch(fetchPinnedThreads());
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toEqual(fetchPinnedThreadsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchPinnedThreadsFailure.type);
    expect(store.getActions()[1].payload).toEqual(
      'Failed to refresh pinned threads'
    );
  });

  it('should fetch threads successfully and return at least one thread', async () => {
    const thread: Thread = {
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
      ],
    };
    mockChattyAPI.fetchThreads.mockResolvedValue([thread]);
    const store = mockStore(mockState);

    await store.dispatch(fetchThreads());
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toEqual(fetchThreadsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchThreadsSuccess.type);
    expect(store.getActions()[1].payload).toEqual([thread]);
  });

  it('should fetch threads successfully and return an empty list of threads', async () => {
    mockChattyAPI.fetchThreads.mockResolvedValue([]);
    const store = mockStore(mockState);

    await store.dispatch(fetchThreads());
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toEqual(fetchThreadsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchThreadsSuccess.type);
    expect(store.getActions()[1].payload).toEqual([]);
  });

  it('should fail to fetch threads', async () => {
    mockChattyAPI.fetchThreads.mockRejectedValue(new Error('error'));

    const store = mockStore(mockState);

    await store.dispatch(fetchThreads());
    expect(store.getActions()).toHaveLength(2);
    expect(store.getActions()[0].type).toEqual(fetchThreadsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchThreadsFailure.type);
    expect(store.getActions()[1].payload).toEqual('Failed to refresh threads');
  });

  it('should post a comment reply successfully', async () => {
    mockChattyAPI.postComment.mockResolvedValue({
      result: 'success',
    });
    mockChattyAPI.fetchThread.mockResolvedValue({
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
    });

    const store = mockStore(mockState);
    const credentials = { username: 'username', password: 'password' };

    await store.dispatch(
      postCommentReply(credentials, 1234567, 'this is the post')
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(postCommentReplyBegin.type);
    expect(store.getActions()[1].type).toEqual(postCommentReplySuccess.type);
  });

  it('should fail to post a comment reply', async () => {
    const error =
      'Oops! Something went wrong when posting. Have you tried turning it off and on?';
    mockChattyAPI.postComment.mockRejectedValue(new Error(error));

    const store = mockStore(mockState);
    const credentials = { username: 'username', password: 'password' };

    await store.dispatch(
      postCommentReply(credentials, 123456789, 'this is the post')
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(postCommentReplyBegin.type);
    expect(store.getActions()[1].type).toEqual(postCommentReplyFailure.type);
    expect(store.getActions()[1].payload).toEqual(error);
  });

  it('should post a root post successfully', async () => {
    mockChattyAPI.postNewRootPost.mockResolvedValue({
      result: 'success',
    });
    mockChattyAPI.fetchThreads.mockResolvedValue([
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
    ]);

    const store = mockStore(mockState);
    const credentials = { username: 'username', password: 'password' };

    await store.dispatch(postRootPost(credentials, 'this is the post'));
    expect(store.getActions().length).toEqual(4);
    expect(store.getActions()[0].type).toEqual(postRootPostBegin.type);
    expect(store.getActions()[1].type).toEqual(postRootPostSuccess.type);
    expect(store.getActions()[2].type).toEqual(fetchThreadsBegin.type);
    expect(store.getActions()[3].type).toEqual(fetchThreadsSuccess.type);
  });

  it('should fail to post a root post', async () => {
    const error =
      'Oops! Something went wrong when posting. Have you tried turning it off and on?';
    mockChattyAPI.postNewRootPost.mockRejectedValue(new Error(error));

    const store = mockStore(mockState);
    const credentials = { username: 'username', password: 'password' };

    await store.dispatch(postRootPost(credentials, 'this is the post'));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(postRootPostBegin.type);
    expect(store.getActions()[1].type).toEqual(postRootPostFailure.type);
    expect(store.getActions()[1].payload).toEqual(error);
  });

  it('should post a root reply successfully', async () => {
    mockChattyAPI.postComment.mockResolvedValue({
      result: 'success',
    });
    mockChattyAPI.fetchThread.mockResolvedValue({
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
    });

    const store = mockStore(mockState);
    const credentials = { username: 'username', password: 'password' };

    await store.dispatch(
      postRootReply(credentials, 123456789, 'this is the post')
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(postRootReplyBegin.type);
    expect(store.getActions()[1].type).toEqual(postRootReplySuccess.type);
  });

  it('should fail to post a root reply', async () => {
    const error =
      'Oops! Something went wrong when posting. Have you tried turning it off and on?';
    mockChattyAPI.postComment.mockRejectedValue(new Error(error));

    const store = mockStore(mockState);
    const credentials = { username: 'username', password: 'password' };

    await store.dispatch(
      postRootReply(credentials, 123456789, 'this is the post')
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(postRootReplyBegin.type);
    expect(store.getActions()[1].type).toEqual(postRootReplyFailure.type);
    expect(store.getActions()[1].payload).toEqual(error);
  });

  it('should tag a post', async () => {
    mockChattyAPI.lolPost.mockResolvedValue({
      status: '1',
      data: {
        notifications:
          '<div class="gamification-notifcation">\n\t<ul>\n\t\t\t\t\t<li class="active">\n\t<span class="notification-wrapper">\n\t\t<span class="points">\n\t\t\t+1\t\t</span>\n\t\t<span class="message">\n\t\t\tWoohoo! You just lol\'d a post\t\t</span>\n\t</span>\n</li>\n\t\t\t</ul>\n</div>\n',
      },
      message: '',
    });

    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: { username: 'username', password: 'password' },
      },
    });
    await store.dispatch(
      tagPost(
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
        'lol'
      )
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(tagPostBegin.type);
    expect(store.getActions()[1].type).toEqual(tagPostSuccess.type);
  });

  it('should fail to tag a post due to API error', async () => {
    mockChattyAPI.lolPost.mockRejectedValue({
      error: true,
      code: 'ERR_INVALID_LOGIN',
      message: 'You must be logged in to lol',
    });

    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: { username: 'username', password: 'password' },
      },
    });

    await store.dispatch(
      tagPost(
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
        'lol'
      )
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(tagPostBegin.type);
    expect(store.getActions()[1].type).toEqual(tagPostFailure.type);
    expect(store.getActions()[1].payload).toEqual('Failed to tag post');
  });

  it('should fail to tag a post because the user is not logged in', async () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: undefined,
      },
    });

    await store.dispatch(
      tagPost(
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
        'lol'
      )
    );
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(tagPostBegin.type);
    expect(store.getActions()[1].type).toEqual(tagPostFailure.type);
    expect(store.getActions()[1].payload).toEqual(
      'You must be logged in to tag a post'
    );
  });
});

describe('Chatty selectors', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return fetch events error', () => {
    const fetchEventsError = 'fetch events error';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        fetchEventsError,
      },
    });

    expect(getFetchEventsError(store.getState())).toEqual(fetchEventsError);
  });

  it('should return fetch threads error', () => {
    const fetchThreadsError = 'fetch threads error';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        fetchThreadsError,
      },
    });

    expect(getFetchThreadsError(store.getState())).toEqual(fetchThreadsError);
  });

  it('should return filter', () => {
    const filter = 'filter';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        filter,
      },
    });

    expect(getFilter(store.getState())).toEqual(filter);
  });

  it('should return is composing comment reply', () => {
    const isComposingCommentReply = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isComposingCommentReply,
      },
    });

    expect(getIsComposingCommentReply(store.getState())).toEqual(
      isComposingCommentReply
    );
  });

  it('should return is composing root post', () => {
    const isComposingRootPost = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isComposingRootPost,
      },
    });

    expect(getIsComposingRootPost(store.getState())).toEqual(
      isComposingRootPost
    );
  });

  it('should return is composing root reply', () => {
    const isComposingRootReply = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isComposingRootReply,
      },
    });

    expect(getIsComposingRootReply(store.getState())).toEqual(
      isComposingRootReply
    );
  });

  it('should return is fetching selected thread', () => {
    const isFetchingThread = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingSelectedThread: isFetchingThread,
      },
    });

    expect(getIsFetchingSelectedThread(store.getState())).toEqual(
      isFetchingThread
    );
  });

  it('should return is fetching single thread', () => {
    const isFetchingThread = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingSingleThread: isFetchingThread,
      },
    });

    expect(getIsFetchingSingleThread(store.getState())).toEqual(
      isFetchingThread
    );
  });

  it('should return is fetching threads', () => {
    const isFetchingThreads = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingThreads,
      },
    });

    expect(getIsFetchingThreads(store.getState())).toEqual(isFetchingThreads);
  });

  it('should return is updated since last sort', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isUpdatedSinceLastSort: true,
      },
    });

    expect(getIsUpdatedSinceLastSort(store.getState())).toEqual(true);
  });

  it('should return the latest event id', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        latestEventId: 1,
      },
    });

    expect(getLatestEventId(store.getState())).toEqual(1);
  });

  it('should return the current mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.PINNED_THREADS,
      },
    });

    expect(getMode(store.getState())).toEqual(modes.PINNED_THREADS);
  });

  it('should return the number of new threads since last sort', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        numberOfNewThreadsSinceLastSort: 1,
      },
    });

    expect(getNumberOfNewThreadsSinceLastSort(store.getState())).toEqual(1);
  });

  it('should return all pinned threads', () => {
    const pinnedThreads: Thread[] = [
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
        ],
      },
    ];
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        pinnedThreads,
      },
    });

    expect(getPinnedThreads(store.getState())).toEqual(pinnedThreads);
  });

  it('should return is posting comment reply', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isPostingCommentReply: true,
      },
    });

    expect(getIsPostingCommentReply(store.getState())).toBeTruthy();
  });

  it('should return is posting root post', () => {
    const isPostingRootPost = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isPostingRootPost,
      },
    });

    expect(getIsPostingRootPost(store.getState())).toEqual(isPostingRootPost);
  });

  it('should return is posting root reply', () => {
    const isPostingRootReply = true;
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isPostingRootReply,
      },
    });

    expect(getIsPostingRootReply(store.getState())).toEqual(isPostingRootReply);
  });

  it('should return posting comment reply error', () => {
    const commentReplyError = 'error';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        commentReplyError,
      },
    });

    expect(getCommentReplyError(store.getState())).toEqual(commentReplyError);
  });

  it('should return posting root post error', () => {
    const rootPostError = 'error';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        rootPostError,
      },
    });

    expect(getRootPostError(store.getState())).toEqual(rootPostError);
  });

  it('should return posting root reply error', () => {
    const rootReplyError = 'error';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        rootReplyError,
      },
    });

    expect(getRootReplyError(store.getState())).toEqual(rootReplyError);
  });

  it('should return the selected post', () => {
    const selectedPost = {
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
    };
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        selectedPost,
      },
    });

    expect(getSelectedPost(store.getState())).toEqual(selectedPost);
  });

  it('should return the selected thread', () => {
    const selectedThread: Thread = {
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
      ],
    };
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        selectedThread,
      },
    });

    expect(getSelectedThread(store.getState())).toEqual(selectedThread);
  });

  it('should return the single thread navigation entry being displayed', () => {
    const selectedThread: Thread = {
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
      ],
    };
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        singleThreadNavigationStack: [{ thread: selectedThread }],
      },
    });

    expect(getSingleThreadNavigationStack(store.getState())).toEqual([
      { thread: selectedThread },
    ]);
  });

  it('should return all threads', () => {
    const threads: Thread[] = [
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
        ],
      },
    ];
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        threads,
      },
    });

    expect(getThreads(store.getState())).toEqual(threads);
  });

  it('should return filtered threads when the user typed a filter', () => {
    const threads: Thread[] = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is not going to be filtered',
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
        ],
      },
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is going to be filtered',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        posts: [
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
    const expectedFilteredThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is going to be filtered',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        posts: [
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
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        filter: 'this is GOING',
        threads,
      },
    });

    expect(getFilteredThreads(store.getState())).toEqual(
      expectedFilteredThreads
    );
  });

  it('should include active pinned threads in the filtered threads', () => {
    const thread: Thread = {
      threadId: 39790550,
      root: {
        id: 39790550,
        threadId: 39790550,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: '2020-07-17T21:09:00Z',
        body: 'This is not going to be filtered',
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
          threadId: 39790550,
          parentId: 39790550,
          author: 'gmoney',
          category: 'ontopic',
          date: '2020-07-18T09:53:00Z',
          depth: 0,
          body: "It doesn't make any sense. Not funny.",
          lols: [],
        },
      ],
    };
    const pinnedThread1: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: '2020-07-17T15:09:00Z',
        body: 'This is going to be filtered',
        lols: [
          {
            tag: 'lol',
            count: 5,
          },
        ],
      },
      posts: [
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
    };
    const pinnedThread2: Thread = {
      threadId: 39790580,
      root: {
        id: 39790577,
        threadId: 39790580,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: '2020-07-17T12:09:00Z',
        body: 'This is going to be filtered',
        lols: [
          {
            tag: 'lol',
            count: 5,
          },
        ],
      },
      posts: [
        {
          id: 39791122,
          threadId: 39790580,
          parentId: 39790580,
          author: 'OverloadUT',
          category: 'ontopic',
          date: '2020-07-18T00:19:00Z',
          depth: 0,
          body:
            'What’s the word for finding it funny but also horribly crushingly depressing?',
          lols: [],
        },
      ],
    };
    const originalThreads = [thread, pinnedThread1, pinnedThread2];
    const expectedFilteredThreads = [pinnedThread2, pinnedThread1, thread];
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        preferences: {
          ...mockState.preferences.preferences,
          pinnedThreads: [39790523, 39790577, 39790580],
        },
      },
      chatty: {
        ...mockState.chatty,
        mode: modes.CHATTY,
        threads: originalThreads,
      },
    });

    expect(getFilteredThreads(store.getState())).toEqual(
      expectedFilteredThreads
    );
  });

  it('should return filtered threads based on comment filter exclusions', () => {
    const threads: Thread[] = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is not going to be filtered',
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
        ],
      },
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'political',
          date: '2020-07-17T21:09:00Z',
          body: 'This is going to be filtered',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        posts: [
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
    const expectedFilteredThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is not going to be filtered',
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
        ],
      },
    ];
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        threads,
      },
      preferences: {
        ...mockState.preferences,
        preferences: {
          commentFilters: [
            { category: 'political', checked: false },
            { category: 'stupid', checked: true },
          ],
          pinnedThreads: [],
        },
      },
    });

    expect(getFilteredThreads(store.getState())).toEqual(
      expectedFilteredThreads
    );
  });

  it('should return filtered threads when in pinned threads mode', () => {
    const threads: Thread[] = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is not going to be filtered',
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
        ],
      },
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'This is going to be filtered',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        posts: [
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
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.PINNED_THREADS,
        pinnedThreads: threads,
      },
    });

    expect(getFilteredThreads(store.getState())).toEqual(threads);
  });

  it('should return isTaggingPost', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isTaggingPost: true,
      },
    });

    expect(getIsTaggingPost(store.getState())).toBeTruthy();
  });

  it('should return taggingPostStatus', () => {
    const error = 'error';
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        taggingPostError: error,
      },
    });

    expect(getTaggingPostError(store.getState())).toEqual(error);
  });
});
