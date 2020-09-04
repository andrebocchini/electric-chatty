import Store from 'electron-store';
import * as chattyAPI from '../../api/chatty';
import * as preferencesAPI from '../../api/preferences';
import reducer, {
  editingCredentialsBegin,
  editingCredentialsEnd,
  fetchCredentials,
  fetchCredentialsBegin,
  fetchCredentialsFailure,
  fetchCredentialsSuccess,
  fetchPreferences,
  fetchPreferencesSuccess,
  getCredentials,
  getIsLoggedIn,
  getIsLoggingOut,
  getIsEditingCredentials,
  getIsSavingCredentials,
  getSaveCredentialsError,
  getIsFetchingCredentials,
  getPreferences,
  logout,
  logoutBegin,
  logoutFailure,
  logoutSuccess,
  saveCredentials,
  saveCredentialsBegin,
  saveCredentialsFailure,
  saveCredentialsSuccess,
  updatePreferences,
  getLogoutError,
  fetchPreferencesBegin,
  fetchPreferencesFailure,
  savePreferencesBegin,
  savePreferencesFailure,
  savePreferencesSuccess,
  savePreferences,
  markPost,
  markPostBegin,
  markPostSuccess,
  markPostFailure,
  getFetchCredentialsError,
} from './preferencesSlice';
import * as credentials from '../../utils/credentialsUtils';
import Preferences from '../../types/Preferences';
import { mockState, mockStore } from '../../utils/testUtils';
import Thread from '../../types/Thread';
import GenericSuccessResponse from '../../types/GenericSuccessResponse';
import PreferencesState from '../../types/PreferencesState';

jest.mock('electron-store');
jest.mock('../../utils/credentialsUtils');
jest.mock('../../api/chatty');
jest.mock('../../api/preferences');

Store as jest.Mocked<typeof Store>;
const mockCredentials = credentials as jest.Mocked<typeof credentials>;
const mockChattyAPI = chattyAPI as jest.Mocked<typeof chattyAPI>;
const mockPreferencesAPI = preferencesAPI as jest.Mocked<typeof preferencesAPI>;

