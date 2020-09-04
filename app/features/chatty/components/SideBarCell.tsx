import React from 'react';
import classnames from 'classnames';
import { deSpoiler, stripAllHtml } from '../../../utils/postUtils';
import styles from './SideBarCell.css';
import Thread from '../../../types/Thread';
import SideBarCellFooter from './SideBarCellFooter';
import SideBarCellHeader from './SideBarCellHeader';

type Props = {
  className?: string;
  id?: string;
  isPinned?: boolean;
  loggedInUser?: string;
  onClick?: (thread: Thread) => void;
  selected?: boolean;
  thread: Thread;
};

function isParticipant(thread: Thread, loggedInUser?: string) {
  return thread.posts.filter((post) => post.author === loggedInUser).length > 0;
}

function determineCategoryStyle(category: string) {
  switch (category) {
    case 'political':
      return styles.political;
    case 'nws':
      return styles.nws;
    default:
      return '';
  }
}

export default function SideBarCell(props: Props) {
  const {
    className,
    id,
    isPinned,
    loggedInUser,
    onClick,
    selected,
    thread,
  } = props;
  const { author, body, date, lols } = thread.root;
  const deSpoiledBody = deSpoiler(body);
  const plainBody = stripAllHtml(deSpoiledBody);
  const participant = isParticipant(thread, loggedInUser);
  const categoryStyle = determineCategoryStyle(thread.root.category);

  const containerClasses = classnames(
    styles.container,
    selected ? styles.selected : '',
    categoryStyle,
    participant && !selected ? styles.participant : '',
    className
  );

  return (
    <div
      id={id}
      className={containerClasses}
      onClick={() => onClick && onClick(thread)}
      onKeyPress={() => onClick && onClick(thread)}
      role="button"
      tabIndex={0}
    >
      <SideBarCellHeader
        author={author}
        date={date}
        loggedInUser={loggedInUser}
        lols={lols}
      />
      <div className={styles.body}>{plainBody}</div>
      <SideBarCellFooter isPinned={isPinned} replies={thread.posts.length} />
    </div>
  );
}
