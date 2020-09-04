import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import {
  composingCommentReplyBegin,
  composingCommentReplyCancel,
  composingRootPostBegin,
  composingRootPostCancel,
  composingRootReplyBegin,
  composingRootReplyCancel,
  dismissCommentReplyError,
  dismissRootPostError,
  dismissRootReplyError,
  fetchSelectedThread,
  fetchThreads,
  getFilter,
  getIsComposingCommentReply,
  getIsComposingRootPost,
  getIsComposingRootReply,
  getFilteredThreads,
  getIsFetchingThreads,
  getIsPostingCommentReply,
  getIsPostingRootPost,
  getIsPostingRootReply,
  getCommentReplyError,
  getMode,
  getRootPostError,
  getRootReplyError,
  getSelectedPost,
  getSelectedThread,
  pinThread,
  postCommentReply,
  postRootPost,
  postRootReply,
  selectPost,
  selectThread,
  updateFilter,
  tagPost,
  fetchPinnedThreads,
  fetchSingleThread,
  getIsFetchingSingleThread,
  fetchSelectedPinnedThread,
  getIsFetchingSelectedThread,
  getSingleThreadNavigationStack,
  selectSingleThreadPost,
  sortThreads,
  fetchNewestEventId,
  getFetchEventsError,
  getFetchThreadsError,
  getIsUpdatedSinceLastSort,
  getNumberOfNewThreadsSinceLastSort,
  getPinnedThreads,
  unpinThread,
  waitForEvents,
} from './chattySlice';
import {
  getIsLoggedIn,
  getCredentials,
  getPreferences,
  markPost,
} from '../preferences/preferencesSlice';
import Post from '../../types/Post';
import Thread from '../../types/Thread';
import ThreadPane from './components/ThreadPane';
import SideBar from './components/SideBar';
import styles from './index.css';
import Toolbar from '../../components/Toolbar';
import SplitPane from '../../components/SplitPane';
import { AppDispatch } from '../../config/store';
import ComposeRootPost from './components/ComposeRootPost';
import ToolbarButton from '../../components/ToolbarButton';
import RefreshButton from './components/RefreshButton';
import * as modes from '../../constants/modes';
import ScreenLoadingIndicator from '../../components/ScreenLoadingIndicator';
import { getStartupError } from '../app/appSlice';

