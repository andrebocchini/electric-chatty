import React from 'react';
import classnames from 'classnames';
import { deSpoiler, stripAllHtml } from '../../../utils/postUtils';
import Post from '../../../types/Post';
import styles from './CompactPost.css';
import LOLBar from './LOLBar';

type Props = {
  className?: string;
  id?: string;
  isOriginalPoster?: boolean;
  onClick?: (post: Post) => void;
  post: Post;
  loggedInUser?: string;
};

export default function CompactPost(props: Props) {
  const {
    className,
    id,
    isOriginalPoster,
    onClick,
    post,
    loggedInUser,
  } = props;
  const deSpoiledBody = deSpoiler(post.body);
  const plainBody = stripAllHtml(deSpoiledBody);
  const { author } = post;

  return (
    <div
      className={classnames(className, styles.container)}
      id={id}
      onClick={() => onClick && onClick(post)}
      onKeyPress={() => onClick && onClick(post)}
      role="button"
      tabIndex={0}
    >
      <div className={styles.body}>{plainBody}</div>
      <LOLBar className={styles.lolBar} lols={post.lols} />
      <div
        className={classnames(
          styles.author,
          isOriginalPoster ? styles.originalPoster : '',
          loggedInUser === author ? styles.loggedInAuthor : ''
        )}
      >
        {post.author}
      </div>
    </div>
  );
}
