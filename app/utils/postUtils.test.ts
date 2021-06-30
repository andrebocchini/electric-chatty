import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { NodeType } from 'node-html-parser';
import {
  deSpoiler,
  stripAllHtml,
  sanitizePostBody,
  postForDisplay,
  isImageLink,
  getEmbedFor,
  isYoutubeLink,
  getYoutubeEmbed,
  getImageEmbed,
  isVideoLink,
  getVideoEmbed,
  isSpoilered,
  getVideoType,
  getTweetId,
  isTwitterLink,
  getTwitterEmbed,
  isShacknewsChattyThreadLink,
  getShacknewsChattyThreadId,
  getShacknewsChattyThreadEmbed,
  getShacknewsChattyThreadSelectedPostId,
  isShacknewsArticleLink,
  getShacknewsArticleLink,
  getAttributes,
  getShacknewsArticleEmbed,
} from './postUtils';
import Spoiler from '../components/Spoiler';
import ElementKeyIndexer from '../types/ElementKeyIndexer';
import ChattyThreadLink from '../features/chatty/components/ChattyThreadLink';

configure({ adapter: new Adapter() });

describe('Post utils tests', () => {
  it('should despoiler a string', () => {
    const input =
      '<span class="jt_spoiler" onclick="this.className = \'\';">test</span> This is more stuff <span class="jt_spoiler" onclick="this.className = \'\';">testing</span>';
    expect(deSpoiler(input)).toEqual('____ This is more stuff _______');
  });

  it('should remove all html tags from a string', () => {
    const input =
      '<html><head><title>title</title><script><meta />script content</script></head><body><a href="hi">link</a><iframe>I frame stuff</iframe></body></html>';
    const expected = 'link';
    expect(stripAllHtml(input)).toEqual(expected);
  });

  it('should sannitize a post body', () => {
    const input =
      '<a href="hi" target="_blank"><i><span class="jt_green" onclick="run some js">link</span><br /></i></a><iframe><meta>stuff</meta>';
    const expected =
      '<a href="hi" target="_blank"><i><span class="jt_green" onclick>link</span><br /></i></a>stuff';
    expect(sanitizePostBody(input)).toEqual(expected);
  });

  it('should correctly return individual attributes', () => {
    const input = 'class="jt_red" key="arg"';
    expect(getAttributes(input)).toEqual({
      className: 'jt_red',
      key: 'arg',
    });
  });

  it('should return mp4 as the video type', () => {
    expect(getVideoType('http://chattypics.com/image.mp4')).toEqual('mp4');
  });

  it('should return webm as the video type', () => {
    expect(getVideoType('http://chattypics.com/image.webm')).toEqual('webm');
  });

  it('should return true if the element is spoilered', () => {
    const input = {
      tagName: 'span',
      rawAttrs: '',
      childNodes: [],
      text: '',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: ['jt_spoiler'],
    };
    expect(isSpoilered(input)).toBeTruthy();
  });

  it('should return the thread id from a shacknews chatty thread link', () => {
    expect(
      getShacknewsChattyThreadId(
        'https://www.shacknews.com/chatty?id=1234567#item_123'
      )
    ).toEqual('1234567');
    expect(
      getShacknewsChattyThreadId('https://www.shacknews.com/chatty?id=1234567')
    ).toEqual('1234567');
  });

  it('should return the post id from a shacknews chatty thread link', () => {
    expect(
      getShacknewsChattyThreadSelectedPostId(
        'https://www.shacknews.com/chatty?id=1234567#item_123'
      )
    ).toEqual('123');
    expect(
      getShacknewsChattyThreadSelectedPostId(
        'https://www.shacknews.com/chatty?id=1234567'
      )
    ).toBeUndefined();
  });

  it('should return whether or not a url is a shacknews article link', () => {
    const makeNode = (url: string) => {
      return {
        tagName: 'a',
        rawAttrs: `href="${url}"`,
        childNodes: [],
        text: url,
        rawText: '',
        nodeType: NodeType.ELEMENT_NODE,
        classNames: [],
      };
    };
    expect(isShacknewsArticleLink(makeNode('/article/'))).toBeTruthy();
  });

  it('should return a full shacknews article url', () => {
    const original = '/article/119930/nhl-21-preview-dirty-dangles';
    const expected =
      'https://www.shacknews.com/article/119930/nhl-21-preview-dirty-dangles';

    expect(getShacknewsArticleLink(original)).toEqual(expected);
  });

  it('should return the embed for a shacknews article', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="/article/119930/nhl-21-preview-dirty-dangles"',
      childNodes: [],
      text: 'Some text',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement(
      'a',
      {
        href:
          'https://www.shacknews.com/article/119930/nhl-21-preview-dirty-dangles',
        key: 'key',
      },
      'Some text'
    );

    expect(getShacknewsArticleEmbed(input, 'key')).toEqual(expected);
  });

  it('should return whether a URL is a shacknews chatty thread link', () => {
    const makeNode = (url: string) => {
      return {
        tagName: 'a',
        rawAttrs: `href="${url}"`,
        childNodes: [],
        text: url,
        rawText: '',
        nodeType: NodeType.ELEMENT_NODE,
        classNames: [],
      };
    };
    expect(
      isShacknewsChattyThreadLink(
        makeNode('https://www.shacknews.com/chatty?id=1234567#item_123')
      )
    ).toBeTruthy();
    expect(
      isShacknewsChattyThreadLink(
        makeNode('http://www.shacknews.com/chatty?id=1234567#item_123')
      )
    ).toBeTruthy();
    expect(
      isShacknewsChattyThreadLink(
        makeNode('https://www.shacknews.com/chatty?id=1234567')
      )
    ).toBeTruthy();
    expect(
      isShacknewsChattyThreadLink(makeNode('https://www.shacknews.com/chatty'))
    ).toBeFalsy();
    expect(
      isShacknewsChattyThreadLink(
        makeNode('https://www.shacknews.com/chatty/articles')
      )
    ).toBeFalsy();
    expect(
      isShacknewsChattyThreadLink(makeNode('http://www.google.com/image.txt'))
    ).toBeFalsy();
  });

  it('should return the embed for a shacknews chatty thread link from an https url with a selected post', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="https://www.shacknews.com/chatty?id=1234567#item_123"',
      childNodes: [],
      text: 'https://www.shacknews.com/chatty?id=1234567#item_123',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const mockCallback = jest.fn();
    const expected = React.createElement(
      ChattyThreadLink,
      {
        threadId: 1234567,
        postId: 123,
        onChattyThreadClicked: mockCallback,
        key: 'key',
      },
      'https://www.shacknews.com/chatty?id=1234567#item_123'
    );

    expect(getShacknewsChattyThreadEmbed(input, 'key', mockCallback)).toEqual(
      expected
    );
  });

  it('should return the embed for a shacknews chatty thread link from an https url without a selected post', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="https://www.shacknews.com/chatty?id=1234567"',
      childNodes: [],
      text: 'https://www.shacknews.com/chatty?id=1234567',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const mockCallback = jest.fn();
    const expected = React.createElement(
      ChattyThreadLink,
      {
        threadId: 1234567,
        postId: undefined,
        onChattyThreadClicked: mockCallback,
        key: 'key',
      },
      'https://www.shacknews.com/chatty?id=1234567'
    );

    expect(getShacknewsChattyThreadEmbed(input, 'key', mockCallback)).toEqual(
      expected
    );
  });

  it('should return whether a URL is an image link', () => {
    const makeNode = (url: string) => {
      return {
        tagName: 'a',
        rawAttrs: `href="${url}"`,
        childNodes: [],
        text: url,
        rawText: '',
        nodeType: NodeType.ELEMENT_NODE,
        classNames: [],
      };
    };
    expect(
      isImageLink(makeNode('http://chattypics.com/image.jpg'))
    ).toBeTruthy();
    expect(
      isImageLink(makeNode('https://i.imgur.com/image.jpeg'))
    ).toBeTruthy();
    expect(isImageLink(makeNode('https://i.redd.it/image.png'))).toBeTruthy();
    expect(isImageLink(makeNode('https://i.redd.it/image.gif'))).toBeTruthy();
    expect(
      isImageLink(makeNode('http://chattypics.com/image.JPG'))
    ).toBeTruthy();
    expect(
      isImageLink(makeNode('https://i.imgur.com/image.JPeG'))
    ).toBeTruthy();
    expect(isImageLink(makeNode('https://i.redd.it/image.PNG'))).toBeTruthy();
    expect(isImageLink(makeNode('https://i.redd.it/image.Gif'))).toBeTruthy();
    expect(
      isImageLink(makeNode('http://www.google.com/image.txt'))
    ).toBeFalsy();
  });

  it('should return the embed for an image', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.jpg"',
      childNodes: [],
      text: 'http://chattypics.com/image.jpg',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key' }, [
      React.createElement(
        'a',
        { href: 'http://chattypics.com/image.jpg' },
        'http://chattypics.com/image.jpg'
      ),
      React.createElement('img', {
        src: 'http://chattypics.com/image.jpg',
        className: 'embedded-image',
      }),
    ]);
    const result = getImageEmbed(input, 'key');
    expect(result).toEqual(expected);
  });

  it('should return whether a URL is a video link', () => {
    const makeNode = (url: string) => {
      return {
        tagName: 'a',
        childNodes: [],
        text: url,
        rawText: '',
        nodeType: NodeType.ELEMENT_NODE,
        classNames: [],
        rawAttrs: '',
      };
    };
    expect(
      isVideoLink(makeNode('http://chattypics.com/something.mp4'))
    ).toBeTruthy();
    expect(isVideoLink(makeNode('https://i.imgur.com/video.mp4'))).toBeTruthy();
    expect(isVideoLink(makeNode('https://i.redd.it/video.webm'))).toBeTruthy();
    expect(isVideoLink(makeNode('http://www.google.com'))).toBeFalsy();
  });

  it('should return the embed for an mp4', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.mp4"',
      childNodes: [],
      text: 'http://chattypics.com/image.mp4',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key' }, [
      React.createElement(
        'a',
        { href: 'http://chattypics.com/image.mp4' },
        'http://chattypics.com/image.mp4'
      ),
      React.createElement(
        'video',
        {
          className: `embedded-mp4`,
          controls: true,
        },
        React.createElement('source', {
          src: 'http://chattypics.com/image.mp4',
          type: `video/mp4`,
        })
      ),
    ]);
    const result = getVideoEmbed(input, 'key');
    expect(result).toEqual(expected);
  });

  it('should return the embed for a webm', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.webm"',
      childNodes: [],
      text: 'http://chattypics.com/image.webm',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key' }, [
      React.createElement(
        'a',
        { href: 'http://chattypics.com/image.webm' },
        'http://chattypics.com/image.webm'
      ),
      React.createElement(
        'video',
        {
          className: `embedded-webm`,
          controls: true,
        },
        React.createElement('source', {
          src: 'http://chattypics.com/image.webm',
          type: `video/webm`,
        })
      ),
    ]);
    const result = getVideoEmbed(input, 'key');
    expect(result).toEqual(expected);
  });

  it('should return wether or not a link is for a tweet', () => {
    const makeTwitterNode = (url: string) => {
      return {
        tagName: 'a',
        childNodes: [],
        text: url,
        rawText: '',
        nodeType: NodeType.ELEMENT_NODE,
        rawAttrs: '',
        classNames: [],
      };
    };
    expect(
      isTwitterLink(
        makeTwitterNode(
          'https://twitter.com/CDCofBC/status/1294355681076826113?s=20'
        )
      )
    ).toBeTruthy();
    expect(
      isTwitterLink(
        makeTwitterNode(
          'https://twitter.com/CDCofBC/status/1294355681076826113'
        )
      )
    ).toBeTruthy();
    expect(
      isTwitterLink(
        makeTwitterNode(
          'https://www.twitter.com/CDCofBC/status/1294355681076826113?s=20'
        )
      )
    ).toBeTruthy();
    expect(
      isTwitterLink(
        makeTwitterNode(
          'https://mobile.twitter.com/samstein/status/1296190425204752389'
        )
      )
    ).toBeTruthy();
  });

  it('should return the tweet ID from a url', () => {
    expect(
      getTweetId('https://twitter.com/CDCofBC/status/1294355681076826113?s=20')
    ).toEqual('1294355681076826113');
    expect(
      getTweetId(
        'https://twitter.com/297_ArubaLover/status/1298015402837118987?s=19'
      )
    ).toEqual('1298015402837118987');
  });

  it('should return a twitter embed element', () => {
    const input = {
      tagName: 'a',
      rawAttrs:
        'href="https://twitter.com/CDCofBC/status/1294355681076826113?s=20"',
      childNodes: [],
      text: 'https://twitter.com/CDCofBC/status/1294355681076826113?s=20',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key' }, [
      React.createElement(
        'a',
        {
          href: 'https://twitter.com/CDCofBC/status/1294355681076826113?s=20',
        },
        'https://twitter.com/CDCofBC/status/1294355681076826113?s=20'
      ),
      React.createElement(TwitterTweetEmbed, {
        tweetId: '1294355681076826113',
      }),
    ]);
    expect(getTwitterEmbed(input, 'key')).toEqual(expected);
  });

  it('should return whether a URL is a youtube link', () => {
    const makeNode = (url: string) => {
      return {
        tagName: 'a',
        rawAttrs: `href="${url}"`,
        childNodes: [],
        text: url,
        rawText: '',
        nodeType: NodeType.ELEMENT_NODE,
        classNames: [],
      };
    };
    expect(isYoutubeLink(makeNode('https://youtube.com/watch'))).toBeTruthy();
    expect(
      isYoutubeLink(makeNode('https://www.youtube.com/watch'))
    ).toBeTruthy();
    expect(isYoutubeLink(makeNode('https://m.youtube.com/watch'))).toBeTruthy();
    expect(isYoutubeLink(makeNode('https://youtu.be/skjh39fa'))).toBeTruthy();
    expect(isYoutubeLink(makeNode('http://youtube.com/something'))).toBeFalsy();
    expect(isYoutubeLink(makeNode('http://www.google.com'))).toBeFalsy();
  });

  it('should return the embed for a youtube video', () => {
    const input = {
      tagName: 'a',
      rawAttrs: `href="https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342"`,
      childNodes: [],
      text:
        'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key' }, [
      React.createElement(
        'a',
        {
          href:
            'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342',
        },
        'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342'
      ),
      React.createElement('iframe', {
        src: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        width: '560',
        height: '315',
        frameBorder: '0',
        allow: 'encrypted-media; gyroscope; picture-in-picture',
        allowFullScreen: true,
        className: 'embedded-youtube',
      }),
    ]);
    const result = getYoutubeEmbed(input, 'key');
    expect(result).toEqual(expected);
  });

  it('should return the embed for a youtube video with a shortened url', () => {
    const input = {
      tagName: 'a',
      rawAttrs: `href="https://youtu.be/JGwWNGJdvx8"`,
      childNodes: [],
      text: 'https://youtu.be/JGwWNGJdvx8',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key' }, [
      React.createElement(
        'a',
        {
          href: 'https://youtu.be/JGwWNGJdvx8',
        },
        'https://youtu.be/JGwWNGJdvx8'
      ),
      React.createElement('iframe', {
        src: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        width: '560',
        height: '315',
        frameBorder: '0',
        allow: 'encrypted-media; gyroscope; picture-in-picture',
        allowFullScreen: true,
        className: 'embedded-youtube',
      }),
    ]);
    const result = getYoutubeEmbed(input, 'key');
    expect(result).toEqual(expected);
  });

  it('should return the right embed for a video', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.mp4"',
      childNodes: [],
      text: 'http://chattypics.com/image.mp4',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key_1' }, [
      React.createElement(
        'a',
        { href: 'http://chattypics.com/image.mp4' },
        'http://chattypics.com/image.mp4'
      ),
      React.createElement(
        'video',
        {
          className: `embedded-mp4`,
          controls: true,
        },
        React.createElement('source', {
          src: 'http://chattypics.com/image.mp4',
          type: `video/mp4`,
        })
      ),
    ]);
    const result = getEmbedFor(input, new ElementKeyIndexer('key'), {
      video: true,
    });
    expect(result).toStrictEqual(expected);
  });

  it('should not return an embed for a video if video embeds are turned off', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.mp4"',
      childNodes: [],
      text: 'http://chattypics.com/image.mp4',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const result = getEmbedFor(input, new ElementKeyIndexer('key'), {
      video: false,
    });
    expect(result).toBeUndefined();
  });

  it('should return the right embed for an image', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.jpg"',
      childNodes: [],
      text: 'http://chattypics.com/image.jpg',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key_1' }, [
      React.createElement(
        'a',
        { href: 'http://chattypics.com/image.jpg' },
        'http://chattypics.com/image.jpg'
      ),
      React.createElement('img', {
        src: 'http://chattypics.com/image.jpg',
        className: 'embedded-image',
      }),
    ]);
    const result = getEmbedFor(input, new ElementKeyIndexer('key'), {
      images: true,
    });
    expect(result).toEqual(expected);
  });

  it('should not return the embed for an image if image embeds are turned off', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="http://chattypics.com/image.jpg"',
      childNodes: [],
      text: 'http://chattypics.com/image.jpg',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const result = getEmbedFor(input, new ElementKeyIndexer('key'), {
      images: false,
    });
    expect(result).toBeUndefined();
  });

  it('should return the right embed for a youtube video', () => {
    const input = {
      tagName: 'a',
      rawAttrs: `href="https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342"`,
      childNodes: [],
      text:
        'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key_1' }, [
      React.createElement(
        'a',
        {
          href:
            'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342',
        },
        'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342'
      ),
      React.createElement('iframe', {
        src: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        width: '560',
        height: '315',
        frameBorder: '0',
        allow: 'encrypted-media; gyroscope; picture-in-picture',
        allowFullScreen: true,
        className: 'embedded-youtube',
      }),
    ]);
    const result = getEmbedFor(input, new ElementKeyIndexer('key'), {
      youtube: true,
    });
    expect(result).toEqual(expected);
  });

  it('should not return the embed for a youtube video if youtube embeds are turned off', () => {
    const input = {
      tagName: 'a',
      rawAttrs: `href="https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342"`,
      childNodes: [],
      text:
        'https://www.youtube.com/watch?v=JGwWNGJdvx8&some_other_stuff=2342342',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const result = getEmbedFor(input, new ElementKeyIndexer('key'), {
      youtube: false,
    });
    expect(result).toBeUndefined();
  });

  it('should return the right embed for a twitter link', () => {
    const input = {
      tagName: 'a',
      rawAttrs:
        'href="https://twitter.com/CDCofBC/status/1294355681076826113?s=20"',
      childNodes: [],
      text: 'https://twitter.com/CDCofBC/status/1294355681076826113?s=20',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement('div', { key: 'key_1' }, [
      React.createElement(
        'a',
        {
          href: 'https://twitter.com/CDCofBC/status/1294355681076826113?s=20',
        },
        'https://twitter.com/CDCofBC/status/1294355681076826113?s=20'
      ),
      React.createElement(TwitterTweetEmbed, {
        tweetId: '1294355681076826113',
      }),
    ]);
    expect(
      getEmbedFor(input, new ElementKeyIndexer('key'), { twitter: true })
    ).toEqual(expected);
  });

  it('should not return a twitter embed if twitter embeds are off', () => {
    const input = {
      tagName: 'a',
      rawAttrs:
        'href="https://twitter.com/CDCofBC/status/1294355681076826113?s=20"',
      childNodes: [],
      text: 'https://twitter.com/CDCofBC/status/1294355681076826113?s=20',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    expect(
      getEmbedFor(input, new ElementKeyIndexer('key1'), { twitter: false })
    ).toBeUndefined();
  });

  it('should return the right embed for a shacknews chatty thread link', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="https://www.shacknews.com/chatty?id=1234567#item_123"',
      childNodes: [],
      text: 'https://www.shacknews.com/chatty?id=1234567#item_123',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const mockCallback = jest.fn();
    const expected = React.createElement(
      ChattyThreadLink,
      {
        threadId: 1234567,
        postId: 123,
        onChattyThreadClicked: mockCallback,
        key: 'key_1',
      },
      'https://www.shacknews.com/chatty?id=1234567#item_123'
    );

    expect(
      getEmbedFor(input, new ElementKeyIndexer('key'), {}, mockCallback)
    ).toEqual(expected);
  });

  it('should return the right embed for a shacknews article', () => {
    const input = {
      tagName: 'a',
      rawAttrs: 'href="/article/119930/nhl-21-preview-dirty-dangles"',
      childNodes: [],
      text: 'Some text',
      rawText: '',
      nodeType: NodeType.ELEMENT_NODE,
      classNames: [],
    };
    const expected = React.createElement(
      'a',
      {
        href:
          'https://www.shacknews.com/article/119930/nhl-21-preview-dirty-dangles',
        key: 'key_1',
      },
      'Some text'
    );

    expect(getEmbedFor(input, new ElementKeyIndexer('key'))).toEqual(expected);
  });

  it('should correctly build a post ready for display that contains a <3', () => {
    const input = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      depth: 0,
      body: 'Text goes here<br><span class="jt_red" key="arg"><3</span>',
      lols: [],
    };
    const expected = React.createElement('div', { key: 'randomkey_1' }, [
      React.createElement('span', { key: 'randomkey_2' }, 'Text goes here'),
      React.createElement('br', { key: 'randomkey_5' }),
      React.createElement(
        'span',
        {
          className: 'jt_red',
          key: 'randomkey_3',
        },
        [React.createElement('span', { key: 'randomkey_4' }, '<3')]
      ),
    ]);

    const wrapper = shallow(expected);
    const result = postForDisplay(input);
    expect(wrapper.equals(result)).toBeTruthy();
  });

  it('should correctly build a post ready for display that contains a &lt; and &gt;', () => {
    const input = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      depth: 0,
      body:
        'Text goes here<br><span class="jt_red" key="arg">&lt;3 and &gt;3</span>',
      lols: [],
    };
    const expected = React.createElement('div', { key: 'randomkey_1' }, [
      React.createElement('span', { key: 'randomkey_2' }, 'Text goes here'),
      React.createElement('br', { key: 'randomkey_5' }),
      React.createElement(
        'span',
        {
          className: 'jt_red',
          key: 'randomkey_3',
        },
        [React.createElement('span', { key: 'randomkey_4' }, '<3 and >3')]
      ),
    ]);

    const wrapper = shallow(expected);
    const result = postForDisplay(input);
    expect(wrapper.equals(result)).toBeTruthy();
  });

  it('should build a post ready for display with a spoiler', () => {
    const input = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      depth: 0,
      body:
        '<a href="http://www.google.com">Google link<span class="jt_spoiler">this is spoiled</span></a><span class="jt_spoiler">this is spoiled too</span>',
      lols: [],
    };
    const expected = React.createElement('div', { key: 'randomkey_1' }, [
      React.createElement(
        'a',
        { href: 'http://www.google.com', key: 'randomkey_2' },
        [
          React.createElement('span', { key: 'randomkey_3' }, 'Google link'),
          React.createElement(Spoiler, { key: 'randomkey_5' }, [
            React.createElement(
              'span',
              { key: 'randomkey_6' },
              'this is spoiled'
            ),
          ]),
        ]
      ),
      React.createElement(Spoiler, { key: 'randomkey_5' }, [
        React.createElement(
          'span',
          { key: 'randomkey_6' },
          'this is spoiled too'
        ),
      ]),
    ]);

    const wrapper = shallow(expected);
    const result = postForDisplay(input, { twitter: true });
    expect(wrapper.equals(result)).toBeTruthy();
  });

  it('should build a post ready for display with an image', () => {
    const input = {
      id: 39791857,
      threadId: 39790577,
      parentId: 39790577,
      author: 'gmoney',
      category: 'ontopic',
      date: '2020-07-18T09:53:00Z',
      depth: 0,
      body:
        'It showed up as Latest Chatty for me during the update, and the product page still calls it that:<br /><br /><a href="https://chattypics.com/files/clipboard_7ifwrz0724.png">https://chattypics.com/files/clipboard_7ifwrz0724.png</a><br />',
      lols: [],
    };
    const expected = React.createElement('div', { key: 'randomkey_1' }, [
      React.createElement(
        'span',
        { key: 'randomkey_2' },
        'It showed up as Latest Chatty for me during the update, and the product page still calls it that:'
      ),
      React.createElement('br', { key: 'randomkey_3' }),
      React.createElement('br', { key: 'randomkey_4' }),
      React.createElement('div', { key: 'randomkey_5' }, [
        React.createElement(
          'a',
          { href: 'https://chattypics.com/files/clipboard_7ifwrz0724.png' },
          'https://chattypics.com/files/clipboard_7ifwrz0724.png'
        ),
        React.createElement('img', {
          src: 'https://chattypics.com/files/clipboard_7ifwrz0724.png',
          className: 'embedded-image',
        }),
      ]),
      React.createElement('br', { key: 'randomkey_6' }),
    ]);

    const wrapper = shallow(expected);
    const result = postForDisplay(input, { images: true });
    expect(wrapper.equals(result)).toBeTruthy();
  });
});
