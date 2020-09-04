import Thread from './Thread';
import Post from './Post';

export default interface SingleThreadNavigationEntry {
  thread: Thread;
  post?: Post;
}
