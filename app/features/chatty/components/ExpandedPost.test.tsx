import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ExpandedPost from './ExpandedPost';
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

describe('ExpandedPost tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<ExpandedPost className="class" post={post} />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<ExpandedPost id="id" post={post} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('it renders a header', () => {
    const wrapper = shallow(
      <ExpandedPost id="id" loggedInUser="author" post={post} />
    );
    const header = wrapper.find('ExpandedPostHeader');
    expect(header).toHaveLength(1);
    expect(header.prop('post')).toEqual(post);
    expect(header.prop('loggedInUser')).toEqual('author');
  });

  it('it renders a LOL bar', () => {
    const wrapper = shallow(<ExpandedPost id="id" post={post} />);
    const bar = wrapper.find('LOLBar');
    expect(bar).toHaveLength(1);
    expect(bar.prop('lols')).toEqual(post.lols);
  });

  it('it renders a footer', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ExpandedPost
        id="id"
        isPinned
        isRefreshing
        post={post}
        onPinButtonClicked={mockCallback}
        onReplyButtonClicked={mockCallback}
        onRefreshButtonClicked={mockCallback}
        onTagClicked={mockCallback}
        showPinButton
        showRefreshButton
      />
    );
    const bar = wrapper.find('ExpandedPostFooter');
    expect(bar).toHaveLength(1);
    expect(bar.prop('isPinned')).toBeTruthy();
    expect(bar.prop('isRefreshing')).toBeTruthy();
    expect(bar.prop('post')).toEqual(post);
    expect(bar.prop('onPinButtonClicked')).toEqual(mockCallback);
    expect(bar.prop('onReplyButtonClicked')).toEqual(mockCallback);
    expect(bar.prop('onRefreshButtonClicked')).toEqual(mockCallback);
    expect(bar.prop('onTagClicked')).toEqual(mockCallback);
    expect(bar.prop('showPinButton')).toBeTruthy();
    expect(bar.prop('showRefreshButton')).toBeTruthy();
    expect(bar.hasClass('footer')).toBeFalsy();
  });

  it('it renders a footer with the right style when composing a reply', () => {
    const wrapper = shallow(
      <ExpandedPost id="id" post={post} isComposingReply />
    );
    const bar = wrapper.find('ExpandedPostFooter');
    expect(bar).toHaveLength(1);
    expect(bar.hasClass('footer')).toBeTruthy();
  });

  it('it does not render a ComposePost when not composing a reply', () => {
    const wrapper = shallow(
      <ExpandedPost id="id" isComposingReply={false} post={post} />
    );

    expect(wrapper.find('ComposePost')).toHaveLength(0);
  });

  it('it renders a ComposePost when composing a reply', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ExpandedPost
        id="id"
        isComposingReply
        isLoggedIn
        isPostingReply
        post={post}
        postingError="error"
        onCancelButtonClicked={mockCallback}
        onDimissErrorButtonClicked={mockCallback}
        onPostButtonClicked={mockCallback}
      />
    );
    const composePost = wrapper.find('ComposePost');
    expect(composePost).toHaveLength(1);
    expect(composePost.prop('error')).toEqual('error');
    expect(composePost.prop('isLoggedIn')).toBeTruthy();
    expect(composePost.prop('isPosting')).toBeTruthy();
    expect(composePost.prop('onCancelButtonClicked')).toEqual(mockCallback);
    expect(composePost.prop('onDimissErrorButtonClicked')).toEqual(
      mockCallback
    );
  });
});
