import { ObjectId } from "mongodb";

interface Start {
  localDate: string;
}

interface Date {
  start: Start;
}

interface State {
  stateCode: string;
}

interface City {
  name: string;
}

interface Venue {
  city: City;
  state: State;
}

interface Image {
  url: string;
}

interface Event {
  name: string;
  id: string;
  images: Image[];
  _embedded: Venue[];
  dates: Date;
}

export default interface Favorite {
  _id: ObjectId;
  event: Event;
  userId?: ObjectId;
}