export default function ChattyScreen() {
  const credentials = useSelector(getCredentials);
  const dispatch: AppDispatch = useDispatch();
  const fetchEventsError = useSelector(getFetchEventsError);
  const fetchThreadsError = useSelector(getFetchThreadsError);
  const filter = useSelector(getFilter);
  const history = useHistory();
  const isComposingCommentReply = useSelector(getIsComposingCommentReply);
  const isComposingRootPost = useSelector(getIsComposingRootPost);
  const isComposingRootReply = useSelector(getIsComposingRootReply);
  const isFetchingSelectedThread = useSelector(getIsFetchingSelectedThread);
  const isFetchingSingleThread = useSelector(getIsFetchingSingleThread);
  const isFetchingThreads = useSelector(getIsFetchingThreads);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isPostingCommentReply = useSelector(getIsPostingCommentReply);
  const isPostingRootPost = useSelector(getIsPostingRootPost);
  const isPostingRootReply = useSelector(getIsPostingRootReply);
  const isUpdatedSinceLastSort = useSelector(getIsUpdatedSinceLastSort);
  const mode = useSelector(getMode);
  const numberOfNewThreadsSinceLastSort = useSelector(
    getNumberOfNewThreadsSinceLastSort
  );
  const pinnedThreads = useSelector(getPinnedThreads);
  const preferences = useSelector(getPreferences);
  const postingCommentReplyError = useSelector(getCommentReplyError);
  const postingRootPostError = useSelector(getRootPostError);
  const postingRootReplyError = useSelector(getRootReplyError);
  const selectedPost = useSelector(getSelectedPost);
  const selectedThread = useSelector(getSelectedThread);
  const singleThreadNavigationStack = useSelector(
    getSingleThreadNavigationStack
  );
  const startupError = useSelector(getStartupError);
  const threads = useSelector(getFilteredThreads);

  function refreshButtonVariant() {
    if ((fetchEventsError || startupError) && mode === modes.CHATTY) {
      return 'danger';
    }
    if (isUpdatedSinceLastSort && mode === modes.CHATTY) {
      return 'primary';
    }
    if (mode === modes.PINNED_THREADS) {
      return 'primary';
    }
    return 'secondary';
  }

  function shouldShowNewPostCountBadge() {
    return numberOfNewThreadsSinceLastSort > 0 && mode === modes.CHATTY;
  }

  async function handleChattyThreadClicked(threadId: number, postId?: number) {
    await dispatch(fetchSingleThread(threadId, postId));
    history.push({
      pathname: '/thread',
      search: `?threadId=${threadId}`,
    });
    document.querySelector('#threadPane')?.scrollTo(0, 0);
  }

  // Tagging

  function handleTagClicked(post: Post, tag: string) {
    dispatch(tagPost(post, tag));
  }

  // Threads

  async function handleRefreshThreads() {
    if (!isFetchingThreads) {
      switch (mode) {
        case modes.PINNED_THREADS:
          dispatch(fetchPinnedThreads());
          break;
        default:
          if (fetchEventsError || fetchThreadsError || startupError) {
            await dispatch(fetchThreads());
            const eventId = await dispatch(fetchNewestEventId());
            if (eventId) {
              dispatch(waitForEvents(eventId, new Date()));
            }
          } else {
            dispatch(sortThreads());
          }
      }
    }
    document.querySelector('#sideBar')?.scrollTo(0, 0);
  }

  function handleSelectThread(thread: Thread) {
    dispatch(selectThread(thread));
    document.querySelector('#threadPane')?.scrollTo(0, 0);
  }

  function handleSelectPost(post: Post) {
    if (mode === modes.SINGLE_THREAD) {
      dispatch(selectSingleThreadPost(post));
    } else {
      dispatch(selectPost(post));
    }
  }

  function handleFilterChanged(newFilter: string) {
    dispatch(updateFilter(newFilter));
  }

  function handleRefreshSingleThread(threadId: number) {
    switch (mode) {
      case modes.SINGLE_THREAD:
        dispatch(fetchSingleThread(threadId));
        break;
      case modes.PINNED_THREADS:
        dispatch(fetchSelectedPinnedThread(threadId));
        break;
      default:
        dispatch(fetchSelectedThread(threadId));
    }
  }

  function handlePinButtonClicked(threadId: number) {
    const pinnedThread = pinnedThreads.find((t) => t.threadId === threadId);
    const username = credentials?.username;
    if (pinnedThread) {
      dispatch(unpinThread(pinnedThread));

      if (username) {
        dispatch(markPost(username, pinnedThread.threadId, 'unmarked'));
      }
      return;
    }

    const thread = threads.find((t) => t.threadId === threadId);
    if (thread) {
      dispatch(pinThread(thread));

      if (username) {
        dispatch(markPost(username, thread.threadId, 'pinned'));
      }
    }
  }

  // Commenting

  function handleCommentReplyBeginComposing() {
    dispatch(composingCommentReplyBegin());
  }

  function handleCommentReplyCancelComposing() {
    dispatch(composingCommentReplyCancel());
  }

  function handleCommentReplyDismissError() {
    dispatch(dismissCommentReplyError());
  }

  function handleCommentReplyPost(post: Post, reply: string) {
    if (credentials) {
      dispatch(postCommentReply(credentials, post.id, reply));
    }
  }

  function handleRootReplyBeginComposing() {
    dispatch(composingRootReplyBegin());
  }

  function handleRootReplyCancelComposing() {
    dispatch(composingRootReplyCancel());
  }

  function handleRootReplytDismissError() {
    dispatch(dismissRootReplyError());
  }

  function handleRootReplyPost(post: Post, reply: string) {
    if (credentials) {
      dispatch(postRootReply(credentials, post.id, reply));
    }
  }

  // Root posting

  function handleRootPostBeginComposing() {
    dispatch(composingRootPostBegin());
  }

  function handleRootPostCancelComposing() {
    dispatch(composingRootPostCancel());
  }

  function handleRootPostDismissError() {
    dispatch(dismissRootPostError());
  }

  function handleRootPostPost(post: string) {
    if (credentials) {
      dispatch(postRootPost(credentials, post));
    }
  }

  // UI elements

  if (isFetchingSingleThread) {
    return <ScreenLoadingIndicator />;
  }

  function threadPane() {
    let thread;
    let post;

    if (selectedThread && mode !== modes.SINGLE_THREAD) {
      thread = selectedThread;
      post = selectedPost;
    } else if (mode === modes.SINGLE_THREAD) {
      const { length } = singleThreadNavigationStack;
      if (length > 0) {
        const entry = singleThreadNavigationStack[length - 1];
        thread = entry.thread;
        post = entry.post;
      }
    }

    if (thread) {
      return (
        <ThreadPane
          embedPreferences={preferences.embedPreferences}
          id="threadPane"
          isComposingCommentReply={isComposingCommentReply}
          isComposingRootReply={isComposingRootReply}
          isLoggedIn={isLoggedIn}
          isPostingCommentReply={isPostingCommentReply}
          isPostingRootReply={isPostingRootReply}
          isRefreshingSingleThread={
            mode === modes.SINGLE_THREAD
              ? isFetchingSingleThread
              : isFetchingSelectedThread
          }
          loggedInUser={credentials?.username}
          onChattyThreadClicked={handleChattyThreadClicked}
          onCommentReplyBeginComposing={handleCommentReplyBeginComposing}
          onCommentReplyCancelComposing={handleCommentReplyCancelComposing}
          onCommentReplyPost={handleCommentReplyPost}
          onDismissCommentReplyError={handleCommentReplyDismissError}
          onDismissRootReplyError={handleRootReplytDismissError}
          onPinButtonClicked={handlePinButtonClicked}
          onRefreshSingleThreadButtonClicked={handleRefreshSingleThread}
          onRootReplyBeginComposing={handleRootReplyBeginComposing}
          onRootReplyCancelComposing={handleRootReplyCancelComposing}
          onRootReplyPost={handleRootReplyPost}
          onSelectPost={handleSelectPost}
          onTagClicked={handleTagClicked}
          pinnedThreads={preferences.pinnedThreads}
          postingCommentReplyError={postingCommentReplyError}
          postingRootReplyError={postingRootReplyError}
          showPinButton
          selectedPost={post}
          thread={thread}
        />
      );
    }

    return undefined;
  }

  function toolbarButtons() {
    const refreshButton = (
      <Button
        className={styles.toolbarButton}
        key="chatty_toolbar_refreshButton"
        onClick={handleRefreshThreads}
        variant={refreshButtonVariant()}
        disabled={
          !isUpdatedSinceLastSort &&
          mode === modes.CHATTY &&
          !fetchEventsError &&
          !startupError
        }
      >
        <RefreshButton isRefreshing={isFetchingThreads} />
        {shouldShowNewPostCountBadge() && (
          <Badge variant="light" style={{ marginLeft: '8px' }}>
            {numberOfNewThreadsSinceLastSort}
          </Badge>
        )}
      </Button>
    );

    const newPostButton = (
      <ToolbarButton
        icon={faEdit}
        key="chatty_toolbar_newPost"
        onClick={() => handleRootPostBeginComposing()}
        title="New Post"
      />
    );

    return mode === modes.SINGLE_THREAD ? [] : [refreshButton, newPostButton];
  }

  function toolbarTitle() {
    switch (mode) {
      case modes.SINGLE_THREAD:
        return 'Thread';
      case modes.PINNED_THREADS:
        return 'Pinned Threads';
      default:
        return 'Chatty';
    }
  }

  const sideBar =
    mode !== modes.SINGLE_THREAD ? (
      <SideBar
        filter={filter}
        id="sideBar"
        loggedInUser={credentials?.username}
        onFilter={handleFilterChanged}
        onSelectThread={handleSelectThread}
        pinnedThreadIds={preferences.pinnedThreads}
        selectedThread={selectedThread}
        threads={threads}
      />
    ) : undefined;

  return (
    <div>
      {isComposingRootPost && (
        <ComposeRootPost
          error={postingRootPostError}
          isLoggedIn={isLoggedIn}
          isPosting={isPostingRootPost}
          onCancel={handleRootPostCancelComposing}
          onDismissError={handleRootPostDismissError}
          onPost={handleRootPostPost}
        />
      )}
      <Toolbar buttons={toolbarButtons()} title={toolbarTitle()} />
      <SplitPane left={sideBar} right={threadPane()} />
    </div>
  );
}
