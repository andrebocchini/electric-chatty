import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState, AppDispatch } from '../../config/store';
import Credentials from '../../types/Credentials';
import {
  deleteCredentialsFromSecureStorage,
  fetchCredentialsFromSecureStorage,
  saveCredentialsToSecureStorage,
} from '../../utils/credentialsUtils';
import PreferencesState from '../../types/PreferencesState';
import * as chattyAPI from '../../api/chatty';
import Preferences from '../../types/Preferences';
import Thread from '../../types/Thread';
import * as preferencesAPI from '../../api/preferences';
import {
  getPreferencesFromDisk,
  savePreferencesToDisk,
} from '../../config/preferencesStore';

const initialState: PreferencesState = {
  credentials: undefined,
  saveCredentialsError: undefined,
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
  savePreferencesError: undefined,
};

export const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    editingCredentialsBegin: (state) => {
      state.isEditingCredentials = true;
    },
    editingCredentialsEnd: (state) => {
      state.isEditingCredentials = false;
      state.saveCredentialsError = undefined;
    },
    fetchCredentialsBegin: (state) => {
      state.isFetchingCredentials = true;
      state.fetchCredentialsError = undefined;
    },
    fetchCredentialsFailure: (state, action: PayloadAction<string>) => {
      state.isFetchingCredentials = false;
      state.fetchCredentialsError = action.payload;
      state.credentials = undefined;
    },
    fetchCredentialsSuccess: (state, action: PayloadAction<Credentials>) => {
      state.isFetchingCredentials = false;
      state.fetchCredentialsError = undefined;
      state.credentials = action.payload;
    },
    fetchPreferencesBegin: (state) => {
      state.isFetchingPreferences = true;
      state.fetchPreferencesError = undefined;
    },
    fetchPreferencesFailure(state, action: PayloadAction<string>) {
      state.isFetchingPreferences = false;
      state.fetchPreferencesError = action.payload;
    },
    fetchPreferencesSuccess(state, action: PayloadAction<Preferences>) {
      state.preferences = action.payload;
    },
    logoutBegin: (state) => {
      state.isLoggingOut = true;
      state.logoutError = undefined;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.isLoggingOut = false;
      state.logoutError = action.payload;
      state.isEditingCredentials = false;
    },
    logoutSuccess: (state) => {
      state.isLoggingOut = false;
      state.logoutError = undefined;
      state.isEditingCredentials = false;
      state.credentials = undefined;
    },
    pinThread: (state, action: PayloadAction<Thread>) => {
      const { threadId } = action.payload;
      const pinnedThreads = state.preferences.pinnedThreads.slice();
      if (!pinnedThreads.includes(threadId)) {
        pinnedThreads.push(threadId);
      }
      state.preferences.pinnedThreads = pinnedThreads;
    },
    unpinThread: (state, action: PayloadAction<Thread>) => {
      const { threadId } = action.payload;
      const pinnedThreads = state.preferences.pinnedThreads.slice();
      const index = pinnedThreads.indexOf(threadId);
      if (index >= 0) {
        pinnedThreads.splice(index, 1);
      }
      state.preferences.pinnedThreads = pinnedThreads;
    },
    saveCredentialsBegin: (state) => {
      state.isSavingCredentials = true;
      state.saveCredentialsError = undefined;
    },
    saveCredentialsFailure: (state, action: PayloadAction<string>) => {
      state.isSavingCredentials = false;
      state.saveCredentialsError = action.payload;
    },
    saveCredentialsSuccess: (state, action: PayloadAction<Credentials>) => {
      state.isSavingCredentials = false;
      state.saveCredentialsError = undefined;
      state.credentials = action.payload;
      state.isEditingCredentials = false;
    },
    savePreferencesBegin: (state) => {
      state.isSavingPreferences = true;
      state.savePreferencesError = undefined;
    },
    savePreferencesFailure: (state, action: PayloadAction<string>) => {
      state.isSavingPreferences = false;
      state.savePreferencesError = action.payload;
    },
    savePreferencesSuccess: (state) => {
      state.isSavingPreferences = false;
      state.savePreferencesError = undefined;
    },
    markPostBegin: (state) => {
      state.isMarkingPost = true;
      state.markPostError = undefined;
    },
    markPostFailure: (state, action: PayloadAction<string>) => {
      state.isMarkingPost = false;
      state.markPostError = action.payload;
    },
    markPostSuccess: (state) => {
      state.isMarkingPost = false;
      state.markPostError = undefined;
    },
    updatePreferences: (state, action: PayloadAction<Preferences>) => {
      state.preferences = action.payload;
    },
  },
  extraReducers: {
    'chatty/pinThread': (state, action: PayloadAction<Thread>) => {
      const { threadId } = action.payload;
      const pinnedThreads = state.preferences.pinnedThreads.slice();
      if (!pinnedThreads.includes(threadId)) {
        pinnedThreads.push(threadId);
      }
      state.preferences.pinnedThreads = pinnedThreads;
    },
    'chatty/unpinThread': (state, action: PayloadAction<Thread>) => {
      const { threadId } = action.payload;
      const pinnedThreads = state.preferences.pinnedThreads.slice();
      const index = pinnedThreads.indexOf(threadId);
      if (index >= 0) {
        pinnedThreads.splice(index, 1);
      }
      state.preferences.pinnedThreads = pinnedThreads;
    },
  },
});