describe('Preferences synchronous actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should handle editingCredentialsBegin', () => {
    expect(editingCredentialsBegin()).toEqual({
      payload: undefined,
      type: editingCredentialsBegin.type,
    });

    const state = {
      ...mockState.preferences,
      isEditingCredentials: false,
    };
    expect(reducer(state, editingCredentialsBegin())).toEqual({
      ...state,
      isEditingCredentials: true,
    });
  });

  it('should handle editingCredentialsEnd', () => {
    expect(editingCredentialsEnd()).toEqual({
      payload: undefined,
      type: editingCredentialsEnd.type,
    });

    const state = {
      ...mockState.preferences,
      isEditingCredentials: true,
    };
    expect(reducer(state, editingCredentialsEnd())).toEqual({
      ...state,
      isEditingCredentials: false,
    });
  });

  it('should handle fetchCredentialsBegin', () => {
    expect(fetchCredentialsBegin()).toEqual({
      payload: undefined,
      type: fetchCredentialsBegin.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isFetchingCredentials: false,
      fetchCredentialsError: 'error',
    };
    expect(reducer(state, fetchCredentialsBegin())).toEqual({
      ...state,
      isFetchingCredentials: true,
      fetchCredentialsError: undefined,
    });
  });

  it('should handle fetchCredentialsFailure', () => {
    const payload = 'Error message';

    expect(fetchCredentialsFailure(payload)).toEqual({
      payload,
      type: fetchCredentialsFailure.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isFetchingCredentials: true,
      fetchCredentialsError: undefined,
    };
    expect(reducer(state, fetchCredentialsFailure(payload))).toEqual({
      ...state,
      isFetchingCredentials: false,
      fetchCredentialsError: payload,
    });
  });

  it('should handle fetchCredentialsSuccess', () => {
    const payload = {
      username: 'username',
      password: 'password',
    };

    expect(fetchCredentialsSuccess(payload)).toEqual({
      payload,
      type: fetchCredentialsSuccess.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isFetchingCredentials: true,
      fetchCredentialsError: 'error',
      credentials: undefined,
    };
    expect(reducer(state, fetchCredentialsSuccess(payload))).toEqual({
      ...state,
      isFetchingCredentials: false,
      fetchCredentialsError: undefined,
      credentials: payload,
    });
  });

  it('should handle fetchPreferencesBegin', () => {
    expect(fetchPreferencesBegin()).toEqual({
      type: fetchPreferencesBegin.type,
      payload: undefined,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isFetchingPreferences: false,
      fetchPreferencesError: 'error',
    };
    expect(reducer(state, fetchPreferencesBegin())).toEqual({
      ...state,
      isFetchingPreferences: true,
      fetchPreferencesError: undefined,
    });
  });

  it('should handle fetchPreferencesFailure', () => {
    expect(fetchPreferencesFailure('error')).toEqual({
      type: fetchPreferencesFailure.type,
      payload: 'error',
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isFetchingPreferences: true,
      fetchPreferencesError: undefined,
    };
    expect(reducer(state, fetchPreferencesFailure('error'))).toEqual({
      ...state,
      isFetchingPreferences: false,
      fetchPreferencesError: 'error',
    });
  });

  it('should handle fetchPreferencesSuccess', () => {
    const payload: Preferences = {
      commentFilters: [],
      embedPreferences: {},
      pinnedThreads: [],
    };

    expect(fetchPreferencesSuccess(payload)).toEqual({
      payload,
      type: fetchPreferencesSuccess.type,
    });

    const state = {
      ...mockState.preferences,
      preferences: {
        commentFilters: [],
        embedPreferences: {},
        pinnedThreads: [],
      },
    };
    expect(reducer(state, fetchPreferencesSuccess(payload))).toEqual({
      ...state,
      preferences: payload,
    });
  });

  it('should handle logoutBegin', () => {
    expect(logoutBegin()).toEqual({
      payload: undefined,
      type: logoutBegin.type,
    });

    const state = {
      ...mockState.preferences,
      isLoggingOut: false,
      logoutError: 'error',
    };
    expect(reducer(state, logoutBegin())).toEqual({
      ...state,
      isLoggingOut: true,
      logoutError: undefined,
    });
  });

  it('should handle logoutFailure', () => {
    expect(logoutFailure('error')).toEqual({
      payload: 'error',
      type: logoutFailure.type,
    });

    const state = {
      ...mockState.preferences,
      isLoggingOut: true,
      logoutError: undefined,
      isEditingCredentials: true,
    };
    expect(reducer(state, logoutFailure('error'))).toEqual({
      ...state,
      isLoggingOut: false,
      logoutError: 'error',
      isEditingCredentials: false,
    });
  });

  it('should handle logoutSuccess', () => {
    expect(logoutSuccess()).toEqual({
      payload: undefined,
      type: logoutSuccess.type,
    });

    const state = {
      ...mockState.preferences,
      isLoggingOut: true,
      logoutError: 'error',
    };
    expect(reducer(state, logoutSuccess())).toEqual({
      ...state,
      isLoggingOut: false,
      logoutError: undefined,
      isEditingCredentials: false,
      credentials: undefined,
    });
  });

  it('should handle saveCredentialsBegin', () => {
    expect(saveCredentialsBegin()).toEqual({
      undefined,
      type: saveCredentialsBegin.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isSavingCredentials: false,
      saveCredentialsError: 'error',
    };
    expect(reducer(state, saveCredentialsBegin())).toEqual({
      ...state,
      isSavingCredentials: true,
      saveCredentialsError: undefined,
    });
  });

  it('should handle saveCredentialsFailure', () => {
    const payload = 'Error';

    expect(saveCredentialsFailure(payload)).toEqual({
      payload,
      type: saveCredentialsFailure.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isSavingCredentials: true,
      saveCredentialsError: undefined,
    };
    expect(reducer(state, saveCredentialsFailure('error'))).toEqual({
      ...state,
      isSavingCredentials: false,
      saveCredentialsError: 'error',
    });
  });

  it('should handle saveCredentialsSuccess', () => {
    const payload = {
      username: 'username',
      password: 'password',
    };

    expect(saveCredentialsSuccess(payload)).toEqual({
      payload,
      type: saveCredentialsSuccess.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isSavingCredentials: false,
      saveCredentialsError: 'error',
      credentials: undefined,
      isEditingCredentials: true,
    };
    expect(
      reducer(
        state,
        saveCredentialsSuccess({ username: 'username', password: 'password' })
      )
    ).toEqual({
      ...state,
      isSavingCredentials: false,
      saveCredentialsError: undefined,
      credentials: { username: 'username', password: 'password' },
      isEditingCredentials: false,
    });
  });

  it('should handle updatePreferences', () => {
    const payload: Preferences = {
      commentFilters: [{ category: 'political', checked: false }],
      pinnedThreads: [],
    };

    expect(updatePreferences(payload)).toEqual({
      payload,
      type: updatePreferences.type,
    });
    const state = {
      ...mockState.preferences,
      preferences: payload,
    };
    expect(reducer(state, updatePreferences(payload))).toEqual({
      ...state,
      preferences: payload,
    });
  });

  it('should handle pinThread', () => {
    const thread: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: '2020-07-17T21:09:00Z',
        body:
          '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
        lols: [
          {
            tag: 'lol',
            count: 5,
          },
        ],
      },
      posts: [
        {
          id: 39791857,
          threadId: 39790577,
          parentId: 39790577,
          author: 'gmoney',
          category: 'ontopic',
          date: '2020-07-18T09:53:00Z',
          body: "It doesn't make any sense. Not funny.",
          lols: [],
        },
        {
          id: 39791122,
          threadId: 39790577,
          parentId: 39790577,
          author: 'OverloadUT',
          category: 'ontopic',
          date: '2020-07-18T00:19:00Z',
          body:
            'What’s the word for finding it funny but also horribly crushingly depressing?',
          lols: [],
        },
      ],
    };

    const action = {
      type: 'chatty/pinThread',
      payload: thread,
    };

    const state = {
      ...mockState.preferences,
      preferences: {
        username: 'username',
        commentFilters: [{ category: 'political', checked: false }],
        pinnedThreads: [],
      },
    };
    expect(reducer(state, action)).toEqual({
      ...state,
      preferences: {
        username: 'username',
        commentFilters: [{ category: 'political', checked: false }],
        pinnedThreads: [39790577],
      },
    });
  });

  it('should handle unpinThread', () => {
    const thread: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: '2020-07-17T21:09:00Z',
        body:
          '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
        lols: [
          {
            tag: 'lol',
            count: 5,
          },
        ],
      },
      posts: [
        {
          id: 39791857,
          threadId: 39790577,
          parentId: 39790577,
          author: 'gmoney',
          category: 'ontopic',
          date: '2020-07-18T09:53:00Z',
          body: "It doesn't make any sense. Not funny.",
          lols: [],
        },
        {
          id: 39791122,
          threadId: 39790577,
          parentId: 39790577,
          author: 'OverloadUT',
          category: 'ontopic',
          date: '2020-07-18T00:19:00Z',
          body:
            'What’s the word for finding it funny but also horribly crushingly depressing?',
          lols: [],
        },
      ],
    };
    const action = {
      type: 'chatty/unpinThread',
      payload: thread,
    };

    const state = {
      ...mockState.preferences,
      preferences: {
        commentFilters: [{ category: 'political', checked: false }],
        pinnedThreads: [39790579, 39790577],
      },
    };
    expect(reducer(state, action)).toEqual({
      ...state,
      preferences: {
        commentFilters: [{ category: 'political', checked: false }],
        pinnedThreads: [39790579],
      },
    });
  });

  it('should handle savePreferencesBegin', () => {
    expect(savePreferencesBegin()).toEqual({
      payload: undefined,
      type: savePreferencesBegin.type,
    });

    const state = {
      ...mockState.preferences,
      isSavingPreferences: false,
      savePreferencesError: 'error',
    };
    expect(reducer(state, savePreferencesBegin())).toEqual({
      ...state,
      isSavingPreferences: true,
      savePreferencesError: undefined,
    });
  });

  it('should handle savePreferencesFailure', () => {
    expect(savePreferencesFailure('error')).toEqual({
      payload: 'error',
      type: savePreferencesFailure.type,
    });

    const state = {
      ...mockState.preferences,
      isSavingPreferences: true,
      savePreferencesError: undefined,
    };
    expect(reducer(state, savePreferencesFailure('error'))).toEqual({
      ...state,
      isSavingPreferences: false,
      savePreferencesError: 'error',
    });
  });

  it('should handle savePreferencesSuccess', () => {
    expect(savePreferencesSuccess()).toEqual({
      payload: undefined,
      type: savePreferencesSuccess.type,
    });

    const state = {
      ...mockState.preferences,
      isSavingPreferences: true,
      savePreferencesError: 'error',
    };
    expect(reducer(state, savePreferencesSuccess())).toEqual({
      ...state,
      isSavingPreferences: false,
      savePreferencesError: undefined,
    });
  });

  it('should handle markPostBegin', () => {
    expect(markPostBegin()).toEqual({
      payload: undefined,
      type: markPostBegin.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isMarkingPost: false,
      markPostError: 'error',
    };
    expect(reducer(state, markPostBegin())).toEqual({
      ...state,
      isMarkingPost: true,
      markPostError: undefined,
    });
  });

  it('should handle markPostFailure', () => {
    expect(markPostFailure('error')).toEqual({
      payload: 'error',
      type: markPostFailure.type,
    });

    const state: PreferencesState = {
      ...mockState.preferences,
      isMarkingPost: true,
      markPostError: undefined,
    };
    expect(reducer(state, markPostFailure('error'))).toEqual({
      ...state,
      isMarkingPost: false,
      markPostError: 'error',
    });
  });

  it('should handle markPostSuccess', () => {
    expect(markPostSuccess()).toEqual({
      payload: undefined,
      type: markPostSuccess.type,
    });

    const state = {
      ...mockState.preferences,
      isMarkingPost: true,
      markPostError: 'error',
    };
    expect(reducer(state, markPostSuccess())).toEqual({
      ...state,
      isMarkingPost: false,
      markPostError: undefined,
    });
  });
});

describe('Preferences asynchronous actions', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch credentials successfully', async () => {
    const payload = {
      username: 'username',
      password: 'password',
    };
    const store = mockStore(mockState);

    mockCredentials.fetchCredentialsFromSecureStorage.mockResolvedValue(
      payload
    );

    await store.dispatch(fetchCredentials());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(fetchCredentialsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchCredentialsSuccess.type);
    expect(store.getActions()[1].payload).toEqual(payload);
  });

  it('should fail to fetch credentials due to an exception', async () => {
    const store = mockStore(mockState);

    mockCredentials.fetchCredentialsFromSecureStorage.mockRejectedValue(
      new Error('error')
    );

    await store.dispatch(fetchCredentials());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(fetchCredentialsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchCredentialsFailure.type);
    expect(store.getActions()[1].payload).toEqual(
      'Failed to fetch credentials'
    );
  });

  it('should fail to fetch credentials due to null credentials', async () => {
    const store = mockStore(mockState);

    mockCredentials.fetchCredentialsFromSecureStorage.mockResolvedValue(
      undefined
    );

    await store.dispatch(fetchCredentials());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(fetchCredentialsBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchCredentialsFailure.type);
    expect(store.getActions()[1].payload).toEqual(`Password not found`);
  });

  it('should fetch preferences successfully', async () => {
    const preferences: Preferences = {
      embedPreferences: {},
      commentFilters: [],
      pinnedThreads: [123456789],
    };
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: {
          username: 'username',
          password: 'password',
        },
        preferences,
      },
    });
    mockPreferencesAPI.fetchClientData.mockResolvedValue({});
    mockPreferencesAPI.fetchCategoryFilters.mockResolvedValue([]);
    mockPreferencesAPI.fetchMarkedPosts.mockResolvedValue([123456789]);

    const result = await store.dispatch(fetchPreferences());
    expect(result).toEqual(preferences);
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(fetchPreferencesBegin.type);
    expect(store.getActions()[1].type).toEqual(fetchPreferencesSuccess.type);
    expect(store.getActions()[1].payload).toEqual(preferences);
  });

  it('should save preferences successfully', async () => {
    const genericSuccessResponse: GenericSuccessResponse = {
      result: 'success',
    };
    const preferences: Preferences = {
      embedPreferences: {},
      commentFilters: [],
      pinnedThreads: [123456789],
    };
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: {
          username: 'username',
          password: 'password',
        },
        preferences,
      },
    });
    mockPreferencesAPI.setClientData.mockResolvedValue(genericSuccessResponse);
    mockPreferencesAPI.setCategoryFilters.mockResolvedValue(
      genericSuccessResponse
    );

    await store.dispatch(savePreferences());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(savePreferencesBegin.type);
    expect(store.getActions()[1].type).toEqual(savePreferencesSuccess.type);
  });

  it('should mark a post succesfully', async () => {
    const genericSuccessResponse: GenericSuccessResponse = {
      result: 'success',
    };
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: {
          username: 'username',
          password: 'password',
        },
      },
    });
    mockPreferencesAPI.markPost.mockResolvedValue(genericSuccessResponse);

    await store.dispatch(markPost('username', 123456789, 'pinned'));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(markPostBegin.type);
    expect(store.getActions()[1].type).toEqual(markPostSuccess.type);
  });

  it('should save credentials successfully', async () => {
    const payload = {
      username: 'username',
      password: 'password',
    };
    const store = mockStore(mockState);
    mockChattyAPI.verifyCredentials.mockResolvedValue({
      isModerator: true,
      isValid: true,
    });

    mockCredentials.deleteCredentialsFromSecureStorage.mockResolvedValue();
    mockCredentials.saveCredentialsToSecureStorage.mockResolvedValue(true);

    await store.dispatch(saveCredentials(payload));
    expect(store.getActions().length).toEqual(4);
    expect(store.getActions()[0].type).toEqual(saveCredentialsBegin.type);
    expect(store.getActions()[1].type).toEqual(saveCredentialsSuccess.type);
    expect(store.getActions()[1].payload).toEqual(payload);
    expect(store.getActions()[2].type).toEqual(fetchPreferencesBegin.type);
    expect(store.getActions()[3].type).toEqual(fetchPreferencesSuccess.type);
  });

  it('should fail to save credentials', async () => {
    const creds = {
      username: 'username',
      password: 'password',
    };
    const store = mockStore(mockState);

    mockCredentials.deleteCredentialsFromSecureStorage.mockResolvedValue();
    mockCredentials.saveCredentialsToSecureStorage.mockRejectedValue(
      new Error('error')
    );

    await store.dispatch(saveCredentials(creds));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(saveCredentialsBegin.type);
    expect(store.getActions()[1].type).toEqual(saveCredentialsFailure.type);
    expect(store.getActions()[1].payload).toEqual('Failed to save credentials');
  });

  it('should fail so save credentials because it is not able to delete existing credentials', async () => {
    const creds = {
      username: 'username',
      password: 'password',
    };
    const store = mockStore(mockState);

    mockCredentials.deleteCredentialsFromSecureStorage.mockRejectedValue(
      new Error('error')
    );

    await store.dispatch(saveCredentials(creds));
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(saveCredentialsBegin.type);
    expect(store.getActions()[1].type).toEqual(saveCredentialsFailure.type);
    expect(store.getActions()[1].payload).toEqual('Failed to save credentials');
  });

  it('should logout successfully', async () => {
    const store = mockStore(mockState);
    mockCredentials.deleteCredentialsFromSecureStorage.mockResolvedValue();

    await store.dispatch(logout());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(logoutBegin.type);
    expect(store.getActions()[1].type).toEqual(logoutSuccess.type);
  });

  it('should fail to logout successfully', async () => {
    const store = mockStore(mockState);
    mockCredentials.deleteCredentialsFromSecureStorage.mockRejectedValue(
      new Error('Failed to delete credentials from storage')
    );

    await store.dispatch(logout());
    expect(store.getActions().length).toEqual(2);
    expect(store.getActions()[0].type).toEqual(logoutBegin.type);
    expect(store.getActions()[1].type).toEqual(logoutFailure.type);
    expect(store.getActions()[1].payload).toEqual(
      'Failed to delete credentials from storage'
    );
  });
});

