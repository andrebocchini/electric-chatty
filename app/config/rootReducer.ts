/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import chattyReducer from '../features/chatty/chattySlice';
import preferencesReducer from '../features/preferences/preferencesSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import navigationReducer from '../features/navigation/navigationSlice';
import appReducer from '../features/app/appSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    chatty: chattyReducer,
    preferences: preferencesReducer,
    notifications: notificationsReducer,
    navigation: navigationReducer,
    app: appReducer,
  });
}
