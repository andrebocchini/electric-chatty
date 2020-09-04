import React from 'react';
import classnames from 'classnames';
import Post from '../../../types/Post';
import Thread from '../../../types/Thread';
import styles from './ThreadPane.css';
import ExpandedPost from './ExpandedPost';
import PostList from './PostList';
import EmbedPreferences from '../../../types/EmbedPreferences';

type Props = {
  className?: string;
  embedPreferences?: EmbedPreferences;
  id?: string;
  isLoggedIn?: boolean;
  isComposingCommentReply?: boolean;
  isComposingRootReply?: boolean;
  isPostingCommentReply?: boolean;
  isPostingRootReply?: boolean;
  isRefreshingSingleThread?: boolean;
  loggedInUser?: string;
  onChattyThreadClicked?: (threadId: number, postId?: number) => void;
  onCommentReplyBeginComposing?: () => void;
  onCommentReplyCancelComposing?: () => void;
  onCommentReplyPost?: (post: Post, reply: string) => void;
  onDismissCommentReplyError?: () => void;
  onDismissRootReplyError?: () => void;
  onPinButtonClicked?: (threadId: number) => void;
  onRefreshSingleThreadButtonClicked?: (threadId: number) => void;
  onRootReplyBeginComposing?: () => void;
  onRootReplyCancelComposing?: () => void;
  onRootReplyPost?: (post: Post, reply: string) => void;
  onSelectPost?: (post: Post) => void;
  onTagClicked?: (post: Post, tag: string) => void;
  pinnedThreads?: number[];
  postingCommentReplyError?: string;
  postingRootReplyError?: string;
  selectedPost?: Post;
  showPinButton?: boolean;
  thread: Thread;
};

export default function ThreadPane(props: Props) {
  const {
    className,
    embedPreferences,
    id,
    isLoggedIn,
    isComposingCommentReply,
    isComposingRootReply,
    isPostingCommentReply,
    isPostingRootReply,
    isRefreshingSingleThread,
    loggedInUser,
    onChattyThreadClicked,
    onCommentReplyBeginComposing,
    onCommentReplyCancelComposing,
    onCommentReplyPost,
    onDismissCommentReplyError,
    onDismissRootReplyError,
    onPinButtonClicked,
    onRefreshSingleThreadButtonClicked,
    onRootReplyBeginComposing,
    onRootReplyCancelComposing,
    onRootReplyPost,
    onSelectPost,
    onTagClicked,
    pinnedThreads,
    postingRootReplyError,
    postingCommentReplyError,
    selectedPost,
    showPinButton,
    thread,
  } = props;

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <ExpandedPost
        id={`${thread.threadId}`}
        className={styles.rootPost}
        embedPreferences={embedPreferences}
        isComposingReply={isComposingRootReply}
        isLoggedIn={isLoggedIn}
        isPinned={pinnedThreads?.includes(thread.threadId)}
        isPostingReply={isPostingRootReply}
        isRefreshing={isRefreshingSingleThread}
        loggedInUser={loggedInUser}
        onCancelButtonClicked={onRootReplyCancelComposing}
        onChattyThreadClicked={onChattyThreadClicked}
        onDimissErrorButtonClicked={onDismissRootReplyError}
        onPinButtonClicked={onPinButtonClicked}
        onPostButtonClicked={onRootReplyPost}
        onRefreshButtonClicked={onRefreshSingleThreadButtonClicked}
        onReplyButtonClicked={onRootReplyBeginComposing}
        onTagClicked={onTagClicked}
        post={thread.root}
        postingError={postingRootReplyError}
        showPinButton={showPinButton}
        showRefreshButton
      />
      <PostList
        embedPreferences={embedPreferences}
        isComposingReply={isComposingCommentReply}
        isLoggedIn={isLoggedIn}
        isPostingReply={isPostingCommentReply}
        loggedInUser={loggedInUser}
        onChattyThreadClicked={onChattyThreadClicked}
        onCommentReplyBeginComposing={onCommentReplyBeginComposing}
        onCommentReplyCancelComposing={onCommentReplyCancelComposing}
        onCommentReplyPost={onCommentReplyPost}
        onDismissCommentReplyError={onDismissCommentReplyError}
        onSelectPost={onSelectPost}
        onTagClicked={onTagClicked}
        postingReplyError={postingCommentReplyError}
        selectedPost={selectedPost}
        thread={thread}
      />
    </div>
  );
}
