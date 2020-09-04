import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import Button from 'react-bootstrap/Button';
import styles from './ToolbarButton.css';

type Props = {
  className?: string;
  icon?: IconDefinition;
  id?: string;
  onClick?: () => void;
  title?: string;
};

export default function ToolbarButton(props: Props) {
  const { className, icon, id, onClick, title } = props;

  return (
    <Button
      className={classnames(styles.container, className)}
      id={id}
      onClick={() => onClick && onClick()}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {title && <span className={styles.title}>{title}</span>}
    </Button>
  );
}
