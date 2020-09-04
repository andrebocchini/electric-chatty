import React from 'react';
import classnames from 'classnames';
import styles from './SplitPane.css';

type Props = {
  className?: string;
  id?: string;
  left?: JSX.Element;
  right?: JSX.Element;
};

export default function SplitPane(props: Props) {
  const { className, id, left, right } = props;

  const leftStyle = left ? { width: '30%' } : { width: '0%' };
  const rightStyle = left ? { width: '70%' } : { width: '100%' };

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <div className={styles.left} id="left" style={leftStyle}>
        {left}
      </div>
      <div className={styles.right} id="right" style={rightStyle}>
        {right}
      </div>
    </div>
  );
}
