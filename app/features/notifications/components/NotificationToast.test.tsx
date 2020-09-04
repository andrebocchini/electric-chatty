import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import NotificationToast from './NotificationToast';
import styles from './AlertToast.css';
import ElectricChattyNotification from '../../../types/ElectricChattyNotification';
import ElectricChattyNotificationType from '../../../types/ElectricChattyNotificationType';

configure({ adapter: new Adapter() });

const successNotification: ElectricChattyNotification = {
  id: 'id',
  title: 'Title',
  message: 'Message',
  type: ElectricChattyNotificationType.Success,
};

const errorNotification: ElectricChattyNotification = {
  id: 'id',
  title: 'Title',
  message: 'Message',
  type: ElectricChattyNotificationType.Error,
};

describe('NotificationToast tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(
      <NotificationToast className="class" notification={successNotification} />
    );
    expect(wrapper.find('Toast.class')).toHaveLength(1);
  });

  it('applies id passed in', () => {
    const wrapper = shallow(
      <NotificationToast id="id" notification={successNotification} />
    );
    expect(wrapper.find('Toast#id')).toHaveLength(1);
  });

  it('uses the correct style', () => {
    const wrapper = shallow(
      <NotificationToast notification={successNotification} />
    );
    expect(wrapper.find(`Toast.${styles.toast}`)).toHaveLength(1);
  });

  it('shows by default', () => {
    const wrapper = shallow(
      <NotificationToast notification={successNotification} />
    );
    expect(wrapper.find('Toast').prop('show')).toBeTruthy();
  });

  it('uses the title passed in', () => {
    const wrapper = shallow(
      <NotificationToast notification={successNotification} />
    );
    expect(wrapper.find('.titleText').text()).toEqual('Title');
  });

  it('uses the message passed in', () => {
    const wrapper = shallow(
      <NotificationToast notification={successNotification} />
    );
    expect(wrapper.find('ToastBody').text()).toEqual('Message');
  });

  it('auto-hides in 5 seconds', () => {
    const wrapper = shallow(
      <NotificationToast notification={successNotification} />
    );
    const toast = wrapper.find('Toast');
    expect(toast.prop('autohide')).toBeTruthy();
    expect(toast.prop('delay')).toEqual(5000);
  });

  it('calls the callback passed in when dismissed', () => {
    const mockCallback = jest.fn();
    const wrapper = mount(
      <NotificationToast
        notification={successNotification}
        onClose={mockCallback}
      />
    );
    wrapper.find('button').simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('renders a correct success title', () => {
    const wrapper = shallow(
      <NotificationToast notification={successNotification} />
    );
    const icon = wrapper.find('.titleIcon');
    expect(icon).toHaveLength(1);
    expect(icon.prop('icon')).toEqual(faCheckCircle);
    expect(icon.hasClass('success')).toBeTruthy();
  });

  it('renders a correct error title', () => {
    const wrapper = shallow(
      <NotificationToast notification={errorNotification} />
    );
    const icon = wrapper.find('.titleIcon');
    expect(icon).toHaveLength(1);
    expect(icon.prop('icon')).toEqual(faExclamationCircle);
    expect(icon.hasClass('error')).toBeTruthy();
  });
});
