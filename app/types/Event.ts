import EventCategoryChange from './EventCategoryChange';
import EventLolTagsUpdate from './EventLolTagsUpdate';
import EventNewPost from './EventNewPost';

export default interface Event {
  eventId: number;
  eventDate: string;
  eventType: string;
  eventData: EventCategoryChange | EventLolTagsUpdate | EventNewPost;
}
