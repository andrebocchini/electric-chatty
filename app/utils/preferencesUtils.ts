import Preferences from '../types/Preferences';
import CommentFilterPreference from '../types/CommentFilterPreference';

export default function replaceFilter(
  preferences: Preferences,
  updatedFilter: CommentFilterPreference
) {
  const updatedFilters = preferences.commentFilters.filter(
    (filter) => filter.category !== updatedFilter.category
  );
  updatedFilters.push(updatedFilter);

  return {
    ...preferences,
    commentFilters: updatedFilters
      .slice()
      .sort((a, b) => a.category.localeCompare(b.category)),
  };
}
