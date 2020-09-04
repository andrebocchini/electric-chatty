import replaceFilter from './preferencesUtils';
import Preferences from '../types/Preferences';

describe('Preference utils tests', () => {
  it('should replace a comment filter option', () => {
    const originalPreferences: Preferences = {
      commentFilters: [
        { category: 'political', checked: true },
        { category: 'stupid', checked: false },
      ],
      pinnedThreads: [],
    };
    const expectedPreferences: Preferences = {
      commentFilters: [
        { category: 'political', checked: false },
        { category: 'stupid', checked: false },
      ],
      pinnedThreads: [],
    };
    const input = { category: 'political', checked: false };
    expect(replaceFilter(originalPreferences, input)).toEqual(
      expectedPreferences
    );
  });
});
