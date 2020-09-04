import React from 'react';
import moment from 'moment';
import classnames from 'classnames';
import Post from '../../../types/Post';
import styles from './ExpandedPostHeader.css';

type Props = {
  className?: string;
  id?: string;
  loggedInUser?: string;
  post: Post;
};

export default function ExpandedPostHeader(props: Props) {
  const { className, id, loggedInUser, post } = props;
  const { author, date } = post;
  const displayDate = moment(Date.parse(date)).fromNow();

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
