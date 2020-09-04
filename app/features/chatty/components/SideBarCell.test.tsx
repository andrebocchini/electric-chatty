import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SideBarCell from './SideBarCell';
import Thread from '../../../types/Thread';
import { stripAllHtml } from '../../../utils/postUtils';

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

describe('SideBarCell tests', () => {
  it('applies className passed in', () => {
    const wrapper = shallow(<SideBarCell className="class" thread={thread} />);
    expect(wrapper.find('.container.class')).toHaveLength(1);
  });

  it('applies an id to the container element', () => {
    const wrapper = shallow(<SideBarCell id="id" thread={thread} />);
    expect(wrapper.find('#id.container')).toHaveLength(1);
  });

  it('applies the selected class when the cell is selected', () => {
    const wrapper = shallow(<SideBarCell thread={thread} selected />);
    expect(wrapper.find('.container.selected')).toHaveLength(1);
  });

  it('it renders the root post body with no HTML', () => {
    const htmlStrippedBody = stripAllHtml(thread.root.body);
    const wrapper = shallow(<SideBarCell thread={thread} selected />);
    expect(wrapper.find('.body').text()).toEqual(htmlStrippedBody);
  });

  it('it renders a header', () => {
    const wrapper = shallow(
      <SideBarCell loggedInUser="author" thread={thread} selected />
    );
    const header = wrapper.find('SideBarCellHeader');
    expect(header.prop('author')).toEqual(thread.root.author);
    expect(header.prop('date')).toEqual(thread.root.date);
    expect(header.prop('loggedInUser')).toEqual('author');
    expect(header.prop('lols')).toEqual(thread.root.lols);
  });

  it('it renders a footer for a pinned thread', () => {
    const wrapper = shallow(<SideBarCell thread={thread} selected isPinned />);
    const footer = wrapper.find('SideBarCellFooter');
    expect(footer).toHaveLength(1);
    expect(footer.prop('replies')).toEqual(thread.posts.length);
    expect(footer.prop('isPinned')).toBeTruthy();
  });

  it('it renders a footer for thread that is not pinned', () => {
    const wrapper = shallow(
      <SideBarCell thread={thread} selected isPinned={false} />
    );
    const footer = wrapper.find('SideBarCellFooter');
    expect(footer).toHaveLength(1);
    expect(footer.prop('replies')).toEqual(thread.posts.length);
    expect(footer.prop('isPinned')).toBeFalsy();
  });

  it('it executes the click call back', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <SideBarCell thread={thread} selected onClick={mockCallback} />
    );
    wrapper.simulate('click');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('it executes the key press call back', () => {
    const mockCallback = jest.fn();
    const wrapper = shallow(
      <SideBarCell thread={thread} selected onClick={mockCallback} />
    );
    wrapper.simulate('keyPress');
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it('renders a left orange border indicating the thread is political', () => {
    const politicalThread: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: 'author',
        category: 'political',
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
      posts: [],
    };

    const wrapper = shallow(<SideBarCell thread={politicalThread} />);
    expect(wrapper.find('.political')).toHaveLength(1);
  });

  it('renders a left red border indicating the thread is nws', () => {
    const politicalThread: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: 'author',
        category: 'nws',
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
      posts: [],
    };

    const wrapper = shallow(<SideBarCell thread={politicalThread} />);
    expect(wrapper.find('.nws')).toHaveLength(1);
  });

  it('it renders the correct style if the logged in user is a participant in the thread', () => {
    const wrapper = shallow(
      <SideBarCell loggedInUser="author" thread={thread} />
    );
    expect(wrapper.find('.container').hasClass('participant')).toBeTruthy();
  });

  it('it renders the correct style if the logged in user is a participant in the thread and the cell is selected', () => {
    const wrapper = shallow(
      <SideBarCell loggedInUser="author" thread={thread} selected />
    );
    const cell = wrapper.find('.container');
    expect(cell.hasClass('participant')).toBeFalsy();
  });
});
