import ElectricChattyNotification from '../types/ElectricChattyNotification';
import {
  generateNotification,
  successNotification,
  errorNotification,
} from './notificationsUtils';
import ElectricChattyNotificationType from '../types/ElectricChattyNotificationType';

describe('Notification utils tests', () => {
  it('should generate a notification with a unique ID', () => {
    const notification: ElectricChattyNotification = generateNotification(
      ElectricChattyNotificationType.Success,
      'Message'
    );
    expect(notification.title).toEqual('Success');
    expect(notification.message).toEqual('Message');
    expect(notification.id.length).toBeGreaterThan(0);
  });

  it('should generate a success notification with a unique ID', () => {
    const notification: ElectricChattyNotification = successNotification(
      'Message'
    );
    expect(notification.title).toEqual('Success');
    expect(notification.message).toEqual('Message');
    expect(notification.id.length).toBeGreaterThan(0);
  });

  it('should generate an error notification with a unique ID', () => {
    const notification: ElectricChattyNotification = errorNotification(
      'Message'
    );
    expect(notification.title).toEqual('Error');
    expect(notification.message).toEqual('Message');
    expect(notification.id.length).toBeGreaterThan(0);
  });
});
