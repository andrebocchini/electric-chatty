import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import styles from './RefreshButton.css';

type Props = {
  className?: string;
  id?: string;
  isRefreshing?: boolean;
  onClick?: () => void;
};

export default function RefreshButton(props: Props) {
  const { className, id, isRefreshing, onClick } = props;

  return (
    <FontAwesomeIcon
      className={classnames(className, isRefreshing ? styles.refreshing : '')}
      icon={faSync}
      id={id}
      onClick={() => onClick && onClick()}
    />
  );
}
