import Thread from './Thread';
import Post from './Post';
import SingleThreadNavigationEntry from './SingleThreadNavigationEntry';

export default interface ChattyState {
  commentReplyError?: string;
  fetchEventsError?: string;
  fetchThreadsError?: string;
  filter?: string;
  isComposingCommentReply: boolean;
  isComposingRootPost: boolean;
  isComposingRootReply: boolean;
  isFetchingEvents: boolean;
  isFetchingSelectedThread: boolean;
  isFetchingSingleThread: boolean;
  isFetchingThreads: boolean;
  isPostingCommentReply: boolean;
  isPostingRootPost: boolean;
  isPostingRootReply: boolean;
  isTaggingPost: boolean;
  isUpdatedSinceLastSort: boolean;
  latestEventId?: number;
  numberOfNewThreadsSinceLastSort: number;
  mode: string;
  pinnedThreads: Thread[];
  rootPostError?: string;
  rootReplyError?: string;
  selectedThread?: Thread;
  selectedPost?: Post;
  singleThreadNavigationStack: SingleThreadNavigationEntry[];
  taggingPostError?: string;
  threads: Thread[];
}
