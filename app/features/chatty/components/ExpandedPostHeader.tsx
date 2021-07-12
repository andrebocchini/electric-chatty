import React from 'react';
import dayjs from 'dayjs';
import classnames from 'classnames';
import relativeTime from 'dayjs/plugin/relativeTime';
import Post from '../../../types/Post';
import styles from './ExpandedPostHeader.css';

dayjs.extend(relativeTime);

type Props = {
  className?: string;
  id?: string;
  loggedInUser?: string;
  post: Post;
};

export default function ExpandedPostHeader(props: Props) {
  const { className, id, loggedInUser, post } = props;
  const { author, date } = post;
  const displayDate = dayjs(date).fromNow();

  function authorStyle() {
    if (loggedInUser === author) {
      return styles.loggedInAuthor;
    }
    if (author === 'Shacknews') {
      return styles.shacknews;
    }
    return '';
  }

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <span className={classnames(styles.author, authorStyle())}>
        {post.author}
      </span>
      <span className={styles.date}>{displayDate}</span>
    </div>
  );
}
