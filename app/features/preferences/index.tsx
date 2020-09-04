import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '../../components/Toolbar';
import styles from './index.css';
import CommentFilterPreferencesEditor from './components/CommentFilterPreferencesEditor';
import {
  getPreferences,
  updatePreferences,
  savePreferences,
} from './preferencesSlice';
import { AppDispatch } from '../../config/store';
import CommentFilterPreference from '../../types/CommentFilterPreference';
import replaceFilter from '../../utils/preferencesUtils';
import EmbedPreferencesEditor from './components/EmbedPreferencesEditor';
import EmbedPreferences from '../../types/EmbedPreferences';

export default function PreferencesScreen() {
  const preferences = useSelector(getPreferences);
  const dispatch: AppDispatch = useDispatch();

  function handleCommentFilterPreferences(
    updatedFilter: CommentFilterPreference
  ) {
    dispatch(updatePreferences(replaceFilter(preferences, updatedFilter)));
    dispatch(savePreferences());
  }

  function handleEmbedPreferences(newPreferences: EmbedPreferences) {
    dispatch(
      updatePreferences({ ...preferences, embedPreferences: newPreferences })
    );
    dispatch(savePreferences());
  }

  return (
    <div>
      <Toolbar className={styles.toolbar} title="Preferences" />
      <CommentFilterPreferencesEditor
        className={styles.preferenceContainer}
        options={preferences?.commentFilters}
        onChange={(preference) => handleCommentFilterPreferences(preference)}
      />
      <EmbedPreferencesEditor
        className={styles.preferenceContainer}
        preferences={preferences.embedPreferences}
        onChange={handleEmbedPreferences}
      />
    </div>
  );
}
