import React from 'react';
import classnames from 'classnames';
import styles from './LOLBar.css';
import LOL from '../../../types/LOL';
import LOLButton from './LOLButton';

function sortedTags(lols: LOL[]) {
  const sortedLols = lols.slice().sort((a: LOL, b: LOL) => {
    const result = a.tag.toLowerCase().localeCompare(b.tag.toLowerCase());

    if (result < 0) {
      return -1;
    }

    if (result > 0) {
      return 1;
    }

    return 0;
  });

  return sortedLols;
}

type Props = {
  className?: string;
  id?: string;
  lols: LOL[];
};

export default function LOLBar(props: Props) {
  const { className, id, lols } = props;

  return (
    <div className={classnames(styles.container, className)} id={id}>
      {sortedTags(lols).map((lol) => {
        return (
          <LOLButton
            id={`${lol.tag}Tag`}
            key={lol.tag}
            tag={lol.tag}
            count={lol.count}
          />
        );
      })}
    </div>
  );
}
