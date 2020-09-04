import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ElectricChattyNotification from '../../types/ElectricChattyNotification';
import NotificationsState from '../../types/NotificationsState';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../config/store';
import {
  successNotification,
  errorNotification,
} from '../../utils/notificationsUtils';

const initialState: NotificationsState = {
  notifications: {},
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    postNotification: (
      state,
      action: PayloadAction<ElectricChattyNotification>
    ) => {
      const notification = action.payload;
      state.notifications[notification.id] = notification;
    },
    dismissNotification: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.notifications[id];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase('preferences/logoutSuccess', (state) => {
        const notification = successNotification('Logout successful');
        state.notifications[notification.id] = notification;
      })
      .addCase('preferences/saveCredentialsSuccess', (state) => {
        const notification = successNotification('Credentials saved');
        state.notifications[notification.id] = notification;
      })
      .addMatcher(
        (action): action is PayloadAction<string> =>
          [
            'chatty/postRootReplySuccess',
            'chatty/postRootPostSuccess',
          ].includes(action.type),
        (state) => {
          const notification = successNotification('Post successful');
          state.notifications[notification.id] = notification;
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> =>
          ['chatty/tagPostSuccess'].includes(action.type),
        (state) => {
          const notification = successNotification(
            'Successfully tagged post. It might take up to a minute for your new tag to show.'
          );
          state.notifications[notification.id] = notification;
        }
      )
      .addMatcher(
        (action): action is PayloadAction<string> =>
          action.type.toLowerCase().endsWith('failure') &&
          !action.type.toLowerCase().endsWith('replyfailure') &&
          !action.type.toLowerCase().endsWith('rootpostfailure') &&
          !action.type.toLowerCase().endsWith('fetchcredentialsfailure'),
        (state, action) => {
          const notification = errorNotification(action.payload);
          state.notifications[notification.id] = notification;
        }
      );
  },
});

export default notificationsSlice.reducer;

// Actions

export const {
  postNotification,
  dismissNotification,
} = notificationsSlice.actions;

// Selectors

export const getNotifications = (state: RootState) =>
  state.notifications.notifications;
