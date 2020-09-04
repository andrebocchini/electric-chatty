import React from 'react';

type Props = {
  onChattyThreadClicked?: (threadId: number, postId?: number) => void;
  postId?: number;
  threadId: number;
};

export default function ChattyThreadLink(props: Props) {
  const { onChattyThreadClicked, postId, threadId } = props;
  const url = postId
    ? `https://www.shacknews.com/chatty?id=${threadId}#item_${postId}`
    : `https://www.shacknews.com/chatty?id=${threadId}`;

  return (
    <a
      href={url}
      onClick={(e) => {
        if (onChattyThreadClicked) onChattyThreadClicked(threadId, postId);
        e.preventDefault();
      }}
    >
      {url}
    </a>
  );
}
