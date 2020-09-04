import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNotifications, dismissNotification } from './notificationsSlice';
import NotificationToast from './components/NotificationToast';
import { AppDispatch } from '../../config/store';
import styles from './index.css';

export default function NotificationCenter() {
  const notifications = useSelector(getNotifications);
  const dispatch: AppDispatch = useDispatch();

  function handleCloseNotification(id: string) {
    dispatch(dismissNotification(id));
  }

  return (
    <div className={styles.notificationCenter}>
      {Object.keys(notifications).map((key) => {
        const notification = notifications[key];
        if (notification) {
          return (
            <NotificationToast
              key={key}
              notification={notification}
              onClose={() => handleCloseNotification(key)}
            />
          );
        }

        return undefined;
      })}
    </div>
  );
}
