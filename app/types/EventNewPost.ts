import Post from './Post';

export default interface EventNewPost {
  postId: number;
  post: Post;
  parentAuthor: string;
}
