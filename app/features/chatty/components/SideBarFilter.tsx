import React from 'react';
import classnames from 'classnames';
import styles from './SideBarFilter.css';

type Props = {
  className?: string;
  id?: string;
  filter?: string;
  onFilter?: (filter: string) => void;
};

export default function SideBarFilter(props: Props) {
  const { className, filter, id, onFilter } = props;

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    if (onFilter) onFilter(event.currentTarget.value);
  }

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <input
        className={styles.filter}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          return handleChange(e);
        }}
        name="filter"
        placeholder="Filter"
        type="search"
        value={filter}
      />
    </div>
  );
}
