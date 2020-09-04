import React from 'react';
import Toast from 'react-bootstrap/Toast';
import classnames from 'classnames';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './NotificationToast.css';
import ElectricChattyNotification from '../../../types/ElectricChattyNotification';
import ElectricChattyNotificationType from '../../../types/ElectricChattyNotificationType';

type Props = {
  className?: string;
  id?: string;
  notification: ElectricChattyNotification;
  onClose?: () => void;
};

export default function NotificationToast(props: Props) {
  const { className, id, notification, onClose } = props;
  const { message, title, type } = notification;

  return (
    <Toast
      autohide
      className={classnames(styles.toast, className)}
      delay={5000}
      id={id}
      onClose={() => onClose && onClose()}
      show
    >
      <Toast.Header>
        <FontAwesomeIcon
          className={classnames(
            styles.titleIcon,
            type === ElectricChattyNotificationType.Success
              ? styles.success
              : styles.error
          )}
          icon={
            type === ElectricChattyNotificationType.Success
              ? faCheckCircle
              : faExclamationCircle
          }
        />
        <span className={classnames('mr-auto', styles.titleText)}>{title}</span>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
}
