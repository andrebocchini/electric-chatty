import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {
  faTags,
  faReply,
  faThumbtack,
} from '@fortawesome/free-solid-svg-icons';
import ExpandedPostFooter from './ExpandedPostFooter';
import Post from '../../../types/Post';

configure({ adapter: new Adapter() });

const post: Post = {
  id: 39821209,
  threadId: 39820008,
  parentId: 39821146,
  author: 'author',
  category: 'ontopic',
  date: '2020-07-28T18:08:00Z',
  depth: 0,
  body: 'Post body',
  lols: [],
};

describe('ExpandedPostFooter tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(
      <ExpandedPostFooter className="class" post={post} />
    );
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies id passed in', () => {
    const wrapper = shallow(<ExpandedPostFooter id="id" post={post} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders the pin button', () => {
    const wrapper = mount(<ExpandedPostFooter post={post} showPinButton />);
    const button = wrapper.find('FontAwesomeIcon#pinButton');
    expect(button).toHaveLength(1);
    expect(button.hasClass('button')).toBeTruthy();
    expect(button.hasClass('unpinned')).toBeTruthy();
    expect(button.prop('icon')).toEqual(faThumbtack);
  });

  it('renders the right pin button style if the thread is pinned', () => {
    const wrapper = mount(
      <ExpandedPostFooter post={post} isPinned showPinButton />
    );
    const button = wrapper.find('FontAwesomeIcon#pinButton');
    expect(button).toHaveLength(1);
    expect(button.hasClass('button')).toBeTruthy();
    expect(button.hasClass('pinned')).toBeTruthy();
    expect(button.prop('icon')).toEqual(faThumbtack);
  });

  it('does not render the pin button', () => {
    const wrapper = mount(<ExpandedPostFooter post={post} />);
    const button = wrapper.find('FontAwesomeIcon#pinButton');
    expect(button).toHaveLength(0);
  });

  it('executes the pin button callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ExpandedPostFooter
        post={post}
        showPinButton
        onPinButtonClicked={mockCallback}
      />
    );
    const button = wrapper.find('#pinButton');
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0]).toEqual([post.threadId]);
  });

  it('renders the reply button', () => {
    const wrapper = mount(<ExpandedPostFooter post={post} />);
    const button = wrapper.find('FontAwesomeIcon#replyButton');
    expect(button).toHaveLength(1);
    expect(button.hasClass('button')).toBeTruthy();
    expect(button.prop('icon')).toEqual(faReply);
  });

  it('executes the reply callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ExpandedPostFooter post={post} onReplyButtonClicked={mockCallback} />
    );
    const button = wrapper.find('#replyButton');
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0]).toEqual([post]);
  });

  it('renders the refresh button', () => {
    const wrapper = shallow(
      <ExpandedPostFooter post={post} showRefreshButton isRefreshing />
    );
    const button = wrapper.find('RefreshButton');
    expect(button).toHaveLength(1);
    expect(button.hasClass('button')).toBeTruthy();
    expect(button.prop('isRefreshing')).toBeTruthy();
  });

  it('does not render the refresh button', () => {
    const wrapper = shallow(<ExpandedPostFooter post={post} />);
    expect(wrapper.find('RefreshButton')).toHaveLength(0);
  });

  it('executes the refresh callback', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ExpandedPostFooter
        post={post}
        onRefreshButtonClicked={mockCallback}
        showRefreshButton
      />
    );
    const button = wrapper.find('RefreshButton');
    button.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback.mock.calls[0]).toEqual([post.threadId]);
  });

  it('renders the tag button', () => {
    const wrapper = shallow(<ExpandedPostFooter post={post} />);
    const button = wrapper.find('#tagButton');
    expect(button).toHaveLength(1);
    expect(button.hasClass('button')).toBeTruthy();
    expect(button.childAt(0).prop('icon')).toEqual(faTags);
    expect(button.childAt(0).prop('onClick')).toBeDefined();
  });

  it('renders the tag popover', () => {
    const wrapper = shallow(
      <ExpandedPostFooter post={post} onTagClicked={jest.fn()} />
    );
    const button = wrapper.find('LOLPopover');
    expect(button).toHaveLength(1);
    expect(button.prop('show')).toBeFalsy();
    expect(button.prop('onHide')).toBeDefined();
    expect(button.prop('onTagClick')).toBeDefined();
    expect(button.prop('target')).toBeDefined();
  });
});
