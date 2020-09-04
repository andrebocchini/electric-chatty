import sanitize from 'sanitize-html';
import React from 'react';
import stripHtml from 'string-strip-html';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { parse, NodeType } from 'node-html-parser';
import EmbedPreferences from '../types/EmbedPreferences';
import Spoiler from '../components/Spoiler';
import Post from '../types/Post';
import ElementKeyIndexer from '../types/ElementKeyIndexer';
import ChattyThreadLink from '../features/chatty/components/ChattyThreadLink';
import CustomNode from '../types/CustomNode';

export const CHATTY_THREAD_LINK_TAG = 'chattythreadlink';

export function deSpoiler(text: string) {
  const OPEN_SPOILER_TAG =
    '<span class="jt_spoiler" onclick="this.className = \'\';">';
  const CLOSE_SPOILER_TAG = '</span>';

  let deSpoiledText = text;

  while (deSpoiledText.includes(OPEN_SPOILER_TAG)) {
    const start = deSpoiledText.indexOf(OPEN_SPOILER_TAG);
    const end = deSpoiledText.indexOf(CLOSE_SPOILER_TAG, start);

    let spoilerReplacement = '';
    for (let i = start + OPEN_SPOILER_TAG.length; i < end; i += 1) {
      spoilerReplacement += '_';
    }

    deSpoiledText = deSpoiledText.replace(
      deSpoiledText.substring(start, end + CLOSE_SPOILER_TAG.length),
      spoilerReplacement
    );
  }

  return deSpoiledText;
}

export function stripAllHtml(html: string) {
  return stripHtml(html, {
    stripTogetherWithTheirContents: [
      'script',
      'title',
      'head',
      'meta',
      'link',
      'xml',
      'iframe',
    ],
  });
}

export function sanitizePostBody(html: string) {
  return sanitize(html, {
    allowedTags: ['span', 'br', 'a', 'i', 'b'],
    allowedAttributes: {
      a: ['href', 'target'],
      br: [],
      i: [],
      b: [],
      span: [
        {
          name: 'onclick',
          multiple: false,
          values: ["this.className = '';"],
        },
        {
          name: 'class',
          multiple: false,
          values: [
            'jt_spoiler',
            'jt_red',
            'jt_green',
            'jt_pink',
            'jt_olive',
            'jt_fuchsia',
            'jt_yello',
            'jt_blue',
            'jt_lime',
            'jt_orange',
            'jt_italic',
            'jt_bold',
            'jt_underline',
            'jt_strike',
            'jt_sample',
            'jt_quote',
            'jt_spoile',
            'jt_spoiler_show',
            'jt_codesmall',
            'jt_code',
            'jt_code br',
          ],
        },
      ],
    },
  });
}

