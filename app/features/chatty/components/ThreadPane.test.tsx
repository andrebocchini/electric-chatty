import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ThreadPane from './ThreadPane';
import Thread from '../../../types/Thread';
import Post from '../../../types/Post';

configure({ adapter: new Adapter() });

const thread: Thread = {
  threadId: 39790577,
  root: {
    id: 39790577,
    threadId: 39790577,
    parentId: 0,
    author: ']pm[chem',
    category: 'ontopic',
    date: '2020-07-17T21:09:00Z',
    body:
      '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
    lols: [
      {
        tag: 'lol',
        count: 5,
      },
    ],
  },
  posts: [
    {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      body: "It doesn't make any sense. Not funny.",
      lols: [],
    },
    {
      id: 39791122,
      threadId: 39790577,
      parentId: 39790577,
      author: 'OverloadUT',
      category: 'ontopic',
      date: '2020-07-18T00:19:00Z',
      body:
        'What’s the word for finding it funny but also horribly crushingly depressing?',
      lols: [],
    },
  ],
};

describe('ThreadPane tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<ThreadPane className="class" thread={thread} />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<ThreadPane id="id" thread={thread} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders an expanded post with the thread root post', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ThreadPane
        embedPreferences={{ youtube: true, images: true }}
        isComposingRootReply
        isLoggedIn
        isPostingRootReply
        isRefreshingSingleThread
        loggedInUser="author"
        onChattyThreadClicked={mockCallback}
        onDismissRootReplyError={mockCallback}
        onPinButtonClicked={mockCallback}
        onRefreshSingleThreadButtonClicked={mockCallback}
        onRootReplyBeginComposing={mockCallback}
        onRootReplyCancelComposing={mockCallback}
        onRootReplyPost={mockCallback}
        onTagClicked={mockCallback}
        pinnedThreads={[39790577]}
        postingRootReplyError="Error"
        showPinButton
        thread={thread}
      />
    );
    const expandedPost = wrapper
      .find('.container')
      .children()
      .find('ExpandedPost');
    expect(expandedPost).toHaveLength(1);
    expect(expandedPost.prop('embedPreferences')).toEqual({
      youtube: true,
      images: true,
    });
    expect(expandedPost.prop('isComposingReply')).toBeTruthy();
    expect(expandedPost.prop('isLoggedIn')).toBeTruthy();
    expect(expandedPost.prop('isPinned')).toBeTruthy();
    expect(expandedPost.prop('isPostingReply')).toBeTruthy();
    expect(expandedPost.prop('isRefreshing')).toBeTruthy();
    expect(expandedPost.prop('loggedInUser')).toEqual('author');
    expect(expandedPost.prop('onChattyThreadClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onCancelButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onDimissErrorButtonClicked')).toEqual(
      mockCallback
    );
    expect(expandedPost.prop('onPinButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onPostButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onRefreshButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onReplyButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onTagClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('post')).toEqual(thread.root);
    expect(expandedPost.prop('postingError')).toEqual('Error');
    expect(expandedPost.prop('showPinButton')).toBeTruthy();
    expect(expandedPost.prop('showRefreshButton')).toBeTruthy();
  });

  it('renders a post list', () => {
    const post: Post = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      body: "It doesn't make any sense. Not funny.",
      lols: [],
    };
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <ThreadPane
        embedPreferences={{
          youtube: true,
          images: true,
        }}
        isComposingCommentReply
        isLoggedIn
        isPostingCommentReply
        loggedInUser="username"
        onChattyThreadClicked={mockCallback}
        onCommentReplyBeginComposing={mockCallback}
        onCommentReplyCancelComposing={mockCallback}
        onCommentReplyPost={mockCallback}
        onDismissCommentReplyError={mockCallback}
        onSelectPost={mockCallback}
        onTagClicked={mockCallback}
        postingCommentReplyError="error"
        selectedPost={post}
        thread={thread}
      />
    );
    const postList = wrapper.find('.container').children().find('PostList');
    expect(postList).toHaveLength(1);
    expect(postList.prop('embedPreferences')).toEqual({
      youtube: true,
      images: true,
    });
    expect(postList.prop('isComposingReply')).toBeTruthy();
    expect(postList.prop('isLoggedIn')).toBeTruthy();
    expect(postList.prop('isPostingReply')).toBeTruthy();
    expect(postList.prop('loggedInUser')).toEqual('username');
    expect(postList.prop('onChattyThreadClicked')).toEqual(mockCallback);
    expect(postList.prop('onCommentReplyBeginComposing')).toEqual(mockCallback);
    expect(postList.prop('onCommentReplyCancelComposing')).toEqual(
      mockCallback
    );
    expect(postList.prop('onCommentReplyPost')).toEqual(mockCallback);
    expect(postList.prop('onDismissCommentReplyError')).toEqual(mockCallback);
    expect(postList.prop('onSelectPost')).toEqual(mockCallback);
    expect(postList.prop('onTagClicked')).toEqual(mockCallback);
    expect(postList.prop('postingReplyError')).toEqual('error');
    expect(postList.prop('selectedPost')).toEqual(post);
    expect(postList.prop('thread')).toEqual(thread);
  });
});
