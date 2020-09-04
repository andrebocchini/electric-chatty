import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState, AppDispatch } from '../../config/store';
import * as chattyAPI from '../../api/chatty';
import {
  replaceThread,
  mostRecentUpdate,
  isExpired,
} from '../../utils/threadUtils';
import Post from '../../types/Post';
import Thread from '../../types/Thread';
import ChattyState from '../../types/ChattyState';
import Credentials from '../../types/Credentials';
// eslint-disable-next-line import/no-cycle
import { getPreferences } from '../preferences/preferencesSlice';
import Preferences from '../../types/Preferences';
import * as modes from '../../constants/modes';
import * as routes from '../../constants/routes';
import Event from '../../types/Event';
import processEvents, {
  numberOfNewRootPosts,
  isEligibleForReSort,
} from '../../utils/eventsUtils';

const initialState: ChattyState = {
  commentReplyError: undefined,
  fetchThreadsError: undefined,
  filter: undefined,
  isComposingCommentReply: false,
  isComposingRootPost: false,
  isComposingRootReply: false,
  isFetchingEvents: false,
  isFetchingSelectedThread: false,
  isFetchingSingleThread: false,
  isFetchingThreads: false,
  isPostingRootPost: false,
  isPostingRootReply: false,
  isPostingCommentReply: false,
  isTaggingPost: false,
  isUpdatedSinceLastSort: false,
  mode: modes.CHATTY,
  numberOfNewThreadsSinceLastSort: 0,
  pinnedThreads: [],
  rootPostError: undefined,
  rootReplyError: undefined,
  taggingPostError: undefined,
  threads: [],
  selectedThread: undefined,
  selectedPost: undefined,
  singleThreadNavigationStack: [],
};

