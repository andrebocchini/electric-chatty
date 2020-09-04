import Event from './Event';

export default interface WaitForEventResponse {
  lastEventId: number;
  events: Event[];
  tooManyEvents: boolean;
}
