import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import moment from 'moment';
import classnames from 'classnames';
import LOL from '../../../types/LOL';
import LOLBar from './LOLBar';
import styles from './SideBarCellHeader.css';
import {
  hoursUntilExpiration,
  percentExpired,
} from '../../../utils/threadUtils';

type Props = {
  author: string;
  date: string;
  loggedInUser?: string;
  lols: LOL[];
};

export default function SideBarCellHeader(props: Props) {
  const { author, date, loggedInUser, lols } = props;
  const displayDate = moment(Date.parse(date)).fromNow();
  const hoursUtilThreadExpires = hoursUntilExpiration(
    new Date(date),
    new Date()
  );
  const progressThroughExpiration = percentExpired(hoursUtilThreadExpires);

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
    <div>
      <div className={styles.header}>
        <span className={classnames(styles.author, authorStyle())}>
          {author}
        </span>
        <span className={styles.date}>{displayDate}</span>
      </div>
      <div className={styles.subHeader}>
        <LOLBar lols={lols} className={styles.lolBar} />
        <ProgressBar
          className={classnames(styles.progress, styles.expiration)}
          now={progressThroughExpiration}
        />
      </div>
    </div>
  );
}
