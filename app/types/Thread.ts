import Post from './Post';

export default interface Thread {
  threadId: number;
  root: Post;
  posts: Post[];
}
