import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LOLBar from './LOLBar';
import LOL from '../../../types/LOL';

configure({ adapter: new Adapter() });

const lols: LOL[] = [
  {
    tag: 'inf',
    count: 1,
  },
  {
    tag: 'lol',
    count: 2,
  },
  {
    tag: 'wtf',
    count: 5,
  },
  {
    tag: 'aww',
    count: 1,
  },
  {
    tag: 'unf',
    count: 1,
  },
  {
    tag: 'wow',
    count: 1,
  },
  {
    tag: 'tag',
    count: 1,
  },
];

describe('LOLBar tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<LOLBar className="class" lols={lols} />);
    expect(wrapper.find('.class')).toHaveLength(1);
  });

  it('applies an id to the root element', () => {
    const wrapper = shallow(<LOLBar id="id" lols={lols} />);
    expect(wrapper.find('#id')).toHaveLength(1);
  });

  it('should render all tags in alphabetical order', () => {
    const wrapper = shallow(<LOLBar lols={lols} />);
    const tags = wrapper.find('LOLButton');
    expect(tags).toHaveLength(7);
    expect(tags.at(0).prop('tag')).toEqual('aww');
    expect(tags.at(0).prop('count')).toEqual(1);
    expect(tags.at(1).prop('tag')).toEqual('inf');
    expect(tags.at(1).prop('count')).toEqual(1);
    expect(tags.at(2).prop('tag')).toEqual('lol');
    expect(tags.at(2).prop('count')).toEqual(2);
    expect(tags.at(3).prop('tag')).toEqual('tag');
    expect(tags.at(3).prop('count')).toEqual(1);
    expect(tags.at(4).prop('tag')).toEqual('unf');
    expect(tags.at(4).prop('count')).toEqual(1);
    expect(tags.at(5).prop('tag')).toEqual('wow');
    expect(tags.at(5).prop('count')).toEqual(1);
    expect(tags.at(6).prop('tag')).toEqual('wtf');
    expect(tags.at(6).prop('count')).toEqual(5);
  });
});
