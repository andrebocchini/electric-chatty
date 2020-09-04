import Credentials from './Credentials';
import Preferences from './Preferences';

export default interface PreferencesState {
  credentials?: Credentials;
  fetchCredentialsError?: string;
  fetchPreferencesError?: string;
  isEditingCredentials: boolean;
  isFetchingCredentials: boolean;
  isFetchingPreferences: boolean;
  isLoggingOut: boolean;
  isMarkingPost: boolean;
  isSavingCredentials: boolean;
  isSavingPreferences: boolean;
  logoutError?: string;
  markPostError?: string;
  preferences: Preferences;
  saveCredentialsError?: string;
  savePreferencesError?: string;
}