export default preferencesSlice.reducer;

// Actions

export const {
  editingCredentialsBegin,
  editingCredentialsEnd,
  fetchCredentialsBegin,
  fetchCredentialsFailure,
  fetchCredentialsSuccess,
  fetchPreferencesBegin,
  fetchPreferencesFailure,
  fetchPreferencesSuccess,
  logoutBegin,
  logoutFailure,
  logoutSuccess,
  markPostBegin,
  markPostFailure,
  markPostSuccess,
  pinThread,
  unpinThread,
  saveCredentialsBegin,
  saveCredentialsSuccess,
  saveCredentialsFailure,
  savePreferencesBegin,
  savePreferencesFailure,
  savePreferencesSuccess,
  updatePreferences,
} = preferencesSlice.actions;

export const fetchPreferences = (): AppThunk<
  Promise<Preferences | undefined>
> => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(fetchPreferencesBegin());
    let preferences: Preferences = getPreferencesFromDisk();
    const username = getState().preferences.credentials?.username;
    try {
      if (username) {
        const commentFilters = await preferencesAPI.fetchCategoryFilters(
          username
        );
        const embedPreferences = await preferencesAPI.fetchClientData(username);
        const pinnedThreads = await preferencesAPI.fetchMarkedPosts(username);

        preferences = {
          commentFilters,
          embedPreferences,
          pinnedThreads,
        };
      }
      dispatch(fetchPreferencesSuccess(preferences));
      return preferences;
    } catch (error) {
      dispatch(fetchPreferencesFailure(error.message));
      return undefined;
    }
  };
};

export const savePreferences = (): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch, getState) => {
    dispatch(savePreferencesBegin());
    const { preferences } = getState().preferences;
    const username = getState().preferences.credentials?.username;
    try {
      savePreferencesToDisk(preferences);
      if (username) {
        const filters = getState().preferences.preferences.commentFilters;
        await preferencesAPI.setCategoryFilters(username, filters);

        const { embedPreferences } = getState().preferences.preferences;
        await preferencesAPI.setClientData(username, embedPreferences ?? {});
      }
      dispatch(savePreferencesSuccess());
    } catch (error) {
      dispatch(savePreferencesFailure(error.message));
    }
  };
};

export const fetchCredentials = (): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchCredentialsBegin());
      const credentials = await fetchCredentialsFromSecureStorage();
      if (credentials) {
        dispatch(fetchCredentialsSuccess(credentials));
      } else {
        dispatch(fetchCredentialsFailure(`Password not found`));
      }
    } catch (error) {
      dispatch(fetchCredentialsFailure('Failed to fetch credentials'));
    }
  };
};

export const saveCredentials = (
  credentials: Credentials
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(saveCredentialsBegin());
      await chattyAPI.verifyCredentials(credentials);
      await deleteCredentialsFromSecureStorage();
      await saveCredentialsToSecureStorage(credentials);
      dispatch(saveCredentialsSuccess(credentials));
      dispatch(fetchPreferences());
    } catch (error) {
      dispatch(saveCredentialsFailure('Failed to save credentials'));
    }
  };
};

export const logout = (): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(logoutBegin());
      await deleteCredentialsFromSecureStorage();
      dispatch(logoutSuccess());
    } catch (error) {
      dispatch(logoutFailure(error.message));
    }
  };
};

export const markPost = (
  username: string,
  postId: number,
  type: string
): AppThunk<Promise<void>> => {
  return async (dispatch: AppDispatch) => {
    dispatch(markPostBegin());
    try {
      await preferencesAPI.markPost(username, postId, type);
      dispatch(markPostSuccess());
    } catch (error) {
      dispatch(markPostFailure(error.message));
    }
  };
};

// Selectors

export const getCredentials = (state: RootState) =>
  state.preferences.credentials;
export const getFetchCredentialsError = (state: RootState) =>
  state.preferences.fetchCredentialsError;
export const getIsFetchingCredentials = (state: RootState) =>
  state.preferences.isFetchingCredentials;
export const getIsEditingCredentials = (state: RootState) =>
  state.preferences.isEditingCredentials;
export const getIsLoggingOut = (state: RootState) =>
  state.preferences.isLoggingOut;
export const getIsSavingCredentials = (state: RootState) =>
  state.preferences.isSavingCredentials;
export const getLogoutError = (state: RootState) =>
  state.preferences.logoutError;
export const getSaveCredentialsError = (state: RootState) =>
  state.preferences.saveCredentialsError;
export const getPreferences = (state: RootState) =>
  state.preferences.preferences;

export const getIsLoggedIn = createSelector([getCredentials], (credentials) => {
  return credentials !== null && credentials !== undefined;
});
