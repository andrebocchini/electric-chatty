import React from 'react';
import classnames from 'classnames';
import ExpandedPostHeader from './ExpandedPostHeader';
import Post from '../../../types/Post';
import styles from './ExpandedPost.css';
import LOLBar from './LOLBar';
import ExpandedPostFooter from './ExpandedPostFooter';
import ComposePost from './ComposePost';
import { postForDisplay } from '../../../utils/postUtils';
import EmbedPreferences from '../../../types/EmbedPreferences';

type Props = {
  className?: string;
  embedPreferences?: EmbedPreferences;
  id?: string;
  isComposingReply?: boolean;
  isLoggedIn?: boolean;
  isPinned?: boolean;
  isPostingReply?: boolean;
  isRefreshing?: boolean;
  loggedInUser?: string;
  onCancelButtonClicked?: () => void;
  onChattyThreadClicked?: (threadId: number, postId?: number) => void;
  onDimissErrorButtonClicked?: () => void;
  onPinButtonClicked?: (threadId: number) => void;
  onPostButtonClicked?: (post: Post, reply: string) => void;
  onRefreshButtonClicked?: (threadId: number) => void;
  onReplyButtonClicked?: () => void;
  onTagClicked?: (post: Post, tag: string) => void;
  post: Post;
  postingError?: string;
  showPinButton?: boolean;
  showRefreshButton?: boolean;
};

export default function ExpandedPost(props: Props) {
  const {
    className,
    embedPreferences,
    id,
    isComposingReply,
    isLoggedIn,
    isPinned,
    isPostingReply,
    isRefreshing,
    loggedInUser,
    onCancelButtonClicked,
    onChattyThreadClicked,
    onDimissErrorButtonClicked,
    onPinButtonClicked,
    onPostButtonClicked,
    onRefreshButtonClicked,
    onReplyButtonClicked,
    onTagClicked,
    postingError,
    post,
    showPinButton,
    showRefreshButton,
  } = props;

  function handlePostButtonClicked(reply: string) {
    if (onPostButtonClicked) onPostButtonClicked(post, reply);
  }

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <ExpandedPostHeader loggedInUser={loggedInUser} post={post} />
      <LOLBar className={styles.lolBar} lols={post.lols} />
      <div className={styles.body}>
        {postForDisplay(post, embedPreferences, onChattyThreadClicked)}
      </div>
      <ExpandedPostFooter
        className={isComposingReply ? styles.footer : ''}
        isPinned={isPinned}
        isRefreshing={isRefreshing}
        post={post}
        onPinButtonClicked={onPinButtonClicked}
        onReplyButtonClicked={onReplyButtonClicked}
        onRefreshButtonClicked={onRefreshButtonClicked}
        onTagClicked={onTagClicked}
        showPinButton={showPinButton}
        showRefreshButton={showRefreshButton}
      />
      {isComposingReply && (
        <ComposePost
          error={postingError}
          isLoggedIn={isLoggedIn}
          isPosting={isPostingReply}
          onCancelButtonClicked={onCancelButtonClicked}
          onDimissErrorButtonClicked={onDimissErrorButtonClicked}
          onPostButtonClicked={handlePostButtonClicked}
        />
      )}
    </div>
  );
}
