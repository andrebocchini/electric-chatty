import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import styles from './SideBarCellFooter.css';

type Props = {
  isPinned?: boolean;
  replies: number;
};

export default function SideBarCellFooter(props: Props) {
  const { isPinned, replies } = props;

  return (
    <div className={styles.container}>
      <div className={styles.replies}>{`${replies} replies`}</div>
      {isPinned && (
        <FontAwesomeIcon className={styles.pinIcon} icon={faThumbtack} />
      )}
    </div>
  );
}
