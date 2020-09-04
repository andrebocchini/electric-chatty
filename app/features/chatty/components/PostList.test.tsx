import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PostList from './PostList';
import Post from '../../../types/Post';
import Thread from '../../../types/Thread';

configure({ adapter: new Adapter() });

const thread: Thread = {
  threadId: 39790577,
  root: {
    id: 39790577,
    threadId: 39790577,
    parentId: 0,
    author: 'author',
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
      author: 'author',
      category: 'ontopic',
      date: '2020-07-18T00:19:00Z',
      body:
        'What’s the word for finding it funny but also horribly crushingly depressing?',
      lols: [],
    },
  ],
};

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

describe('PostList tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<PostList className="class" thread={thread} />);
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<PostList id="id" thread={thread} />);
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('should render all the posts in the thread', () => {
    const wrapper = shallow(<PostList thread={thread} />);
    const compactPosts = wrapper.find('CompactPost');
    expect(compactPosts).toHaveLength(2);
    expect(compactPosts.at(1).prop('isOriginalPoster')).toBeTruthy();
  });

  it('should not render an expanded post', () => {
    const wrapper = shallow(<PostList thread={thread} />);
    expect(wrapper.find('ExpandedPost')).toHaveLength(0);
  });

  it('should render an expanded post', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <PostList
        embedPreferences={{
          youtube: true,
          images: true,
        }}
        isComposingReply
        isPostingReply
        isLoggedIn
        loggedInUser="author"
        onChattyThreadClicked={mockCallback}
        onCommentReplyCancelComposing={mockCallback}
        onDismissCommentReplyError={mockCallback}
        onCommentReplyPost={mockCallback}
        onCommentReplyBeginComposing={mockCallback}
        onTagClicked={mockCallback}
        postingReplyError="error"
        selectedPost={post}
        thread={thread}
      />
    );
    const expandedPost = wrapper.find('ExpandedPost');
    expect(expandedPost).toHaveLength(1);
    expect(expandedPost.prop('embedPreferences')).toEqual({
      youtube: true,
      images: true,
    });
    expect(expandedPost.prop('id')).toEqual(`expanded_post_${post.id}`);
    expect(expandedPost.prop('isComposingReply')).toBeTruthy();
    expect(expandedPost.prop('isPostingReply')).toBeTruthy();
    expect(expandedPost.prop('isLoggedIn')).toBeTruthy();
    expect(expandedPost.prop('loggedInUser')).toEqual('author');
    expect(expandedPost.prop('onChattyThreadClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onCancelButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onDimissErrorButtonClicked')).toEqual(
      mockCallback
    );
    expect(expandedPost.prop('onPostButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onReplyButtonClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('onTagClicked')).toEqual(mockCallback);
    expect(expandedPost.prop('postingError')).toEqual('error');
  });
});
