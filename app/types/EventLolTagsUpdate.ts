export default interface EventLolTagsUpdate {
  updates: {
    postId: number;
    tag: string;
    count: number;
  }[];
}
