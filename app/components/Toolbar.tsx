import React from 'react';
import classnames from 'classnames';
import styles from './Toolbar.css';

type Props = {
  buttons?: JSX.Element[];
  className?: string;
  id?: string;
  title: string;
};

export default function Toolbar(props: Props) {
  const { buttons, className, id, title } = props;

  return (
    <div className={classnames(className, styles.container)} id={id}>
      <div className={styles.title}>{title}</div>
      <div className={styles.buttons}>
        {buttons?.map((button, index) => {
          return <div key={index}>{button}</div>;
        })}
      </div>
    </div>
  );
}
