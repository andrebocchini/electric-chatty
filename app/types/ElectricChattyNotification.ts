import ElectricChattyNotificationType from './ElectricChattyNotificationType';

export default interface ElectricChattyNotification {
  id: string;
  message: string;
  title: string;
  type: ElectricChattyNotificationType;
}