export function getAttributes(rawAttributes: string) {
  const individualAttributes = rawAttributes.replace(/"/g, '').split(' ');
  const finalAttributes: Record<string, string> = {};
  individualAttributes.forEach((attribute) => {
    const pieces = attribute.split('=');
    const [key, value] = pieces;
    if (key === 'class') {
      finalAttributes.className = value;
    } else {
      finalAttributes[key] = value;
    }
  }, finalAttributes);
  return finalAttributes;
}

export function getVideoType(url: string) {
  if (url.endsWith('.mp4')) return 'mp4';

  if (url.endsWith('.webm')) return 'webm';

  return undefined;
}

export function isSpoilered(node: CustomNode) {
  return (
    node.nodeType === NodeType.ELEMENT_NODE &&
    node.classNames.includes('jt_spoiler')
  );
}

export function getShacknewsChattyThreadId(url: string) {
  const matches = url.match('[0-9]+');
  if (matches && matches.length > 0) return matches[0];
  return undefined;
}

export function getShacknewsChattyThreadSelectedPostId(url: string) {
  const matches = url.match('item_[0-9]+');
  if (matches && matches.length > 0) {
    const results = matches[0].match('[0-9]+');
    if (results && results.length > 0) return results[0];
  }

  return undefined;
}

export function isShacknewsArticleLink(node: CustomNode) {
  const rawAttributes = node.rawAttrs;

  if (!rawAttributes) {
    return false;
  }

  const attributes = getAttributes(node.rawAttrs);
  if ('href' in attributes) {
    return attributes.href.startsWith('/article/');
  }
  return false;
}

export function getShacknewsArticleLink(url: string) {
  return `https://www.shacknews.com${url}`;
}

export function getShacknewsArticleEmbed(node: CustomNode, key: string) {
  const attributes = getAttributes(node.rawAttrs);
  if ('href' in attributes) {
    const link = getShacknewsArticleLink(attributes.href);
    return React.createElement('a', { href: link, key }, node.text);
  }
  return undefined;
}

export function isShacknewsChattyThreadLink(node: CustomNode) {
  return (
    node.text.startsWith('https://www.shacknews.com/chatty?id=') ||
    node.text.startsWith('http://www.shacknews.com/chatty?id=')
  );
}

export function getShacknewsChattyThreadEmbed(
  node: CustomNode,
  key: string,
  onChattyThreadClicked?: (threadId: number, postId?: number) => void
) {
  const threadId = getShacknewsChattyThreadId(node.text);
  const postId = getShacknewsChattyThreadSelectedPostId(node.text);

  if (threadId) {
    const attributes: { [attribute: string]: string | boolean } = postId
      ? { threadId, postId }
      : { threadId };

    return React.createElement(
      ChattyThreadLink,
      {
        threadId: parseInt(attributes.threadId as string, 10),
        postId: postId ? parseInt(attributes.postId as string, 10) : undefined,
        onChattyThreadClicked,
        key,
      },
      node.text
    );
  }

  return undefined;
}

export function isImageLink(node: CustomNode) {
  return (
    node.nodeType === NodeType.ELEMENT_NODE &&
    node.tagName === 'a' &&
    (node.text.toLowerCase().endsWith('.gif') ||
      node.text.toLowerCase().endsWith('.jpg') ||
      node.text.toLowerCase().endsWith('.jpeg') ||
      node.text.toLowerCase().endsWith('.png'))
  );
}

export function getImageEmbed(
  node: CustomNode,
  key: string
): React.ReactElement | undefined {
  const url = node.text;
  return React.createElement('div', { key }, [
    React.createElement('a', { href: url }, url),
    React.createElement('img', {
      src: node.text,
      className: 'embedded-image',
    }),
  ]);
}

export function isVideoLink(node: CustomNode) {
  return (
    node.nodeType === NodeType.ELEMENT_NODE &&
    node.tagName === 'a' &&
    (node.text.endsWith('.mp4') || node.text.endsWith('.webm'))
  );
}

export function getVideoEmbed(
  node: CustomNode,
  key: string
): React.ReactElement | undefined {
  const type = getVideoType(node.text);
  if (!type) return undefined;
  const url = node.text;

  return React.createElement('div', { key }, [
    React.createElement('a', { href: url }, url),
    React.createElement(
      'video',
      {
        className: `embedded-${type}`,
        controls: true,
      },
      React.createElement('source', { src: url, type: `video/${type}` })
    ),
  ]);
}

export function isTwitterLink(node: CustomNode) {
  if (node.nodeType !== NodeType.ELEMENT_NODE || node.tagName !== 'a') {
    return false;
  }

  return (
    node.text.startsWith('https://twitter.com') ||
    node.text.startsWith('https://www.twitter.com') ||
    node.text.startsWith('https://mobile.twitter.com')
  );
}

export function getTweetId(url: string) {
  const split = url.split('/status/');

  if (split.length <= 1) return undefined;

  const matches = split[1].match('[0-9]+');
  if (matches && matches.length > 0) return matches[0];
  return undefined;
}

export function getTwitterEmbed(node: CustomNode, key: string) {
  const url = node.text;
  const tweetId = getTweetId(url);

  return React.createElement('div', { key }, [
    React.createElement(
      'a',
      {
        href: url,
      },
      url
    ),
    React.createElement(TwitterTweetEmbed, {
      tweetId: tweetId as string,
    }),
  ]);
}

export function isYoutubeLink(node: CustomNode) {
  return (
    node.nodeType === NodeType.ELEMENT_NODE &&
    node.tagName === 'a' &&
    (node.text.startsWith('https://www.youtube.com/watch') ||
      node.text.startsWith('https://youtube.com/watch') ||
      node.text.startsWith('https://m.youtube.com/watch') ||
      node.text.startsWith('https://youtu.be/'))
  );
}

export function getYoutubeEmbed(
  node: CustomNode,
  key: string
): React.ReactElement | undefined {
  let embeddedUrl;
  const url = node.text;

  if (url.startsWith('https://www.youtube.com/watch?v=')) {
    const parts = url.split('v=');
    if (parts.length >= 2) {
      const finalParts = parts[1].split('&');
      if (finalParts.length > 0) {
        embeddedUrl = `https://www.youtube.com/embed/${finalParts[0]}`;
      }
    }
  } else if (url.startsWith('https://youtu.be/')) {
    const video = url.slice(17);
    embeddedUrl = `https://www.youtube.com/embed/${video}`;
  }

  if (embeddedUrl) {
    return React.createElement('div', { key }, [
      React.createElement(
        'a',
        {
          href: url,
        },
        url
      ),
      React.createElement('iframe', {
        src: embeddedUrl,
        width: '560',
        height: '315',
        frameBorder: '0',
        allow: 'encrypted-media; gyroscope; picture-in-picture',
        allowFullScreen: true,
        className: 'embedded-youtube',
      }),
    ]);
  }

  return undefined;
}

export function getEmbedFor(
  node: CustomNode,
  keyIndexer: ElementKeyIndexer,
  preferences?: EmbedPreferences,
  onChattyThreadClicked?: (threadId: number, postId?: number) => void
): React.ReactElement | undefined {
  if (isVideoLink(node) && preferences?.video) {
    return getVideoEmbed(node, keyIndexer.increment());
  }

  if (isImageLink(node) && preferences?.images) {
    return getImageEmbed(node, keyIndexer.increment());
  }

  if (isYoutubeLink(node) && preferences?.youtube) {
    return getYoutubeEmbed(node, keyIndexer.increment());
  }

  if (isTwitterLink(node) && preferences?.twitter) {
    return getTwitterEmbed(node, keyIndexer.increment());
  }

  if (isShacknewsChattyThreadLink(node)) {
    return getShacknewsChattyThreadEmbed(
      node,
      keyIndexer.increment(),
      onChattyThreadClicked
    );
  }

  if (isShacknewsArticleLink(node)) {
    return getShacknewsArticleEmbed(node, keyIndexer.increment());
  }

  return undefined;
}

function buildReactNodes(
  node: CustomNode,
  indexer: ElementKeyIndexer,
  preferences?: EmbedPreferences,
  onChattyThreadClicked?: (threadId: number, postId?: number) => void
): React.ReactElement {
  if (node.childNodes && node.childNodes.length > 0) {
    const childNodes: React.ReactNode[] = [];
    node.childNodes.forEach((child) => {
      const reactNode = buildReactNodes(
        child as CustomNode,
        indexer,
        preferences,
        onChattyThreadClicked
      );
      if (reactNode) {
        childNodes.push(reactNode);
      }
    }, childNodes);

    if (node.nodeType === NodeType.ELEMENT_NODE) {
      const attributes = getAttributes(node.rawAttrs);

      if (isSpoilered(node)) {
        return React.createElement(
          Spoiler,
          { key: indexer.increment() },
          childNodes
        );
      }

      const embed = getEmbedFor(
        node,
        indexer,
        preferences,
        onChattyThreadClicked
      );
      if (embed) return embed;

      return React.createElement(
        node.tagName,
        { ...attributes, key: indexer.increment() },
        childNodes
      );
    }
  }

  const embed = getEmbedFor(node, indexer, preferences);
  if (embed) return embed;

  if (node.nodeType === NodeType.ELEMENT_NODE && node.tagName === 'br') {
    return React.createElement('br', { key: indexer.increment() });
  }

  // Elements with just text as children
  return React.createElement('span', { key: indexer.increment() }, node.text);
}

export function postForDisplay(
  post: Post,
  preferences?: EmbedPreferences,
  onChattyThreadClicked?: (threadId: number, postId?: number) => void
): React.ReactElement {
  const keyIndexer = new ElementKeyIndexer(`${post.id}`);
  const root = parse(`'<div>${post.body}</div>`);
  return buildReactNodes(
    root.childNodes[1] as CustomNode,
    keyIndexer,
    preferences,
    onChattyThreadClicked
  );
}
