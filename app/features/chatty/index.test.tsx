import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import Store from 'electron-store';
import ChattyScreen from '.';
import Thread from '../../types/Thread';
import { mockState, mockStore } from '../../utils/testUtils';
import * as modes from '../../constants/modes';
import Post from '../../types/Post';

jest.mock('electron-store');

Store as jest.Mocked<typeof Store>;

configure({ adapter: new Adapter() });

// Router
const history = createHashHistory();

describe('ChattyScreen tests', () => {
  beforeAll(() => {
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render a toolbar when in chatty mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.CHATTY,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );
    const toolbar = wrapper.find('Toolbar');
    expect(toolbar).toHaveLength(1);
    expect(toolbar.prop('buttons')).toHaveLength(2);
    expect(toolbar.prop('title')).toEqual('Chatty');
  });

  it('should render a toolbar when in pinned threads mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.PINNED_THREADS,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );
    const toolbar = wrapper.find('Toolbar');
    expect(toolbar).toHaveLength(1);
    expect(toolbar.prop('buttons')).toHaveLength(2);
    expect(toolbar.prop('title')).toEqual('Pinned Threads');
  });

  it('should render a toolbar when in single thread mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.SINGLE_THREAD,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );
    const toolbar = wrapper.find('Toolbar');
    expect(toolbar).toHaveLength(1);
    expect(toolbar.prop('buttons')).toHaveLength(0);
    expect(toolbar.prop('title')).toEqual('Thread');
  });

  it('should render a compose post modal if composing root post', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isComposingRootPost: true,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('ComposeRootPost')).toHaveLength(1);
  });

  it('should not render a compose post modal if not composing root post', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isComposingRootPost: false,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('ComposeRootPost')).toHaveLength(0);
  });

  it('should render a spinner when fetching a single thread', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingSingleThread: true,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('ScreenLoadingIndicator')).toHaveLength(1);
  });

  it('should render a SideBar in chatty mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.CHATTY,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    const sidebar = wrapper.find('SideBar');
    expect(sidebar).toHaveLength(1);
  });

  it('should render a SideBar in pinned threads mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.PINNED_THREADS,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    const sidebar = wrapper.find('SideBar');
    expect(sidebar).toHaveLength(1);
  });

  it('should not render a SideBar in single thread mode', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        mode: modes.SINGLE_THREAD,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    const sidebar = wrapper.find('SideBar');
    expect(sidebar).toHaveLength(0);
  });

  it('should not render a ThreadPane if there is no selected thread', () => {
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        selectedThread: undefined,
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('ThreadPane')).toHaveLength(0);
  });

  it('should render a ThreadPane if there is a selected thread in chatty mode', () => {
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
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingSelectedThread: true,
        mode: modes.CHATTY,
        selectedPost: post,
        selectedThread: thread,
      },
      preferences: {
        ...mockState.preferences,
        credentials: {
          username: 'username',
          password: 'password',
        },
        preferences: {
          ...mockState.preferences.preferences,
          embedPreferences: {
            youtube: true,
            images: true,
          },
          pinnedThreads: [],
        },
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    const threadPane = wrapper.find('ThreadPane');
    expect(threadPane).toHaveLength(1);
    expect(threadPane.prop('embedPreferences')).toEqual({
      youtube: true,
      images: true,
    });
    expect(threadPane.prop('id')).toEqual('threadPane');
    expect(threadPane.prop('isComposingCommentReply')).toBeFalsy();
    expect(threadPane.prop('isComposingRootReply')).toBeFalsy();
    expect(threadPane.prop('isLoggedIn')).toBeTruthy();
    expect(threadPane.prop('isPostingCommentReply')).toBeFalsy();
    expect(threadPane.prop('isPostingRootReply')).toBeFalsy();
    expect(threadPane.prop('isRefreshingSingleThread')).toBeTruthy();
    expect(threadPane.prop('loggedInUser')).toEqual('username');
    expect(threadPane.prop('onCommentReplyBeginComposing')).toBeDefined();
    expect(threadPane.prop('onCommentReplyCancelComposing')).toBeDefined();
    expect(threadPane.prop('onCommentReplyPost')).toBeDefined();
    expect(threadPane.prop('onDismissCommentReplyError')).toBeDefined();
    expect(threadPane.prop('onDismissRootReplyError')).toBeDefined();
    expect(threadPane.prop('onPinButtonClicked')).toBeDefined();
    expect(threadPane.prop('onRefreshSingleThreadButtonClicked')).toBeDefined();
    expect(threadPane.prop('onRootReplyBeginComposing')).toBeDefined();
    expect(threadPane.prop('onRootReplyCancelComposing')).toBeDefined();
    expect(threadPane.prop('onRootReplyPost')).toBeDefined();
    expect(threadPane.prop('onSelectPost')).toBeDefined();
    expect(threadPane.prop('onTagClicked')).toBeDefined();
    expect(threadPane.prop('pinnedThreads')).toEqual([]);
    expect(threadPane.prop('postingCommentReplyError')).toBeFalsy();
    expect(threadPane.prop('postingRootReplyError')).toBeFalsy();
    expect(threadPane.prop('showPinButton')).toBeTruthy();
    expect(threadPane.prop('selectedPost')).toEqual(post);
    expect(threadPane.prop('thread')).toEqual(thread);
  });

  it('should render a ThreadPane if there is a selected thread in pinned threads mode', () => {
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
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingSelectedThread: true,
        mode: modes.PINNED_THREADS,
        selectedPost: post,
        selectedThread: thread,
      },
      preferences: {
        ...mockState.preferences,
        credentials: {
          username: 'username',
          password: 'password',
        },
        preferences: {
          ...mockState.preferences.preferences,
          embedPreferences: {
            youtube: true,
            images: true,
          },
          pinnedThreads: [],
        },
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    const threadPane = wrapper.find('ThreadPane');
    expect(threadPane).toHaveLength(1);
    expect(threadPane.prop('embedPreferences')).toEqual({
      youtube: true,
      images: true,
    });
    expect(threadPane.prop('id')).toEqual('threadPane');
    expect(threadPane.prop('isComposingCommentReply')).toBeFalsy();
    expect(threadPane.prop('isComposingRootReply')).toBeFalsy();
    expect(threadPane.prop('isLoggedIn')).toBeTruthy();
    expect(threadPane.prop('isPostingCommentReply')).toBeFalsy();
    expect(threadPane.prop('isPostingRootReply')).toBeFalsy();
    expect(threadPane.prop('isRefreshingSingleThread')).toBeTruthy();
    expect(threadPane.prop('loggedInUser')).toEqual('username');
    expect(threadPane.prop('onCommentReplyBeginComposing')).toBeDefined();
    expect(threadPane.prop('onCommentReplyCancelComposing')).toBeDefined();
    expect(threadPane.prop('onCommentReplyPost')).toBeDefined();
    expect(threadPane.prop('onDismissCommentReplyError')).toBeDefined();
    expect(threadPane.prop('onDismissRootReplyError')).toBeDefined();
    expect(threadPane.prop('onPinButtonClicked')).toBeDefined();
    expect(threadPane.prop('onRefreshSingleThreadButtonClicked')).toBeDefined();
    expect(threadPane.prop('onRootReplyBeginComposing')).toBeDefined();
    expect(threadPane.prop('onRootReplyCancelComposing')).toBeDefined();
    expect(threadPane.prop('onRootReplyPost')).toBeDefined();
    expect(threadPane.prop('onSelectPost')).toBeDefined();
    expect(threadPane.prop('onTagClicked')).toBeDefined();
    expect(threadPane.prop('pinnedThreads')).toEqual([]);
    expect(threadPane.prop('postingCommentReplyError')).toBeFalsy();
    expect(threadPane.prop('postingRootReplyError')).toBeFalsy();
    expect(threadPane.prop('showPinButton')).toBeTruthy();
    expect(threadPane.prop('selectedPost')).toEqual(post);
    expect(threadPane.prop('thread')).toEqual(thread);
  });

  it('should render a ThreadPane if there is a selected thread in single thread mode', () => {
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
    const store = mockStore({
      ...mockState,
      chatty: {
        ...mockState.chatty,
        isFetchingSingleThread: false,
        mode: modes.SINGLE_THREAD,
        singleThreadNavigationStack: [{ thread, post }],
      },
      preferences: {
        ...mockState.preferences,
        credentials: {
          username: 'username',
          password: 'password',
        },
        preferences: {
          ...mockState.preferences.preferences,
          embedPreferences: {
            youtube: true,
            images: true,
          },
          pinnedThreads: [],
        },
      },
    });

    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ChattyScreen />
        </ConnectedRouter>
      </Provider>
    );

    const threadPane = wrapper.find('ThreadPane');
    expect(threadPane).toHaveLength(1);
    expect(threadPane.prop('embedPreferences')).toEqual({
      youtube: true,
      images: true,
    });
    expect(threadPane.prop('id')).toEqual('threadPane');
    expect(threadPane.prop('isComposingCommentReply')).toBeFalsy();
    expect(threadPane.prop('isComposingRootReply')).toBeFalsy();
    expect(threadPane.prop('isLoggedIn')).toBeTruthy();
    expect(threadPane.prop('isPostingCommentReply')).toBeFalsy();
    expect(threadPane.prop('isPostingRootReply')).toBeFalsy();
    expect(threadPane.prop('isRefreshingSingleThread')).toBeFalsy();
    expect(threadPane.prop('loggedInUser')).toEqual('username');
    expect(threadPane.prop('onCommentReplyBeginComposing')).toBeDefined();
    expect(threadPane.prop('onCommentReplyCancelComposing')).toBeDefined();
    expect(threadPane.prop('onCommentReplyPost')).toBeDefined();
    expect(threadPane.prop('onDismissCommentReplyError')).toBeDefined();
    expect(threadPane.prop('onDismissRootReplyError')).toBeDefined();
    expect(threadPane.prop('onPinButtonClicked')).toBeDefined();
    expect(threadPane.prop('onRefreshSingleThreadButtonClicked')).toBeDefined();
    expect(threadPane.prop('onRootReplyBeginComposing')).toBeDefined();
    expect(threadPane.prop('onRootReplyCancelComposing')).toBeDefined();
    expect(threadPane.prop('onRootReplyPost')).toBeDefined();
    expect(threadPane.prop('onSelectPost')).toBeDefined();
    expect(threadPane.prop('onTagClicked')).toBeDefined();
    expect(threadPane.prop('pinnedThreads')).toEqual([]);
    expect(threadPane.prop('postingCommentReplyError')).toBeFalsy();
    expect(threadPane.prop('postingRootReplyError')).toBeFalsy();
    expect(threadPane.prop('showPinButton')).toBeTruthy();
    expect(threadPane.prop('selectedPost')).toEqual(post);
    expect(threadPane.prop('thread')).toEqual(thread);
  });
});
