import Store from 'electron-store';
import Preferences from '../types/Preferences';

const store = new Store<Preferences>({
  defaults: {
    commentFilters: [
      {
        category: 'informative',
        checked: false,
      },
      {
        category: 'nws',
        checked: false,
      },
      {
        category: 'political',
        checked: false,
      },
      {
        category: 'stupid',
        checked: false,
      },
      {
        category: 'tangent',
        checked: false,
      },
    ],
    pinnedThreads: [],
  },
});

export function getPreferencesFromDisk() {
  return store.store;
}

export function savePreferencesToDisk(preferences: Preferences) {
  store.set(preferences);
}
