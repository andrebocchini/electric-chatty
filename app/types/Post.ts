import LOL from './LOL';

export default interface Post {
  id: number;
  threadId: number;
  parentId: number;
  author: string;
  category: string;
  date: string;
  body: string;
  lols: LOL[];
  depth?: number;
}
