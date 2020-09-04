import ElectricChattyNotification from './ElectricChattyNotification';

export default interface NotificationsState {
  notifications: Record<string, ElectricChattyNotification>;
}