const chattySlice = createSlice({
  name: 'chatty',
  initialState,
  reducers: {
    composingCommentReplyBegin: (state) => {
      state.isComposingCommentReply = true;
      state.isComposingRootReply = false;
    },
    composingCommentReplyCancel: (state) => {
      state.isComposingCommentReply = false;
      state.commentReplyError = undefined;
    },
    composingRootPostBegin: (state) => {
      state.isComposingRootPost = true;
    },
    composingRootPostCancel: (state) => {
      state.isComposingRootPost = false;
      state.rootPostError = undefined;
    },
    composingRootReplyBegin: (state) => {
      state.isComposingRootReply = true;
      state.isComposingCommentReply = false;
    },
    composingRootReplyCancel: (state) => {
      state.isComposingRootReply = false;
      state.rootReplyError = undefined;
    },
    dismissCommentReplyError: (state) => {
      state.commentReplyError = undefined;
    },
    dismissFetchThreadsError: (state) => {
      state.fetchThreadsError = undefined;
    },
    dismissRootPostError: (state) => {
      state.rootPostError = undefined;
    },
    dismissRootReplyError: (state) => {
      state.rootReplyError = undefined;
    },
    dismissTaggingPostError: (state) => {
      state.taggingPostError = undefined;
    },
    fetchNewestEventIdBegin: (state) => {
      state.isFetchingEvents = true;
      state.fetchEventsError = undefined;
    },
    fetchNewestEventIdFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingEvents = false;
      state.fetchEventsError = action.payload;
    },
    fetchNewestEventIdSuccess: (state, action: PayloadAction<number>) => {
      state.isFetchingEvents = false;
      state.fetchEventsError = undefined;
      state.latestEventId = action.payload;
    },
    waitForEventsBegin: (state) => {
      state.isFetchingEvents = true;
      state.fetchEventsError = undefined;
    },
    waitForEventsFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingEvents = false;
      state.fetchEventsError = action.payload;
    },
    waitForEventsSuccess: (
      state,
      action: PayloadAction<{ lastEventId: number; events: Event[]; now: Date }>
    ) => {
      const { events, lastEventId, now } = action.payload;

      state.isFetchingEvents = false;
      state.fetchEventsError = undefined;
      state.latestEventId = lastEventId;
      state.threads = processEvents(events, state.threads).filter(
        (t) => !isExpired(t, now)
      );
      state.isUpdatedSinceLastSort =
        state.isUpdatedSinceLastSort || isEligibleForReSort(events);
      state.numberOfNewThreadsSinceLastSort += numberOfNewRootPosts(events);

      const newSelectedThread = state.threads.find(
        (thread) => thread.threadId === state.selectedThread?.threadId
      );
      if (newSelectedThread) {
        state.selectedThread = newSelectedThread;

        const newSelectedPost = newSelectedThread.posts.find(
          (post) => post.id === state.selectedPost?.id
        );
        if (newSelectedPost) {
          state.selectedPost = newSelectedPost;
        }
      }

      // console.log(`Events: ${JSON.stringify(action.payload.events, null, 2)}`);
    },
    fetchSelectedThreadBegin: (state) => {
      state.isFetchingSelectedThread = true;
      state.fetchThreadsError = undefined;
    },
    fetchSelectedThreadFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingSelectedThread = false;
      state.fetchThreadsError = action.payload;
    },
    fetchSelectedThreadSuccess: (state, action: PayloadAction<Thread>) => {
      state.isFetchingSelectedThread = false;
      state.fetchThreadsError = undefined;
      state.threads = replaceThread(state.threads, action.payload);
      state.selectedThread = action.payload;
    },
    fetchSelectedPinnedThreadBegin: (state) => {
      state.isFetchingSelectedThread = true;
      state.fetchThreadsError = undefined;
    },
    fetchSelectedPinnedThreadFailure: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isFetchingSelectedThread = false;
      state.fetchThreadsError = action.payload;
    },
    fetchSelectedPinnedThreadSuccess: (
      state,
      action: PayloadAction<Thread>
    ) => {
      state.isFetchingSelectedThread = false;
      state.fetchThreadsError = undefined;
      state.pinnedThreads = replaceThread(state.pinnedThreads, action.payload);
      state.selectedThread = action.payload;
    },
    fetchSingleThreadBegin: (state) => {
      state.isFetchingSingleThread = true;
      state.fetchThreadsError = undefined;
    },
    fetchSingleThreadFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingSingleThread = false;
      state.fetchThreadsError = action.payload;
    },
    fetchSingleThreadSuccess: (
      state,
      action: PayloadAction<{ thread: Thread; post?: Post }>
    ) => {
      const { post, thread } = action.payload;

      state.isFetchingSingleThread = false;
      state.fetchThreadsError = undefined;
      state.singleThreadNavigationStack.push({
        thread,
        post,
      });
    },
    fetchThreadsBegin: (state) => {
      state.isFetchingThreads = true;
      state.isUpdatedSinceLastSort = false;
      state.numberOfNewThreadsSinceLastSort = 0;
      state.fetchThreadsError = undefined;
    },
    fetchThreadsFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingThreads = false;
      state.fetchThreadsError = action.payload;
    },
    fetchThreadsSuccess: (state, action: PayloadAction<Thread[]>) => {
      state.isFetchingThreads = false;
      state.fetchThreadsError = undefined;
      state.threads = action.payload;
    },
    fetchPinnedThreadsBegin: (state) => {
      state.isFetchingThreads = true;
      state.fetchThreadsError = undefined;
    },
    fetchPinnedThreadsFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingThreads = false;
      state.fetchThreadsError = action.payload;
    },
    fetchPinnedThreadsSuccess: (state, action: PayloadAction<Thread[]>) => {
      state.isFetchingThreads = false;
      state.fetchThreadsError = undefined;
      state.pinnedThreads = action.payload;
    },
    pinThread: (state, action: PayloadAction<Thread>) => {
      state.pinnedThreads.push(action.payload);
    },
    unpinThread: (state, action: PayloadAction<Thread>) => {
      const thread = action.payload;
      if (state.pinnedThreads.find((t) => t.threadId === thread.threadId)) {
        state.pinnedThreads = state.pinnedThreads.filter(
          (t) => t.threadId !== thread.threadId
        );
      }
    },
    postCommentReplyBegin: (state) => {
      state.isPostingCommentReply = true;
      state.commentReplyError = undefined;
    },
    postCommentReplyFailure: (state, action: PayloadAction<string>) => {
      state.isPostingCommentReply = false;
      state.commentReplyError = action.payload;
    },
    postCommentReplySuccess: (state) => {
      state.isPostingCommentReply = false;
      state.commentReplyError = undefined;
      state.isComposingCommentReply = false;
    },
    postRootPostBegin: (state) => {
      state.isPostingRootPost = true;
      state.rootPostError = undefined;
    },
    postRootPostFailure: (state, action: PayloadAction<string>) => {
      state.isPostingRootPost = false;
      state.rootPostError = action.payload;
    },
    postRootPostSuccess: (state) => {
      state.isComposingRootPost = false;
      state.isPostingRootPost = false;
      state.rootPostError = undefined;
    },
    postRootReplyBegin: (state) => {
      state.isPostingRootReply = true;
      state.rootReplyError = undefined;
    },
    postRootReplyFailure: (state, action: PayloadAction<string>) => {
      state.isPostingRootReply = false;
      state.rootReplyError = action.payload;
      state.isComposingRootReply = false;
    },
    postRootReplySuccess: (state) => {
      state.isPostingRootReply = false;
      state.rootReplyError = undefined;
      state.isComposingRootReply = false;
    },
    selectPost: (state, action: PayloadAction<Post | undefined>) => {
      state.selectedPost = action.payload;
    },
    selectSingleThreadPost: (
      state,
      action: PayloadAction<Post | undefined>
    ) => {
      const post = action.payload;

      if (state.singleThreadNavigationStack.length > 0) {
        state.singleThreadNavigationStack[
          state.singleThreadNavigationStack.length - 1
        ].post = post;
      }
    },
    selectThread: (state, action: PayloadAction<Thread | undefined>) => {
      state.selectedPost = undefined;
      state.selectedThread = action.payload;
      state.isComposingRootReply = false;
    },
    sortThreads: (state) => {
      state.isUpdatedSinceLastSort = false;
      state.numberOfNewThreadsSinceLastSort = 0;
      state.threads = state.threads.sort((a, b) => {
        return mostRecentUpdate(b).localeCompare(mostRecentUpdate(a));
      });
    },
    tagPostBegin: (state) => {
      state.isTaggingPost = true;
      state.taggingPostError = undefined;
    },
    tagPostFailure: (state, action: PayloadAction<string>) => {
      state.isTaggingPost = false;
      state.taggingPostError = action.payload;
    },
    tagPostSuccess: (state) => {
      state.isTaggingPost = false;
      state.taggingPostError = undefined;
    },
    updateFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: {
    '@@router/LOCATION_CHANGE': (state, action) => {
      const { pathname } = action.payload.location;
      const navigationAction = action.payload.action;

      if (navigationAction === 'POP') state.singleThreadNavigationStack.pop();

      if (pathname === routes.CHATTY) {
        state.mode = modes.CHATTY;
      } else if (pathname === routes.PINNED_THREADS) {
        state.mode = modes.PINNED_THREADS;
      } else if (pathname === routes.THREAD) {
        state.mode = modes.SINGLE_THREAD;
      }
    },
  },
});

