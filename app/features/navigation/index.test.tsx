import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Store from 'electron-store';
import NavigationContainer from '.';
import { mockState, mockStore } from '../../utils/testUtils';

jest.mock('electron-store');

Store as jest.Mocked<typeof Store>;

configure({ adapter: new Adapter() });

// Router
const history = createHashHistory();

describe('NavigationContainer tests', () => {
  it('renders the correct number of bottom items', () => {
    const store = mockStore(mockState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NavigationContainer />
        </ConnectedRouter>
      </Provider>
    );
    expect(wrapper.find('.bottomItems').children()).toHaveLength(4);
  });

  it('renders the correct number of top items', () => {
    const store = mockStore(mockState);
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NavigationContainer />
        </ConnectedRouter>
      </Provider>
    );
    expect(wrapper.find('.topItems').children()).toHaveLength(0);
  });

  it('renders the back button', () => {
    const store = mockStore({
      ...mockState,
      navigation: {
        allowBackNavigation: true,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NavigationContainer />
        </ConnectedRouter>
      </Provider>
    );
    expect(wrapper.find('.topItems').children()).toHaveLength(1);
    const backButton = wrapper.find('.topItems').childAt(0);
    expect(backButton.prop('icon')).toEqual(faArrowCircleLeft);
  });
});
