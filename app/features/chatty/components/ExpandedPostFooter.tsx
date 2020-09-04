/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faReply,
  faTags,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import styles from './ExpandedPostFooter.css';
import Post from '../../../types/Post';
import RefreshButton from './RefreshButton';
import LOLPopover from './LOLPopover';

type Props = {
  className?: string;
  id?: string;
  isPinned?: boolean;
  isRefreshing?: boolean;
  post: Post;
  onPinButtonClicked?: (threadId: number) => void;
  onRefreshButtonClicked?: (threadId: number) => void;
  onReplyButtonClicked?: (post: Post) => void;
  onTagClicked?: (post: Post, tag: string) => void;
  showPinButton?: boolean;
  showRefreshButton?: boolean;
};

export default function ExpandedPostFooter(props: Props) {
  const [showTagPopover, setShowTagPopover] = useState(false);
  const target = useRef(null);
  const {
    className,
    id,
    isPinned,
    isRefreshing,
    post,
    onPinButtonClicked,
    onRefreshButtonClicked,
    onReplyButtonClicked,
    onTagClicked,
    showPinButton,
    showRefreshButton,
  } = props;

  function handlePinButtonClicked() {
    if (onPinButtonClicked) onPinButtonClicked(post.threadId);
  }

  function handleRefreshButtonClicked() {
    if (onRefreshButtonClicked) onRefreshButtonClicked(post.threadId);
  }

  function handleReplyButtonClicked() {
    if (onReplyButtonClicked) onReplyButtonClicked(post);
  }

  function handleTagButtonClick() {
    setShowTagPopover(!showTagPopover);
  }

  function handleTagClick(tag: string) {
    setShowTagPopover(false);
    if (onTagClicked) onTagClicked(post, tag);
  }

  return (
    <div className={classnames(styles.container, className)} id={id}>
      {showRefreshButton && (
        <RefreshButton
          className={styles.button}
          id="refreshButton"
          isRefreshing={isRefreshing}
          onClick={() => handleRefreshButtonClicked()}
        />
      )}
      <FontAwesomeIcon
        className={styles.button}
        icon={faReply}
        id="replyButton"
        onClick={() => handleReplyButtonClicked()}
      />
      <div className={styles.button} id="tagButton" ref={target}>
        <FontAwesomeIcon icon={faTags} onClick={() => handleTagButtonClick()} />
      </div>
      <LOLPopover
        show={showTagPopover}
        onHide={() => setShowTagPopover(false)}
        onTagClick={handleTagClick}
        target={(target as unknown) as HTMLElement}
      />
      {showPinButton && (
        <FontAwesomeIcon
          className={classnames(
            styles.button,
            isPinned ? styles.pinned : styles.unpinned
          )}
          id="pinButton"
          icon={faThumbtack}
          onClick={() => handlePinButtonClicked()}
        />
      )}
    </div>
  );
}
