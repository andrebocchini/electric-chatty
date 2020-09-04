import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CompactPost from './CompactPost';
import Post from '../../../types/Post';
import { deSpoiler } from '../../../utils/postUtils';

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

describe('CompactPost tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<CompactPost className="class" post={post} />);
    expect(wrapper.find('div.class.container')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<CompactPost id="id" post={post} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('executes the onClick callback', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<CompactPost onClick={mockOnClick} post={post} />);
    wrapper.find('.container').simulate('click');
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('executes the onClick callback when a key is pressed', () => {
    const mockOnClick = jest.fn();
    const wrapper = shallow(<CompactPost onClick={mockOnClick} post={post} />);
    wrapper.find('.container').simulate('keyPress');
    expect(mockOnClick).toHaveBeenCalled();
  });

  it('renders a de-spoiled post body', () => {
    const deSpoiledBody = deSpoiler(post.body);
    const wrapper = shallow(<CompactPost post={post} />);
    expect(wrapper.find('.body').text()).toEqual(deSpoiledBody);
  });

  it('renders a LOL bar', () => {
    const wrapper = shallow(<CompactPost post={post} />);
    expect(wrapper.find('.lolBar')).toHaveLength(1);
  });

  it('renders the post author name', () => {
    const { author } = post;
    const wrapper = shallow(<CompactPost post={post} />);
    expect(wrapper.find('.author').text()).toEqual(author);
  });

  it('applies the correct style if the logged in user is the author of the post', () => {
    const wrapper = shallow(<CompactPost loggedInUser="author" post={post} />);
    expect(wrapper.find('.author').hasClass('loggedInAuthor')).toBeTruthy();
  });

  it('applies the correct style if the author is the original thread poster', () => {
    const wrapper = shallow(
      <CompactPost isOriginalPoster loggedInUser="author" post={post} />
    );
    expect(wrapper.find('.author').hasClass('originalPoster')).toBeTruthy();
  });
});