export default chattySlice.reducer;

// Actions

export const {
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
  waitForEventsBegin,
  waitForEventsFailure,
  waitForEventsSuccess,
  fetchNewestEventIdBegin,
  fetchNewestEventIdFailure,
  fetchNewestEventIdSuccess,
  fetchSelectedThreadBegin,
  fetchSelectedThreadFailure,
  fetchSelectedThreadSuccess,
  fetchSelectedPinnedThreadBegin,
  fetchSelectedPinnedThreadFailure,
  fetchSelectedPinnedThreadSuccess,
  fetchSingleThreadBegin,
  fetchSingleThreadFailure,
  fetchSingleThreadSuccess,
  fetchThreadsBegin,
  fetchThreadsFailure,
  fetchThreadsSuccess,
  fetchPinnedThreadsBegin,
  fetchPinnedThreadsFailure,
  fetchPinnedThreadsSuccess,
  pinThread,
  unpinThread,
  postCommentReplyBegin,
  postCommentReplyFailure,
  postCommentReplySuccess,
  postRootPostBegin,
  postRootPostFailure,
  postRootPostSuccess,
  postRootReplyBegin,
  postRootReplyFailure,
  postRootReplySuccess,
  selectPost,
  selectSingleThreadPost,
  selectThread,
  sortThreads,
  tagPostBegin,
  tagPostFailure,
  tagPostSuccess,
  updateFilter,
} = chattySlice.actions;

export const fetchNewestEventId = (): AppThunk<Promise<number | undefined>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchNewestEventIdBegin());
    try {
      const response = await chattyAPI.getNewestEventId();
      const { eventId } = response;
      dispatch(fetchNewestEventIdSuccess(response.eventId));
      return eventId;
    } catch (error) {
      dispatch(
        fetchNewestEventIdFailure(
          'Something went wrong while trying to fetch the most recent update from the API server. Try a manual refresh.'
        )
      );
      return undefined;
    }
  };
};

