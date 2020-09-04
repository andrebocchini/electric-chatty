import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComposeRootPost from './ComposeRootPost';

configure({ adapter: new Adapter() });

describe('ComposeRootPost tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<ComposeRootPost className="class" isLoggedIn />);
    expect(wrapper.find('.chatty-modal.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<ComposeRootPost id="id" isLoggedIn />);
    expect(wrapper.find('#id.chatty-modal')).toHaveLength(1);
  });

  it('renders the default title', () => {
    const wrapper = shallow(<ComposeRootPost id="id" isLoggedIn />);
    expect(wrapper.find('ModalTitle').text()).toEqual('New Post');
  });

  it('renders the title passed in', () => {
    const title = 'Custom Title';
    const wrapper = shallow(<ComposeRootPost id="id" title={title} />);
    expect(wrapper.find('ModalTitle').text()).toEqual(title);
  });

  it('renders a Modal with the right dimensions', () => {
    const wrapper = shallow(<ComposeRootPost />);
    const modal = wrapper.find('Modal');
    expect(modal).toHaveLength(1);
    expect(modal.prop('size')).toEqual('lg');
  });

  it('renders a ComposePost', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ComposeRootPost
        id="id"
        isLoggedIn
        isPosting
        onCancel={mockCallback}
        onDismissError={mockCallback}
        onPost={mockCallback}
      />
    );
    expect(wrapper.find('ComposePost')).toHaveLength(1);
    expect(wrapper.find('ComposePost').prop('isLoggedIn')).toBeTruthy();
    expect(wrapper.find('ComposePost').prop('isPosting')).toBeTruthy();
    expect(wrapper.find('ComposePost').prop('onCancelButtonClicked')).toEqual(
      mockCallback
    );
    expect(
      wrapper.find('ComposePost').prop('onDimissErrorButtonClicked')
    ).toEqual(mockCallback);
    expect(wrapper.find('ComposePost').prop('onPostButtonClicked')).toEqual(
      mockCallback
    );
    expect(wrapper.find('ComposePost').prop('rows')).toEqual(10);
  });
});
