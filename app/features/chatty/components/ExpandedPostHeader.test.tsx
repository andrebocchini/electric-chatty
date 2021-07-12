import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dayjs from 'dayjs';
import ExpandedPostHeader from './ExpandedPostHeader';
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

describe('ExpandedPostHeader tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(
      <ExpandedPostHeader className="class" post={post} />
    );
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<ExpandedPostHeader id="id" post={post} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders the post author', () => {
    const wrapper = shallow(<ExpandedPostHeader post={post} />);
    expect(wrapper.find('.author').text()).toEqual(post.author);
  });

  it('renders the post date', () => {
    const displayDate = dayjs(post.date).fromNow();
    const wrapper = shallow(<ExpandedPostHeader post={post} />);
    expect(wrapper.find('.date').text()).toEqual(displayDate);
  });

  it('renders right style if the author is the logged in user', () => {
    const wrapper = shallow(
      <ExpandedPostHeader loggedInUser="author" post={post} />
    );
    expect(wrapper.find('.author').hasClass('loggedInAuthor')).toBeTruthy();
  });

  it('renders right style if the author is Shacknews', () => {
    const wrapper = shallow(
      <ExpandedPostHeader
        loggedInUser="author"
        post={{ ...post, author: 'Shacknews' }}
      />
    );
    expect(wrapper.find('.author').hasClass('shacknews')).toBeTruthy();
  });
});
