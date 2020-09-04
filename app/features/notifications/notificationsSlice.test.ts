import ElectricChattyNotification from '../../types/ElectricChattyNotification';
import reducer, {
  postNotification,
  dismissNotification,
  getNotifications,
} from './notificationsSlice';
import ElectricChattyNotificationType from '../../types/ElectricChattyNotificationType';
import { mockState, mockStore } from '../../utils/testUtils';
import * as notificationsUtils from '../../utils/notificationsUtils';

jest.mock('../../utils/notificationsUtils');

const mockNotificationsUtils = notificationsUtils as jest.Mocked<
  typeof notificationsUtils
>;

describe('Notifications synchronous actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle postNotification', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    expect(postNotification(notification)).toEqual({
      payload: notification,
      type: postNotification.type,
    });

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    expect(reducer(state, postNotification(notification))).toEqual({
      ...state.notifications,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle dismissNotification', () => {
    expect(dismissNotification('uuid')).toEqual({
      payload: 'uuid',
      type: dismissNotification.type,
    });

    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    const state = {
      ...mockState.notifications,
      notifications: { [notification.id]: notification },
    };

    expect(reducer(state, dismissNotification('uuid'))).toEqual({
      ...state,
      notifications: {},
    });
  });

  it('should handle preferences/logoutSuccess', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    mockNotificationsUtils.successNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'preferences/logoutSuccess',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle preferences/saveCredentialsSuccess', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    mockNotificationsUtils.successNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'preferences/saveCredentialsSuccess',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle chatty/postRootReplySuccess', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    mockNotificationsUtils.successNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'chatty/postRootReplySuccess',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle chatty/postRootPostSuccess', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    mockNotificationsUtils.successNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'chatty/postRootPostSuccess',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle chatty/tagPostSuccess', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };

    mockNotificationsUtils.successNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'chatty/tagPostSuccess',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle actions that end in failure', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Error,
    };

    mockNotificationsUtils.errorNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'thisIsSomeKindOfFailure',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should handle chatty/tagPostFailure', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Error,
    };

    mockNotificationsUtils.errorNotification.mockReturnValue(notification);

    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'chatty/tagPostFailure',
      payload: notification,
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: { [notification.id]: notification },
    });
  });

  it('should not dispatch a notification for actions ending in replyfailure', () => {
    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'thisIsPostRootReplyFailure',
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: {},
    });
  });

  it('should not dispatch a notification for actions ending in rootpostfailure', () => {
    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'thisIsPostRootPostFailure',
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: {},
    });
  });

  it('should not dispatch a notification for actions ending in fetchcredentialsfailure', () => {
    const state = {
      ...mockState.notifications,
      notifications: {},
    };

    const action = {
      type: 'thisIsFetchCredentialsFailure',
    };

    expect(reducer(state, action)).toEqual({
      ...state,
      notifications: {},
    });
  });
});

describe('Notifications selectors', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return all notifications', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };
    const notifications = { [notification.id]: notification };
    const store = mockStore({
      ...mockState,
      notifications: {
        ...mockState.notifications,
        notifications,
      },
    });
    expect(getNotifications(store.getState())).toEqual(notifications);
  });
});