// Selectors

describe('Preferences selectors', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return editing credentials', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        isEditingCredentials: true,
      },
    });

    expect(getIsEditingCredentials(store.getState())).toBeTruthy();
  });

  it('should return credentials', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: { username: 'username', password: 'password' },
      },
    });

    expect(getCredentials(store.getState())).toEqual({
      username: 'username',
      password: 'password',
    });
  });

  it('should return fetch credentials error', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        fetchCredentialsError: 'error',
      },
    });

    expect(getFetchCredentialsError(store.getState())).toEqual('error');
  });

  it('should return credentials fetching from secure storage', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        isFetchingCredentials: true,
      },
    });

    expect(getIsFetchingCredentials(store.getState())).toBeTruthy();
  });

  it('should return credentials saving to secure storage', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        isSavingCredentials: true,
      },
    });

    expect(getIsSavingCredentials(store.getState())).toBeTruthy();
  });

  it('should return save credentials error', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        saveCredentialsError: 'error',
      },
    });

    expect(getSaveCredentialsError(store.getState())).toEqual('error');
  });

  it('should return all user preferences', () => {
    const preferences: Preferences = {
      commentFilters: [],
      pinnedThreads: [],
    };
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        preferences,
      },
    });

    expect(getPreferences(store.getState())).toEqual(preferences);
  });

  it('should return logged in', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: { username: 'username', password: 'password' },
      },
    });

    expect(getIsLoggedIn(store.getState())).toBeTruthy();
  });

  it('should return not logged in', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        credentials: undefined,
      },
    });

    expect(getIsLoggedIn(store.getState())).toBeFalsy();
  });

  it('should return is logging out ', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        isLoggingOut: true,
      },
    });

    expect(getIsLoggingOut(store.getState())).toBeTruthy();
  });

  it('should return is not logging out', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        isLoggingOut: false,
      },
    });

    expect(getIsLoggingOut(store.getState())).toBeFalsy();
  });

  it('should return logout error', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        logoutError: 'error',
      },
    });

    expect(getLogoutError(store.getState())).toEqual('error');
  });

  it('should return is saving credentials ', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        isSavingCredentials: true,
      },
    });

    expect(getIsSavingCredentials(store.getState())).toBeTruthy();
  });

  it('should return not saving credentials', () => {
    const store = mockStore(mockState);
    expect(getIsSavingCredentials(store.getState())).toBeFalsy();
  });
});
