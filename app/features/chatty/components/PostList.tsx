import React, { useRef } from 'react';
import Post from '../../../types/Post';
import Thread from '../../../types/Thread';
import CompactPost from './CompactPost';
import ExpandedPost from './ExpandedPost';
import EmbedPreferences from '../../../types/EmbedPreferences';

const INDENT_STEP = 20;
const NO_INDENT = 0;

type Props = {
  className?: string;
  embedPreferences?: EmbedPreferences;
  id?: string;
  isComposingReply?: boolean;
  isLoggedIn?: boolean;
  isPostingReply?: boolean;
  loggedInUser?: string;
  onChattyThreadClicked?: (threadId: number, postId?: number) => void;
  onCommentReplyBeginComposing?: () => void;
  onCommentReplyCancelComposing?: () => void;
  onCommentReplyPost?: (post: Post, reply: string) => void;
  onDismissCommentReplyError?: () => void;
  onSelectPost?: (post: Post) => void;
  onTagClicked?: (post: Post, tag: string) => void;
  postingReplyError?: string;
  selectedPost?: Post;
  thread: Thread;
};

export default function PostList(props: Props) {
  const expandedPost = useRef<HTMLDivElement>(null);
  const {
    className,
    embedPreferences,
    id,
    isComposingReply,
    isLoggedIn,
    isPostingReply,
    loggedInUser,
    onChattyThreadClicked,
    onCommentReplyBeginComposing,
    onCommentReplyCancelComposing,
    onCommentReplyPost,
    onDismissCommentReplyError,
    onSelectPost,
    onTagClicked,
    postingReplyError,
    selectedPost,
    thread,
  } = props;

  return (
    <div className={className} id={id}>
      {thread.posts.map((post) => {
        const highlighted = post.id === selectedPost?.id;
        const indented = {
          marginLeft: post.depth ? post.depth * INDENT_STEP : NO_INDENT,
        };

        if (highlighted) {
          return (
            <div
              key={`compact_post_${post.id}`}
              style={indented}
              ref={expandedPost}
            >
              <ExpandedPost
                embedPreferences={embedPreferences}
                id={`expanded_post_${post.id}`}
                isComposingReply={isComposingReply}
                isPostingReply={isPostingReply}
                isLoggedIn={isLoggedIn}
                loggedInUser={loggedInUser}
                onChattyThreadClicked={onChattyThreadClicked}
                onCancelButtonClicked={onCommentReplyCancelComposing}
                onDimissErrorButtonClicked={onDismissCommentReplyError}
                onPostButtonClicked={onCommentReplyPost}
                onReplyButtonClicked={onCommentReplyBeginComposing}
                onTagClicked={onTagClicked}
                post={post}
                postingError={postingReplyError}
              />
            </div>
          );
        }

        return (
          <div key={post.id} style={indented}>
            <CompactPost
              post={post}
              isOriginalPoster={post.author === thread.root.author}
              loggedInUser={loggedInUser}
              onClick={onSelectPost}
            />
          </div>
        );
      })}
    </div>
  );
}
