import Post from './Post';

export default interface GetChattyResponse {
  threads: Array<{
    threadId: number;
    posts: Post[];
  }>;
}
