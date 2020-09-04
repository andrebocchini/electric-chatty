import React from 'react';
import classnames from 'classnames';
import styles from './SideBar.css';
import SideBarFilter from './SideBarFilter';
import Thread from '../../../types/Thread';
import SideBarCell from './SideBarCell';

type Props = {
  className?: string;
  filter?: string;
  id?: string;
  loggedInUser?: string;
  onFilter?: (filter: string) => void;
  onSelectThread?: (thread: Thread) => void;
  pinnedThreadIds?: number[];
  selectedThread?: Thread;
  threads: Thread[];
};

export default function SideBar(props: Props) {
  const {
    className,
    filter,
    id,
    loggedInUser,
    onFilter,
    onSelectThread,
    pinnedThreadIds,
    selectedThread,
    threads,
  } = props;

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <SideBarFilter
        className={styles.filter}
        filter={filter}
        onFilter={onFilter}
      />
      <div>
        {threads.map((thread, index) => {
          return (
            <SideBarCell
              // eslint-disable-next-line react/no-array-index-key
              key={`thread_${thread.threadId}_${index}`}
              loggedInUser={loggedInUser}
              onClick={onSelectThread}
              selected={selectedThread?.threadId === thread.threadId}
              thread={thread}
              isPinned={pinnedThreadIds?.includes(thread.threadId)}
            />
          );
        })}
      </div>
    </div>
  );
}