export const waitForEvents = (
  lastEventId: number,
  now: Date
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(waitForEventsBegin());
    try {
      const response = await chattyAPI.waitForEvent(lastEventId);
      dispatch(
        waitForEventsSuccess({
          lastEventId: response.lastEventId,
          events: response.events,
          now,
        })
      );
      dispatch(waitForEvents(response.lastEventId, new Date()));
    } catch (error) {
      dispatch(
        waitForEventsFailure(
          'Something went wrong while waiting for updates from the API server. Try a manual refresh.'
        )
      );
    }
  };
};

export const fetchSelectedThread = (id: number): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchSelectedThreadBegin());
    try {
      const thread = await chattyAPI.fetchThread(id);
      dispatch(fetchSelectedThreadSuccess(thread));
    } catch (error) {
      dispatch(fetchSelectedThreadFailure('Failed to refresh thread'));
    }
  };
};

export const fetchSelectedPinnedThread = (
  id: number
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchSelectedPinnedThreadBegin());
    try {
      const thread = await chattyAPI.fetchThread(id);
      dispatch(fetchSelectedPinnedThreadSuccess(thread));
    } catch (error) {
      dispatch(fetchSelectedPinnedThreadFailure('Failed to refresh thread'));
    }
  };
};

export const fetchSingleThread = (
  threadId: number,
  postId?: number
): AppThunk<Promise<{ thread: Thread; post?: Post } | undefined>> => {
  return async (
    dispatch: AppDispatch
  ): Promise<{ thread: Thread; post?: Post } | undefined> => {
    dispatch(fetchSingleThreadBegin());
    try {
      const thread = await chattyAPI.fetchThread(threadId);
      const post = thread.posts.find((p) => p.id === postId);
      dispatch(fetchSingleThreadSuccess({ thread, post }));
      return { thread, post };
    } catch (error) {
      dispatch(fetchSingleThreadFailure('Failed to fetch thread'));
      return undefined;
    }
  };
};

export const fetchThreads = (): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(fetchThreadsBegin());
    try {
      const threads = await chattyAPI.fetchThreads();
      dispatch(fetchThreadsSuccess(threads));
    } catch (error) {
      dispatch(fetchThreadsFailure('Failed to refresh threads'));
    }
  };
};

export const fetchPinnedThreads = (): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(fetchPinnedThreadsBegin());

    const threadIds = getState().preferences.preferences.pinnedThreads;
    if (threadIds.length <= 0) {
      dispatch(fetchPinnedThreadsSuccess([]));
      return;
    }

    try {
      const threads = await chattyAPI.fetchThreads(threadIds);
      dispatch(fetchPinnedThreadsSuccess(threads));
    } catch (error) {
      dispatch(fetchPinnedThreadsFailure('Failed to refresh pinned threads'));
    }
  };
};

export const postCommentReply = (
  credentials: Credentials,
  parentId: number,
  comment: string
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(postCommentReplyBegin());
    try {
      await chattyAPI.postComment(credentials, parentId, comment);
      dispatch(postCommentReplySuccess());
    } catch (error) {
      dispatch(
        postCommentReplyFailure(
          'Oops! Something went wrong when posting. Have you tried turning it off and on?'
        )
      );
    }
  };
};

export const postRootPost = (
  credentials: Credentials,
  post: string
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(postRootPostBegin());
    try {
      await chattyAPI.postNewRootPost(credentials, post);
      dispatch(postRootPostSuccess());
      await dispatch(fetchThreads());
    } catch (error) {
      dispatch(
        postRootPostFailure(
          'Oops! Something went wrong when posting. Have you tried turning it off and on?'
        )
      );
    }
  };
};

export const postRootReply = (
  credentials: Credentials,
  parentId: number,
  comment: string
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(postRootReplyBegin());
    try {
      await chattyAPI.postComment(credentials, parentId, comment);
      dispatch(postRootReplySuccess());
    } catch (error) {
      dispatch(
        postRootReplyFailure(
          'Oops! Something went wrong when posting. Have you tried turning it off and on?'
        )
      );
    }
  };
};

export const tagPost = (post: Post, tag: string): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(tagPostBegin());

    const { credentials } = getState().preferences;
    if (!credentials) {
      dispatch(tagPostFailure('You must be logged in to tag a post'));
      return;
    }

    try {
      await chattyAPI.lolPost(credentials.username, post.id, tag);
      dispatch(tagPostSuccess());
    } catch (error) {
      dispatch(tagPostFailure('Failed to tag post'));
    }
  };
};

