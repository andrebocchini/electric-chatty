import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CredentialsEditor from './CredentialsEditor';

configure({ adapter: new Adapter() });

describe('CredentialsEditor tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<CredentialsEditor className="class" />);
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<CredentialsEditor id="id" />);
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('renders a username label', () => {
    const wrapper = shallow(<CredentialsEditor />);
    expect(wrapper.find('#usernameLabel').text()).toEqual('Username');
  });

  it('renders a password label', () => {
    const wrapper = shallow(<CredentialsEditor />);
    expect(wrapper.find('#passwordLabel').text()).toEqual('Password');
  });

  it('renders a username input', () => {
    const wrapper = shallow(<CredentialsEditor />);
    expect(wrapper.find('#usernameInput')).toHaveLength(1);
  });

  it('renders a password input', () => {
    const wrapper = shallow(<CredentialsEditor />);
    expect(wrapper.find('#passwordInput')).toHaveLength(1);
  });

  it('renders a logout button', () => {
    const wrapper = shallow(<CredentialsEditor />);
    const button = wrapper.find('#logoutButton');
    expect(button.text()).toEqual('Logout');
    expect(button.prop('variant')).toEqual('danger');
  });

  it('executes the logout callback when clicking on the logout button', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<CredentialsEditor onLogout={mockCallback} />);
    const button = wrapper.find('#logoutButton');
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('renders a spinner in the logout button when logging out', () => {
    const wrapper = shallow(<CredentialsEditor isLoggingOut />);
    const button = wrapper.find('#logoutButton');
    expect(button.find('Spinner')).toHaveLength(1);
  });

  it('renders a save button', () => {
    const wrapper = shallow(<CredentialsEditor />);
    expect(wrapper.find('#saveButton').text()).toEqual('Save');
  });

  it('executes the save callback when clicking on the save button', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <CredentialsEditor onSaveCredentials={mockCallback} />
    );
    const button = wrapper.find('#saveButton');
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('renders a spinner in the save button when saving', () => {
    const wrapper = shallow(<CredentialsEditor isSavingCredentials />);
    const button = wrapper.find('#saveButton');
    expect(button.find('Spinner')).toHaveLength(1);
  });

  it('renders an alert if there is an error', () => {
    const wrapper = shallow(<CredentialsEditor error="Error" />);
    const alert = wrapper.find('Alert');
    expect(alert).toHaveLength(1);
    expect(alert.text()).toEqual('Error');
    expect(alert.prop('variant')).toEqual('danger');
  });

  it('does not render an alert if there is no error', () => {
    const wrapper = shallow(<CredentialsEditor />);
    expect(wrapper.find('Alert')).toHaveLength(0);
  });

  it('executes the cancel callback when clicking on the cancel button', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(<CredentialsEditor onCancel={mockCallback} />);
    const button = wrapper.find('#cancelButton');
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
