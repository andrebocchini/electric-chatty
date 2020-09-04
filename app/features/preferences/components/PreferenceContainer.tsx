import React from 'react';
import classnames from 'classnames';
import styles from './PreferenceContainer.css';

type Props = {
  children?: React.ReactNode;
  className?: string;
  description?: string;
  id?: string;
  title?: string;
};

export default function PreferenceContainer(props: Props) {
  const { children, className, description, id, title } = props;

  return (
    <div className={classnames(styles.container, className)} id={id}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.description}>{description}</p>
      <div className={styles.children}>{children}</div>
    </div>
  );
}
