import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideBar from './SideBar';
import Thread from '../../../types/Thread';

configure({ adapter: new Adapter() });

const threads: Thread[] = [
  {
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
        author: 'OverloadUT',
        category: 'ontopic',
        date: '2020-07-18T00:19:00Z',
        body:
          'What’s the word for finding it funny but also horribly crushingly depressing?',
        lols: [],
      },
    ],
  },
  {
    threadId: 39790579,
    root: {
      id: 39790579,
      threadId: 39790579,
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
        threadId: 39790579,
        parentId: 39790579,
        author: 'gmoney',
        category: 'ontopic',
        date: '2020-07-18T09:53:00Z',
        body: "It doesn't make any sense. Not funny.",
        lols: [],
      },
      {
        id: 39791122,
        threadId: 39790579,
        parentId: 39790579,
        author: 'OverloadUT',
        category: 'ontopic',
        date: '2020-07-18T00:19:00Z',
        body:
          'What’s the word for finding it funny but also horribly crushingly depressing?',
        lols: [],
      },
    ],
  },
];

describe('SideBar tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<SideBar className="class" threads={threads} />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies the id passed in', () => {
    const wrapper = shallow(<SideBar id="id" threads={threads} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('renders the side bar filter', () => {
    const wrapper = shallow(<SideBar threads={threads} />);
    expect(wrapper.find('SideBarFilter')).toHaveLength(1);
  });

  it('renders the right number of side bar cells', () => {
    const wrapper = shallow(
      <SideBar
        loggedInUser="author"
        threads={threads}
        pinnedThreadIds={[39790579]}
      />
    );
    const cells = wrapper.find('SideBarCell');
    expect(cells).toHaveLength(2);
    expect(cells.at(0).prop('loggedInUser')).toEqual('author');
    expect(cells.at(0).prop('isPinned')).toBeFalsy();
    expect(cells.at(1).prop('loggedInUser')).toEqual('author');
    expect(cells.at(1).prop('isPinned')).toBeTruthy();
  });

  it('executes the select thread callback when click on a cell', () => {
    const mockCallback = jest.fn();

    const wrapper = shallow(
      <SideBar threads={threads} onSelectThread={mockCallback} />
    );
    const cell = wrapper.find('SideBarCell').at(0);
    cell.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('passes the filter callback to the side bar filter', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <SideBar threads={threads} onFilter={mockCallback} />
    );
    const filter = wrapper.find('SideBarFilter');
    expect(filter.prop('onFilter')).toEqual(mockCallback);
  });
});
