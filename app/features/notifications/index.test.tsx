import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import ElectricChattyNotification from '../../types/ElectricChattyNotification';
import NotificationCenter from '.';
import ElectricChattyNotificationType from '../../types/ElectricChattyNotificationType';
import { mockState, mockStore } from '../../utils/testUtils';

configure({ adapter: new Adapter() });

// Router
const history = createHashHistory();

describe('NotificationCenter tests', () => {
  it('should render a notification center', () => {
    const store = mockStore({
      ...mockState,
      notifications: {
        ...mockState.notifications,
        notifications: {},
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NotificationCenter />
        </ConnectedRouter>
      </Provider>
    );
    expect(wrapper.find('NotificationCenter')).toHaveLength(1);
  });

  it('should render a notification pulled from state', () => {
    const notification: ElectricChattyNotification = {
      id: 'uuid',
      title: 'title',
      message: 'message',
      type: ElectricChattyNotificationType.Success,
    };
    const notifications = { [notification.id]: notification };
    const store = mockStore({
      ...mockState,
      notifications: {
        ...mockState.notifications,
        notifications,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <NotificationCenter />
        </ConnectedRouter>
      </Provider>
    );
    expect(wrapper.find('NotificationToast')).toHaveLength(1);
  });
});
