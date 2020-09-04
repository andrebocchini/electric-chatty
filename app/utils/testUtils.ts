import configureStore from 'redux-mock-store';
import { RouterState } from 'connected-react-router';
import thunk from 'redux-thunk';
import { RootState, AppDispatch } from '../config/store';
import PreferencesState from '../types/PreferencesState';
import ChattyState from '../types/ChattyState';
import NotificationsState from '../types/NotificationsState';
import NavigationState from '../types/NavigationState';
import AppState from '../types/AppState';

const middlewares = [thunk];

export const mockStore = configureStore<RootState, AppDispatch>(middlewares);

const mockPreferencesState: PreferencesState = {
  credentials: undefined,
  fetchCredentialsError: undefined,
  fetchPreferencesError: undefined,
  isEditingCredentials: false,
  isFetchingCredentials: false,
  isFetchingPreferences: false,
  isLoggingOut: false,
  isMarkingPost: false,
  isSavingCredentials: false,
  isSavingPreferences: false,
  markPostError: undefined,
  preferences: { commentFilters: [], pinnedThreads: [] },
  saveCredentialsError: undefined,
  savePreferencesError: undefined,
};

const mockChattyState: ChattyState = {
  fetchEventsError: undefined,
  fetchThreadsError: undefined,
  filter: undefined,
  isComposingCommentReply: false,
  isComposingRootPost: false,
  isComposingRootReply: false,
  isFetchingEvents: false,
  isFetchingSelectedThread: false,
  isFetchingSingleThread: false,
  isFetchingThreads: false,
  isPostingRootPost: false,
  isPostingRootReply: false,
  isPostingCommentReply: false,
  isTaggingPost: false,
  isUpdatedSinceLastSort: false,
  commentReplyError: undefined,
  numberOfNewThreadsSinceLastSort: 0,
  mode: 'CHATTY',
  pinnedThreads: [],
  rootPostError: undefined,
  rootReplyError: undefined,
  selectedThread: undefined,
  selectedPost: undefined,
  singleThreadNavigationStack: [],
  taggingPostError: undefined,
  threads: [],
};

const mockRouterState: RouterState = {
  location: {
    pathname: '/',
    search: '',
    state: '',
    hash: '',
    key: undefined,
  },
  action: 'POP',
};

const mockNotificationsState: NotificationsState = {
  notifications: {},
};

const mockNavigationState: NavigationState = {
  allowBackNavigation: false,
};

const mockAppState: AppState = {
  isStartingUp: false,
};

export const mockState = {
  router: mockRouterState,
  chatty: mockChattyState,
  preferences: mockPreferencesState,
  notifications: mockNotificationsState,
  navigation: mockNavigationState,
  app: mockAppState,
};
