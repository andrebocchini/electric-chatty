import processEvents, {
  numberOfNewRootPosts,
  isEligibleForReSort,
} from './eventsUtils';

describe('Event utils tests', () => {
  it('should update lol counts', () => {
    const inputEvents = [
      {
        eventId: 7695,
        eventDate: '2020-08-23T13:42:44Z',
        eventType: 'lolCountsUpdate',
        eventData: {
          updates: [
            {
              postId: 39790577,
              tag: 'inf',
              count: 3,
            },
            {
              postId: 39791857,
              tag: 'lol',
              count: 5,
            },
          ],
        },
      },
    ];
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'Post body',
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
            body: 'More body',
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
        ],
      },
    ];
    const expected = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          body: 'Post body',
          lols: [
            {
              tag: 'lol',
              count: 5,
            },
            {
              tag: 'inf',
              count: 3,
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
            lols: [
              {
                tag: 'lol',
                count: 5,
              },
            ],
          },
          {
            id: 39791851,
            threadId: 39790577,
            parentId: 39791199,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            body: 'More body',
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
        ],
      },
    ];

    expect(processEvents(inputEvents, inputThreads)).toEqual(expected);
  });

  it('should update threads with new posts', () => {
    const inputEvents = [
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39890788,
          post: {
            id: 39890788,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Unleashed',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'Spoken like a true fucking weirdo',
            lols: [],
          },
          parentAuthor: 'bradsh',
        },
      },
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:10:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39890789,
          post: {
            id: 39890789,
            threadId: 39790577,
            parentId: 39791857,
            author: 'wtf242',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'Random stuff',
            lols: [],
          },
          parentAuthor: 'mojoald',
        },
      },
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:10:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39790523,
          post: {
            id: 39790523,
            threadId: 39790523,
            parentId: 0,
            author: 'Meg',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'More stuff',
            lols: [],
          },
          parentAuthor: 'Meg',
        },
      },
    ];
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          depth: 0,
          body: 'Post body',
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
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];
    const expected = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          depth: 0,
          body: 'Post body',
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
            id: 39890789,
            threadId: 39790577,
            parentId: 39791857,
            author: 'wtf242',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            depth: 1,
            body: 'Random stuff',
            lols: [],
          },
          {
            id: 39791851,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
          {
            id: 39890788,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Unleashed',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            depth: 0,
            body: 'Spoken like a true fucking weirdo',
            lols: [],
          },
        ],
      },
      {
        threadId: 39790523,
        root: {
          id: 39790523,
          threadId: 39790523,
          parentId: 0,
          author: 'Meg',
          category: 'ontopic',
          date: '2020-08-23T16:06:00Z',
          body: 'More stuff',
          lols: [],
        },
        posts: [],
      },
    ];

    expect(processEvents(inputEvents, inputThreads)).toEqual(expected);
  });

  it('should not add a new post to a thread if it alrady exists', () => {
    const inputEvents = [
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39791845,
          post: {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
          parentAuthor: 'bradsh',
        },
      },
    ];
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          depth: 0,
          body: 'Post body',
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
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];

    expect(processEvents(inputEvents, inputThreads)).toEqual(inputThreads);
  });

  it('should update posts with new post categories', () => {
    const inputEvents = [
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'categoryChange',
        eventData: {
          postId: 39790577,
          category: 'political',
        },
      },
      {
        eventId: 8185,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'categoryChange',
        eventData: {
          postId: 39791857,
          category: 'nws',
        },
      },
    ];
    const inputThreads = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'ontopic',
          date: '2020-07-17T21:09:00Z',
          depth: 0,
          body: 'Post body',
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
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];
    const expected = [
      {
        threadId: 39790577,
        root: {
          id: 39790577,
          threadId: 39790577,
          parentId: 0,
          author: ']pm[chem',
          category: 'political',
          date: '2020-07-17T21:09:00Z',
          depth: 0,
          body: 'Post body',
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
            category: 'nws',
            date: '2020-07-18T09:53:00Z',
            depth: 0,
            body: "It doesn't make any sense. Not funny.",
            lols: [],
          },
          {
            id: 39791851,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Conan',
            category: 'ontopic',
            date: '2020-07-18T09:25:00Z',
            depth: 0,
            body: 'More body',
            lols: [],
          },
          {
            id: 39791845,
            threadId: 39790577,
            parentId: 39790577,
            author: 'ThrillKill',
            category: 'ontopic',
            date: '2020-07-18T09:14:00Z',
            depth: 0,
            body: "You're right, but DevEx is a real thing... B/",
            lols: [],
          },
        ],
      },
    ];

    expect(processEvents(inputEvents, inputThreads)).toEqual(expected);
  });

  it('should return the number of new root post events received', () => {
    const inputEvents = [
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39890788,
          post: {
            id: 39890788,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Unleashed',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'Spoken like a true fucking weirdo',
            lols: [],
          },
          parentAuthor: 'bradsh',
        },
      },
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:10:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39890789,
          post: {
            id: 39890789,
            threadId: 39790577,
            parentId: 39791857,
            author: 'wtf242',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'Random stuff',
            lols: [],
          },
          parentAuthor: 'mojoald',
        },
      },
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:10:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39790523,
          post: {
            id: 39790523,
            threadId: 39790523,
            parentId: 0,
            author: 'Meg',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'More stuff',
            lols: [],
          },
          parentAuthor: 'Meg',
        },
      },
    ];

    expect(numberOfNewRootPosts(inputEvents)).toEqual(1);
  });

  it('should return true for a list of events containing new post events', () => {
    const inputEvents = [
      {
        eventId: 7695,
        eventDate: '2020-08-23T13:42:44Z',
        eventType: 'lolCountsUpdate',
        eventData: {
          updates: [
            {
              postId: 39790577,
              tag: 'inf',
              count: 3,
            },
            {
              postId: 39791857,
              tag: 'lol',
              count: 5,
            },
          ],
        },
      },
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39890788,
          post: {
            id: 39890788,
            threadId: 39790577,
            parentId: 39790577,
            author: 'Unleashed',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'Spoken like a true fucking weirdo',
            lols: [],
          },
          parentAuthor: 'bradsh',
        },
      },
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:10:42Z',
        eventType: 'newPost',
        eventData: {
          postId: 39790523,
          post: {
            id: 39790523,
            threadId: 39790523,
            parentId: 0,
            author: 'Meg',
            category: 'ontopic',
            date: '2020-08-23T16:06:00Z',
            body: 'More stuff',
            lols: [],
          },
          parentAuthor: 'Meg',
        },
      },
    ];

    expect(isEligibleForReSort(inputEvents)).toBeTruthy();
  });

  it('should return false for a list of events containing no new post events', () => {
    const inputEvents = [
      {
        eventId: 7695,
        eventDate: '2020-08-23T13:42:44Z',
        eventType: 'lolCountsUpdate',
        eventData: {
          updates: [
            {
              postId: 39790577,
              tag: 'inf',
              count: 3,
            },
            {
              postId: 39791857,
              tag: 'lol',
              count: 5,
            },
          ],
        },
      },
    ];

    expect(isEligibleForReSort(inputEvents)).toBeFalsy();
  });

  it('should return true for a list of events containing category change events', () => {
    const inputEvents = [
      {
        eventId: 8184,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'categoryChange',
        eventData: {
          postId: 39790577,
          category: 'political',
        },
      },
      {
        eventId: 8185,
        eventDate: '2020-08-23T16:06:42Z',
        eventType: 'categoryChange',
        eventData: {
          postId: 39791857,
          category: 'nws',
        },
      },
    ];

    expect(isEligibleForReSort(inputEvents)).toBeTruthy();
  });

  it('should return false for a list of events containing no category change events', () => {
    const inputEvents = [
      {
        eventId: 7695,
        eventDate: '2020-08-23T13:42:44Z',
        eventType: 'lolCountsUpdate',
        eventData: {
          updates: [
            {
              postId: 39790577,
              tag: 'inf',
              count: 3,
            },
            {
              postId: 39791857,
              tag: 'lol',
              count: 5,
            },
          ],
        },
      },
    ];

    expect(isEligibleForReSort(inputEvents)).toBeFalsy();
  });
});
