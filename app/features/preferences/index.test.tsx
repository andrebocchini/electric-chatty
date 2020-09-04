import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import Store from 'electron-store';
import { mockState, mockStore } from '../../utils/testUtils';
import PreferencesScreen from '.';

jest.mock('electron-store');

Store as jest.Mocked<typeof Store>;

configure({ adapter: new Adapter() });

// Router
const history = createHashHistory();

describe('PreferencesScreen tests', () => {
  it('should render a toolbar', () => {
    const store = mockStore(mockState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PreferencesScreen />
        </ConnectedRouter>
      </Provider>
    );
    const toolbar = wrapper.find('Toolbar');
    expect(toolbar).toHaveLength(1);
    expect(toolbar.prop('buttons')).toBeUndefined();
    expect(toolbar.prop('title')).toEqual('Preferences');
  });

  it('should render comment filter preferences', () => {
    const store = mockStore({
      ...mockState,
      preferences: {
        ...mockState.preferences,
        preferences: {
          ...mockState.preferences.preferences,
          commentFilters: [{ category: 'stupid', checked: false }],
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PreferencesScreen />
        </ConnectedRouter>
      </Provider>
    );
    const preferences = wrapper.find('CommentFilterPreferencesEditor');
    expect(preferences).toHaveLength(1);
    expect(preferences.prop('options')).toEqual([
      { category: 'stupid', checked: false },
    ]);
    expect(preferences.prop('onChange')).toBeDefined();
  });

  it('should render an embed preferences filter editor', () => {
    const store = mockStore(mockState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PreferencesScreen />
        </ConnectedRouter>
      </Provider>
    );
    const preferences = wrapper.find('EmbedPreferencesEditor');
    expect(preferences).toHaveLength(1);
    expect(preferences.hasClass('preferenceContainer')).toBeTruthy();
    expect(preferences.prop('onChange')).toBeDefined();
  });
});
