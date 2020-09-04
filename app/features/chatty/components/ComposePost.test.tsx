import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComposePost from './ComposePost';

configure({ adapter: new Adapter() });

describe('ComposePost tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<ComposePost className="class" />);
    expect(wrapper.find('div.class.container')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<ComposePost id="id" />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders an alert when not logged in', () => {
    const wrapper = shallow(<ComposePost isLoggedIn={false} />);
    const alert = wrapper.find('.notLoggedInAlert');
    expect(alert).toHaveLength(1);
    expect(alert.text()).toEqual('You must be logged in to post');
    expect(alert.prop('variant')).toEqual('warning');
  });

  it('does not render an alert when logged in', () => {
    const wrapper = shallow(<ComposePost isLoggedIn />);
    expect(wrapper.find('.notLoggedInAlert')).toHaveLength(0);
  });

  it('renders a footer', () => {
    const wrapper = shallow(<ComposePost />);
    const footer = wrapper.find('.footer');
    expect(footer).toHaveLength(1);
    expect(footer.children()).toHaveLength(2);
    expect(footer.children().find('ComposePostLegend')).toHaveLength(1);
    expect(footer.children().find('.buttonRow')).toHaveLength(1);
  });

  it('passed a callback to the tag legend dropdow', () => {
    const wrapper = shallow(<ComposePost />);
    const legend = wrapper.find('ComposePostLegend');
    expect(legend.prop('onSelect')).toBeDefined();
  });

  it('renders a button row with two buttons', () => {
    const wrapper = shallow(<ComposePost />);
    expect(wrapper.find('.buttonRow').children().find('.button')).toHaveLength(
      2
    );
  });

  it('renders a enabled post button when not logged in', () => {
    const wrapper = shallow(<ComposePost isLoggedIn />);
    const button = wrapper.find('#postButton');
    expect(button.prop('disabled')).toBeFalsy();
    expect(button.text()).toBe('Post');
  });

  it('renders a disabled post button when not logged in', () => {
    const wrapper = shallow(<ComposePost isLoggedIn={false} />);
    const button = wrapper.find('#postButton');
    expect(button.prop('disabled')).toBeTruthy();
    expect(button.text()).toBe('Post');
  });

  it('renders a Spinner inside the post button when posting', () => {
    const wrapper = shallow(<ComposePost isLoggedIn isPosting />);
    const button = wrapper.find('#postButton');
    expect(button.text()).toBe('');
    expect(wrapper.find('#postButton').children().find('Spinner')).toHaveLength(
      1
    );
  });

  it('does not render a Spinner inside the post button when not posting', () => {
    const wrapper = shallow(<ComposePost isLoggedIn isPosting={false} />);
    const button = wrapper.find('#postButton');
    expect(button.text()).toBe('Post');
    expect(wrapper.find('#postButton').children().find('Spinner')).toHaveLength(
      0
    );
  });

  it('renders a cancel button', () => {
    const wrapper = shallow(<ComposePost isLoggedIn />);
    expect(wrapper.find('#cancelButton').text()).toEqual('Cancel');
  });

  it('renders a dismissible alert when there is a posting error', () => {
    const error = 'Error alert';
    const wrapper = shallow(<ComposePost isLoggedIn error={error} />);
    const alert = wrapper.find('.errorAlert');
    expect(alert.text()).toEqual(error);
    expect(alert.prop('variant')).toEqual('danger');
    expect(alert.prop('dismissible')).toBeTruthy();
  });

  it('renders a text area with the default number of rows when logged in', () => {
    const wrapper = shallow(<ComposePost isLoggedIn />);
    expect(wrapper.find('.composeBox').prop('rows')).toEqual(5);
  });

  it('renders a text area with the number of rows passed in', () => {
    const rows = 10;
    const wrapper = shallow(<ComposePost isLoggedIn rows={rows} />);
    expect(wrapper.find('.composeBox').prop('rows')).toEqual(rows);
  });

  it('executes the cancel button callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ComposePost isLoggedIn onCancelButtonClicked={mockCallback} />
    );
    wrapper.find('#cancelButton').simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('executes the post button callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ComposePost isLoggedIn onPostButtonClicked={mockCallback} />
    );
    wrapper.find('#postButton').simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('executes the alert dismiss callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ComposePost
        isLoggedIn
        error="Error message"
        onDimissErrorButtonClicked={mockCallback}
      />
    );
    wrapper.find('.errorAlert').simulate('close');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
