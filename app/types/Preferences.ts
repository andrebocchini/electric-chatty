import CommentFilterPreference from './CommentFilterPreference';
import EmbedPreferences from './EmbedPreferences';

export default interface Preferences {
  commentFilters: CommentFilterPreference[];
  pinnedThreads: number[];
  embedPreferences?: EmbedPreferences;
}
