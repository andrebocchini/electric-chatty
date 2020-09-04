import React from 'react';
import classnames from 'classnames';
import styles from './EmbedPreferencesEditor.css';
import PreferenceContainer from './PreferenceContainer';
import EmbedPreferences from '../../../types/EmbedPreferences';

type Props = {
  className?: string;
  onChange?: (preferences: EmbedPreferences) => void;
  preferences?: EmbedPreferences;
};

export default function EmbedPreferencesEditor(props: Props) {
  const { className, onChange, preferences } = props;

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      const target = event.currentTarget.name;
      const value = event.currentTarget.checked;

      onChange({
        ...preferences,
        [target]: value,
      });
    }
  }

  return (
    <PreferenceContainer
      className={classnames(styles.container, className)}
      description="Choose what kind of content you would like automatically embedded in posts you are viewing."
      title="Embed Options"
    >
      <label className={styles.label} id="imagesLabel" htmlFor="imagesCheckbox">
        <input
          type="checkbox"
          id="imagesCheckbox"
          name="images"
          checked={preferences?.images}
          onChange={(e) => handleOnChange(e)}
        />
        <span className={styles.label}>images</span>
      </label>
      <label
        className={styles.label}
        id="youtubeLabel"
        htmlFor="youtubeCheckbox"
      >
        <input
          type="checkbox"
          id="youtubeCheckbox"
          name="youtube"
          checked={preferences?.youtube}
          onChange={(e) => handleOnChange(e)}
        />
        <span className={styles.label}>youtube</span>
      </label>
      <label className={styles.label} id="videoLabel" htmlFor="videoCheckbox">
        <input
          type="checkbox"
          id="videoCheckbox"
          name="video"
          checked={preferences?.video}
          onChange={(e) => handleOnChange(e)}
        />
        <span className={styles.label}>video (mp4, webm)</span>
      </label>
      <label
        className={styles.label}
        id="twitterLabel"
        htmlFor="twitterCheckbox"
      >
        <input
          type="checkbox"
          id="twitterCheckbox"
          name="twitter"
          checked={preferences?.twitter}
          onChange={(e) => handleOnChange(e)}
        />
        <span className={styles.label}>twitter</span>
      </label>
    </PreferenceContainer>
  );
}