// Selectors

export const getCommentReplyError = (state: RootState) =>
  state.chatty.commentReplyError;
export const getFetchEventsError = (state: RootState) =>
  state.chatty.fetchEventsError;
export const getFetchThreadsError = (state: RootState) =>
  state.chatty.fetchThreadsError;
export const getFilter = (state: RootState) => state.chatty.filter;
export const getIsComposingCommentReply = (state: RootState) =>
  state.chatty.isComposingCommentReply;
export const getIsComposingRootPost = (state: RootState) =>
  state.chatty.isComposingRootPost;
export const getIsComposingRootReply = (state: RootState) =>
  state.chatty.isComposingRootReply;
export const getIsFetchingSelectedThread = (state: RootState) =>
  state.chatty.isFetchingSelectedThread;
export const getIsFetchingSingleThread = (state: RootState) =>
  state.chatty.isFetchingSingleThread;
export const getIsFetchingThreads = (state: RootState) =>
  state.chatty.isFetchingThreads;
export const getIsPostingCommentReply = (state: RootState) =>
  state.chatty.isPostingCommentReply;
export const getIsPostingRootPost = (state: RootState) =>
  state.chatty.isPostingRootPost;
export const getIsPostingRootReply = (state: RootState) =>
  state.chatty.isPostingRootReply;
export const getIsTaggingPost = (state: RootState) =>
  state.chatty.isTaggingPost;
export const getIsUpdatedSinceLastSort = (state: RootState) =>
  state.chatty.isUpdatedSinceLastSort;
export const getLatestEventId = (state: RootState) =>
  state.chatty.latestEventId;
export const getMode = (state: RootState) => state.chatty.mode;
export const getNumberOfNewThreadsSinceLastSort = (state: RootState) =>
  state.chatty.numberOfNewThreadsSinceLastSort;
export const getPinnedThreads = (state: RootState) =>
  state.chatty.pinnedThreads;
export const getRootPostError = (state: RootState) =>
  state.chatty.rootPostError;
export const getRootReplyError = (state: RootState) =>
  state.chatty.rootReplyError;
export const getSelectedPost = (state: RootState) => state.chatty.selectedPost;
export const getSelectedThread = (state: RootState) =>
  state.chatty.selectedThread;
export const getSingleThreadNavigationStack = (state: RootState) =>
  state.chatty.singleThreadNavigationStack;
export const getTaggingPostError = (state: RootState) =>
  state.chatty.taggingPostError;
export const getThreads = (state: RootState) => state.chatty.threads;

export const getFilteredThreads = createSelector(
  [getThreads, getPinnedThreads, getPreferences, getMode, getFilter],
  (
    threads: Thread[],
    pinnedThreads: Thread[],
    preferences: Preferences,
    mode: string,
    filter?: string
  ) => {
    let sourceThreads: Thread[];
    if (mode === modes.PINNED_THREADS) sourceThreads = pinnedThreads;
    else {
      sourceThreads = threads;
    }

    // Show pinned threads at the top of the thread list
    if (mode === modes.CHATTY) {
      const activePinnedThreads = sourceThreads.filter((thread) =>
        preferences.pinnedThreads.includes(thread.threadId)
      );

      // All threads minus active pinned threads
      sourceThreads = sourceThreads.filter((thread) => {
        for (const pinnedThread of activePinnedThreads) {
          if (pinnedThread.threadId === thread.threadId) {
            return false;
          }
        }
        return true;
      });

      activePinnedThreads.sort((a, b) =>
        a.root.date.localeCompare(b.root.date)
      );

      sourceThreads = activePinnedThreads.concat(sourceThreads);
    }

    let filteredThreads: Thread[];
    if (filter && filter.length !== 0) {
      filteredThreads = sourceThreads.filter((thread) =>
        thread.root.body.toLowerCase().includes(filter.toLowerCase())
      );
    } else {
      filteredThreads = sourceThreads;
    }

    const commentFilters: string[] = [];
    preferences.commentFilters.forEach((commentFilter) => {
      if (!commentFilter.checked) commentFilters.push(commentFilter.category);
    }, commentFilters);

    return filteredThreads.filter(
      (thread) => !commentFilters.includes(thread.root.category)
    );
  }
);
