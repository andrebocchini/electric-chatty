import { v4 as uuidv4 } from 'uuid';
import ElectricChattyNotification from '../types/ElectricChattyNotification';
import ElectricChattyNotificationType from '../types/ElectricChattyNotificationType';

export function generateNotification(
  type: ElectricChattyNotificationType,
  message: string
): ElectricChattyNotification {
  return {
    id: uuidv4(),
    title:
      type === ElectricChattyNotificationType.Success ? 'Success' : 'Error',
    message,
    type,
  };
}

export function successNotification(
  message: string
): ElectricChattyNotification {
  return generateNotification(ElectricChattyNotificationType.Success, message);
}

export function errorNotification(message: string): ElectricChattyNotification {
  return generateNotification(ElectricChattyNotificationType.Error, message);
}
