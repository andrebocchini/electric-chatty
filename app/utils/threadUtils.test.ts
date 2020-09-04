import moment from 'moment';
import {
  threadWithCalculatedPostDepths,
  firstDescendants,
  orderedPostsByThread,
  rootPost,
  hoursUntilExpiration,
  percentExpired,
  replaceThread,
  mostRecentUpdate,
  isExpired,
} from './threadUtils';
import Post from '../types/Post';
import Thread from '../types/Thread';

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
      id: 39791851,
      threadId: 39790577,
      parentId: 39791199,
      author: 'Conan',
      category: 'ontopic',
      date: '2020-07-18T09:25:00Z',
      body:
        "I have a friend who's the \"chief breaking officer\" at his company, but he's a founding partner of a security firm: a hacker. <br /><br />His title is perfect.<br /><br />Also, that particular title isn't one that really deserves the callout.",
      lols: [],
    },
    {
      id: 39791845,
      threadId: 39790577,
      parentId: 39791199,
      author: 'ThrillKill',
      category: 'ontopic',
      date: '2020-07-18T09:14:00Z',
      body: "You're right, but DevEx is a real thing... B/",
      lols: [],
    },
    {
      id: 39791839,
      threadId: 39790577,
      parentId: 39791303,
      author: 'ColoradoCNC',
      category: 'ontopic',
      date: '2020-07-18T08:57:00Z',
      body: 'I like it ',
      lols: [],
    },
    {
      id: 39791303,
      threadId: 39790577,
      parentId: 39791199,
      author: 'CalipsoII',
      category: 'ontopic',
      date: '2020-07-18T01:21:00Z',
      body: 'I’ve seen “Cloud Sherpa”',
      lols: [],
    },
    {
      id: 39791240,
      threadId: 39790577,
      parentId: 39790577,
      author: 'A10Pilot',
      category: 'ontopic',
      date: '2020-07-18T01:01:00Z',
      body: "ha she's cool.",
      lols: [],
    },
    {
      id: 39791199,
      threadId: 39790577,
      parentId: 39790577,
      author: 'industro',
      category: 'ontopic',
      date: '2020-07-18T00:51:00Z',
      body:
        'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
      lols: [
        {
          tag: 'lol',
          count: 1,
        },
      ],
    },
    {
      id: 39791179,
      threadId: 39790577,
      parentId: 39790577,
      author: 'Zolneirz',
      category: 'ontopic',
      date: '2020-07-18T00:42:00Z',
      body: 'ok                ',
      lols: [],
    },
    {
      id: 39791143,
      threadId: 39790577,
      parentId: 39791122,
      author: 'MaxPete82',
      category: 'ontopic',
      date: '2020-07-18T00:27:00Z',
      body: 'Twitter',
      lols: [
        {
          tag: 'lol',
          count: 4,
        },
      ],
    },
    {
      id: 39791142,
      threadId: 39790577,
      parentId: 39790577,
      author: 'Clay',
      category: 'ontopic',
      date: '2020-07-18T00:26:00Z',
      body: "she's pretty funny",
      lols: [],
    },
    {
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

describe('Thread utils tests', () => {
  it('should return that a thread is expired', () => {
    const expiredThreadPostDate = moment(moment.now())
      .subtract(19, 'hours')
      .toISOString();
    const expiredThread: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: expiredThreadPostDate,
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
          id: 39791851,
          threadId: 39790577,
          parentId: 39791199,
          author: 'Conan',
          category: 'ontopic',
          date: '2020-07-18T09:25:00Z',
          body:
            "I have a friend who's the \"chief breaking officer\" at his company, but he's a founding partner of a security firm: a hacker. <br /><br />His title is perfect.<br /><br />Also, that particular title isn't one that really deserves the callout.",
          lols: [],
        },
        {
          id: 39791845,
          threadId: 39790577,
          parentId: 39791199,
          author: 'ThrillKill',
          category: 'ontopic',
          date: '2020-07-18T09:14:00Z',
          body: "You're right, but DevEx is a real thing... B/",
          lols: [],
        },
        {
          id: 39791839,
          threadId: 39790577,
          parentId: 39791303,
          author: 'ColoradoCNC',
          category: 'ontopic',
          date: '2020-07-18T08:57:00Z',
          body: 'I like it ',
          lols: [],
        },
        {
          id: 39791303,
          threadId: 39790577,
          parentId: 39791199,
          author: 'CalipsoII',
          category: 'ontopic',
          date: '2020-07-18T01:21:00Z',
          body: 'I’ve seen “Cloud Sherpa”',
          lols: [],
        },
        {
          id: 39791240,
          threadId: 39790577,
          parentId: 39790577,
          author: 'A10Pilot',
          category: 'ontopic',
          date: '2020-07-18T01:01:00Z',
          body: "ha she's cool.",
          lols: [],
        },
        {
          id: 39791199,
          threadId: 39790577,
          parentId: 39790577,
          author: 'industro',
          category: 'ontopic',
          date: '2020-07-18T00:51:00Z',
          body:
            'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
          lols: [
            {
              tag: 'lol',
              count: 1,
            },
          ],
        },
        {
          id: 39791179,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Zolneirz',
          category: 'ontopic',
          date: '2020-07-18T00:42:00Z',
          body: 'ok                ',
          lols: [],
        },
        {
          id: 39791143,
          threadId: 39790577,
          parentId: 39791122,
          author: 'MaxPete82',
          category: 'ontopic',
          date: '2020-07-18T00:27:00Z',
          body: 'Twitter',
          lols: [
            {
              tag: 'lol',
              count: 4,
            },
          ],
        },
        {
          id: 39791142,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Clay',
          category: 'ontopic',
          date: '2020-07-18T00:26:00Z',
          body: "she's pretty funny",
          lols: [],
        },
        {
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

    expect(isExpired(expiredThread, new Date())).toBeTruthy();
  });

  it('should return that a thread is not expired', () => {
    const expiredThreadPostDate = moment(moment.now())
      .subtract(5, 'hours')
      .toISOString();
    const expiredThread: Thread = {
      threadId: 39790577,
      root: {
        id: 39790577,
        threadId: 39790577,
        parentId: 0,
        author: ']pm[chem',
        category: 'ontopic',
        date: expiredThreadPostDate,
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
          id: 39791851,
          threadId: 39790577,
          parentId: 39791199,
          author: 'Conan',
          category: 'ontopic',
          date: '2020-07-18T09:25:00Z',
          body:
            "I have a friend who's the \"chief breaking officer\" at his company, but he's a founding partner of a security firm: a hacker. <br /><br />His title is perfect.<br /><br />Also, that particular title isn't one that really deserves the callout.",
          lols: [],
        },
        {
          id: 39791845,
          threadId: 39790577,
          parentId: 39791199,
          author: 'ThrillKill',
          category: 'ontopic',
          date: '2020-07-18T09:14:00Z',
          body: "You're right, but DevEx is a real thing... B/",
          lols: [],
        },
        {
          id: 39791839,
          threadId: 39790577,
          parentId: 39791303,
          author: 'ColoradoCNC',
          category: 'ontopic',
          date: '2020-07-18T08:57:00Z',
          body: 'I like it ',
          lols: [],
        },
        {
          id: 39791303,
          threadId: 39790577,
          parentId: 39791199,
          author: 'CalipsoII',
          category: 'ontopic',
          date: '2020-07-18T01:21:00Z',
          body: 'I’ve seen “Cloud Sherpa”',
          lols: [],
        },
        {
          id: 39791240,
          threadId: 39790577,
          parentId: 39790577,
          author: 'A10Pilot',
          category: 'ontopic',
          date: '2020-07-18T01:01:00Z',
          body: "ha she's cool.",
          lols: [],
        },
        {
          id: 39791199,
          threadId: 39790577,
          parentId: 39790577,
          author: 'industro',
          category: 'ontopic',
          date: '2020-07-18T00:51:00Z',
          body:
            'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
          lols: [
            {
              tag: 'lol',
              count: 1,
            },
          ],
        },
        {
          id: 39791179,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Zolneirz',
          category: 'ontopic',
          date: '2020-07-18T00:42:00Z',
          body: 'ok                ',
          lols: [],
        },
        {
          id: 39791143,
          threadId: 39790577,
          parentId: 39791122,
          author: 'MaxPete82',
          category: 'ontopic',
          date: '2020-07-18T00:27:00Z',
          body: 'Twitter',
          lols: [
            {
              tag: 'lol',
              count: 4,
            },
          ],
        },
        {
          id: 39791142,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Clay',
          category: 'ontopic',
          date: '2020-07-18T00:26:00Z',
          body: "she's pretty funny",
          lols: [],
        },
        {
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

    expect(isExpired(expiredThread, new Date())).toBeFalsy();
  });

  it('should find the root post from the posts in a thread', () => {
    const posts = [
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
        id: 39791851,
        threadId: 39790577,
        parentId: 39791199,
        author: 'Conan',
        category: 'ontopic',
        date: '2020-07-18T09:25:00Z',
        body:
          "I have a friend who's the \"chief breaking officer\" at his company, but he's a founding partner of a security firm: a hacker. <br /><br />His title is perfect.<br /><br />Also, that particular title isn't one that really deserves the callout.",
        lols: [],
      },
      {
        id: 39791845,
        threadId: 39790577,
        parentId: 39791199,
        author: 'ThrillKill',
        category: 'ontopic',
        date: '2020-07-18T09:14:00Z',
        body: "You're right, but DevEx is a real thing... B/",
        lols: [],
      },
      {
        id: 39791839,
        threadId: 39790577,
        parentId: 39791303,
        author: 'ColoradoCNC',
        category: 'ontopic',
        date: '2020-07-18T08:57:00Z',
        body: 'I like it ',
        lols: [],
      },
      {
        id: 39791303,
        threadId: 39790577,
        parentId: 39791199,
        author: 'CalipsoII',
        category: 'ontopic',
        date: '2020-07-18T01:21:00Z',
        body: 'I’ve seen “Cloud Sherpa”',
        lols: [],
      },
      {
        id: 39791240,
        threadId: 39790577,
        parentId: 39790577,
        author: 'A10Pilot',
        category: 'ontopic',
        date: '2020-07-18T01:01:00Z',
        body: "ha she's cool.",
        lols: [],
      },
      {
        id: 39791199,
        threadId: 39790577,
        parentId: 39790577,
        author: 'industro',
        category: 'ontopic',
        date: '2020-07-18T00:51:00Z',
        body:
          'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
        lols: [
          {
            tag: 'lol',
            count: 1,
          },
        ],
      },
      {
        id: 39791179,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Zolneirz',
        category: 'ontopic',
        date: '2020-07-18T00:42:00Z',
        body: 'ok                ',
        lols: [],
      },
      {
        id: 39791143,
        threadId: 39790577,
        parentId: 39791122,
        author: 'MaxPete82',
        category: 'ontopic',
        date: '2020-07-18T00:27:00Z',
        body: 'Twitter',
        lols: [
          {
            tag: 'lol',
            count: 4,
          },
        ],
      },
      {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:26:00Z',
        body: "she's pretty funny",
        lols: [],
      },
      {
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
    ];

    const expected: Post = {
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
    };

    expect(rootPost(posts, 39790577)).toEqual(expected);
  });

  it('should calculate post depths correctly for a whole thread', () => {
    const expected: Thread = {
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
          depth: 0,
          body: "It doesn't make any sense. Not funny.",
          lols: [],
        },
        {
          id: 39791851,
          threadId: 39790577,
          parentId: 39791199,
          author: 'Conan',
          category: 'ontopic',
          date: '2020-07-18T09:25:00Z',
          depth: 1,
          body:
            "I have a friend who's the \"chief breaking officer\" at his company, but he's a founding partner of a security firm: a hacker. <br /><br />His title is perfect.<br /><br />Also, that particular title isn't one that really deserves the callout.",
          lols: [],
        },
        {
          id: 39791845,
          threadId: 39790577,
          parentId: 39791199,
          author: 'ThrillKill',
          category: 'ontopic',
          date: '2020-07-18T09:14:00Z',
          depth: 1,
          body: "You're right, but DevEx is a real thing... B/",
          lols: [],
        },
        {
          id: 39791839,
          threadId: 39790577,
          parentId: 39791303,
          author: 'ColoradoCNC',
          category: 'ontopic',
          date: '2020-07-18T08:57:00Z',
          depth: 2,
          body: 'I like it ',
          lols: [],
        },
        {
          id: 39791303,
          threadId: 39790577,
          parentId: 39791199,
          author: 'CalipsoII',
          category: 'ontopic',
          date: '2020-07-18T01:21:00Z',
          depth: 1,
          body: 'I’ve seen “Cloud Sherpa”',
          lols: [],
        },
        {
          id: 39791240,
          threadId: 39790577,
          parentId: 39790577,
          author: 'A10Pilot',
          category: 'ontopic',
          date: '2020-07-18T01:01:00Z',
          depth: 0,
          body: "ha she's cool.",
          lols: [],
        },
        {
          id: 39791199,
          threadId: 39790577,
          parentId: 39790577,
          author: 'industro',
          category: 'ontopic',
          date: '2020-07-18T00:51:00Z',
          depth: 0,
          body:
            'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
          lols: [
            {
              tag: 'lol',
              count: 1,
            },
          ],
        },
        {
          id: 39791179,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Zolneirz',
          category: 'ontopic',
          date: '2020-07-18T00:42:00Z',
          depth: 0,
          body: 'ok                ',
          lols: [],
        },
        {
          id: 39791143,
          threadId: 39790577,
          parentId: 39791122,
          author: 'MaxPete82',
          category: 'ontopic',
          date: '2020-07-18T00:27:00Z',
          depth: 1,
          body: 'Twitter',
          lols: [
            {
              tag: 'lol',
              count: 4,
            },
          ],
        },
        {
          id: 39791142,
          threadId: 39790577,
          parentId: 39790577,
          author: 'Clay',
          category: 'ontopic',
          date: '2020-07-18T00:26:00Z',
          depth: 0,
          body: "she's pretty funny",
          lols: [],
        },
        {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          depth: 0,
          body:
            '"I love being a woman on the internet":<br /><a target="_blank" rel="nofollow" href="https://twitter.com/cassidoo/status/1284201376516435968?s=20">https://twitter.com/cassidoo/status/1284201376516435968?s=20</a><br /><br />funny as hell.  not me, obviously, just ran across it in my feed<br />',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
          ],
        },
        {
          id: 39791122,
          threadId: 39790577,
          parentId: 39790577,
          author: 'OverloadUT',
          category: 'ontopic',
          date: '2020-07-18T00:19:00Z',
          depth: 0,
          body:
            'What’s the word for finding it funny but also horribly crushingly depressing?',
          lols: [],
        },
      ],
    };

    expect(threadWithCalculatedPostDepths(thread)).toEqual(expected);
  });

  it("It should return a post's descendants in a thread", () => {
    const post: Post = {
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
    };

    const expected: Post[] = [
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
        id: 39791240,
        threadId: 39790577,
        parentId: 39790577,
        author: 'A10Pilot',
        category: 'ontopic',
        date: '2020-07-18T01:01:00Z',
        body: "ha she's cool.",
        lols: [],
      },
      {
        id: 39791199,
        threadId: 39790577,
        parentId: 39790577,
        author: 'industro',
        category: 'ontopic',
        date: '2020-07-18T00:51:00Z',
        body:
          'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
        lols: [
          {
            tag: 'lol',
            count: 1,
          },
        ],
      },
      {
        id: 39791179,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Zolneirz',
        category: 'ontopic',
        date: '2020-07-18T00:42:00Z',
        body: 'ok                ',
        lols: [],
      },
      {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:26:00Z',
        body: "she's pretty funny",
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
    ];

    expect(firstDescendants(post, thread.posts)).toEqual(expected);
  });

  it('Should order the thread correctly', () => {
    const expected: Post[] = [
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
      {
        id: 39791143,
        threadId: 39790577,
        parentId: 39791122,
        author: 'MaxPete82',
        category: 'ontopic',
        date: '2020-07-18T00:27:00Z',
        body: 'Twitter',
        lols: [
          {
            tag: 'lol',
            count: 4,
          },
        ],
      },
      {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:26:00Z',
        body: "she's pretty funny",
        lols: [],
      },
      {
        id: 39791179,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Zolneirz',
        category: 'ontopic',
        date: '2020-07-18T00:42:00Z',
        body: 'ok                ',
        lols: [],
      },
      {
        id: 39791199,
        threadId: 39790577,
        parentId: 39790577,
        author: 'industro',
        category: 'ontopic',
        date: '2020-07-18T00:51:00Z',
        body:
          'I like her title:  <i>Principal Developer Experience Engineer</i><br /><br />I like how you can just make up your own.. titles are dumb.<br /><br />I worked with a marketing guy who called himself:  "Imagination Director" but he was dead serious<br /><br />',
        lols: [
          {
            tag: 'lol',
            count: 1,
          },
        ],
      },
      {
        id: 39791303,
        threadId: 39790577,
        parentId: 39791199,
        author: 'CalipsoII',
        category: 'ontopic',
        date: '2020-07-18T01:21:00Z',
        body: 'I’ve seen “Cloud Sherpa”',
        lols: [],
      },
      {
        id: 39791839,
        threadId: 39790577,
        parentId: 39791303,
        author: 'ColoradoCNC',
        category: 'ontopic',
        date: '2020-07-18T08:57:00Z',
        body: 'I like it ',
        lols: [],
      },
      {
        id: 39791845,
        threadId: 39790577,
        parentId: 39791199,
        author: 'ThrillKill',
        category: 'ontopic',
        date: '2020-07-18T09:14:00Z',
        body: "You're right, but DevEx is a real thing... B/",
        lols: [],
      },
      {
        id: 39791851,
        threadId: 39790577,
        parentId: 39791199,
        author: 'Conan',
        category: 'ontopic',
        date: '2020-07-18T09:25:00Z',
        body:
          "I have a friend who's the \"chief breaking officer\" at his company, but he's a founding partner of a security firm: a hacker. <br /><br />His title is perfect.<br /><br />Also, that particular title isn't one that really deserves the callout.",
        lols: [],
      },
      {
        id: 39791240,
        threadId: 39790577,
        parentId: 39790577,
        author: 'A10Pilot',
        category: 'ontopic',
        date: '2020-07-18T01:01:00Z',
        body: "ha she's cool.",
        lols: [],
      },
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
    ];

    const root = rootPost(thread.posts, thread.threadId);
    const result = orderedPostsByThread(root, thread.posts.reverse());
    expect(result).toEqual(expected);
  });

  it('should return the correct number of hours until expiration of a thread', () => {
    const input: Thread = {
      threadId: 39791142,
      root: {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: "she's pretty funny",
        lols: [],
      },
      posts: [],
    };
    const currentTime = new Date('2020-07-18T05:00:00Z');
    const postDate = new Date(input.root.date);
    expect(hoursUntilExpiration(postDate, currentTime)).toEqual(13);
  });

  it('should return the correct percent that the post is through its expiration window', () => {
    const input: Thread = {
      threadId: 39791142,
      root: {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: "she's pretty funny",
        lols: [],
      },
      posts: [],
    };
    const currentTime = new Date('2020-07-18T06:00:00Z');
    const postDate = new Date(input.root.date);
    const hoursUntilPostExpires = hoursUntilExpiration(postDate, currentTime);
    expect(percentExpired(hoursUntilPostExpires)).toEqual(33);
  });

  it('should replace a thread with matching ID in an array of threads', () => {
    const thread1: Thread = {
      threadId: 39791142,
      root: {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: "she's pretty funny",
        lols: [],
      },
      posts: [],
    };
    const thread2: Thread = {
      threadId: 39791143,
      root: {
        id: 39791143,
        threadId: 39790577,
        parentId: 39790577,
        author: 'joe',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: 'Interesting',
        lols: [],
      },
      posts: [],
    };
    const inputThreads = [thread1, thread2];
    const replacementThread: Thread = {
      threadId: 39791143,
      root: {
        id: 39791143,
        threadId: 39790577,
        parentId: 39790577,
        author: 'joe',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: 'This guy is replaced',
        lols: [],
      },
      posts: [],
    };
    const expectedThreads = [thread1, replacementThread];

    expect(replaceThread(inputThreads, replacementThread)).toEqual(
      expectedThreads
    );
  });

  it('should not a thread if one is not found in the list with a matching id', () => {
    const thread1: Thread = {
      threadId: 39791142,
      root: {
        id: 39791142,
        threadId: 39790577,
        parentId: 39790577,
        author: 'Clay',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: "she's pretty funny",
        lols: [],
      },
      posts: [],
    };
    const thread2: Thread = {
      threadId: 39791143,
      root: {
        id: 39791143,
        threadId: 39790577,
        parentId: 39790577,
        author: 'joe',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: 'Interesting',
        lols: [],
      },
      posts: [],
    };
    const inputThreads = [thread1, thread2];
    const replacementThread: Thread = {
      threadId: 123456789,
      root: {
        id: 39791143,
        threadId: 39790577,
        parentId: 39790577,
        author: 'joe',
        category: 'ontopic',
        date: '2020-07-18T00:00:00Z',
        depth: 0,
        body: 'This guy is replaced',
        lols: [],
      },
      posts: [],
    };
    const expectedThreads = [thread1, thread2];

    expect(replaceThread(inputThreads, replacementThread)).toEqual(
      expectedThreads
    );
  });

  it('should return the date of the most recent post made to this thread', () => {
    expect(mostRecentUpdate(thread)).toEqual('2020-07-18T09:53:00Z');
  });
});
