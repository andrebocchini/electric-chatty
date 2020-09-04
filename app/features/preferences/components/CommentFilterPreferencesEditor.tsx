import React from 'react';
import classnames from 'classnames';
import PreferenceContainer from './PreferenceContainer';
import styles from './CommentFilterPreferencesEditor.css';
import CommentFilterPreference from '../../../types/CommentFilterPreference';

type Props = {
  className?: string;
  id?: string;
  onChange?: (preference: CommentFilterPreference) => void;
  options?: CommentFilterPreference[];
};

export default function CommentFilterPreferencesEditor(props: Props) {
  const { className, id, onChange, options } = props;

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange({
        category: event.currentTarget.name,
        checked: event.currentTarget.checked,
      });
    }
  }

  return (
    <PreferenceContainer
      className={classnames(styles.container, className)}
      description="Check the thread categories you wish to see. Categories not checked here will not show in your list of threads."
      id={id}
      title="Thread Options"
    >
      {options &&
        options.map((option, index) => {
          const { category, checked } = option;
          return (
            <div
              className={styles.option}
              // eslint-disable-next-line react/no-array-index-key
              key={`comment_category_${category}_${index}`}
            >
              <input
                type="checkbox"
                id={category}
                name={category}
                checked={checked}
                onChange={(e) => handleOnChange(e)}
              />
              <label className={styles.label} htmlFor={category}>
                {category}
              </label>
            </div>
          );
        })}
    </PreferenceContainer>
  );
}
