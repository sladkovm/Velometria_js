import { Mongo } from 'meteor/mongo';

export const Streams = new Mongo.Collection('streams');

Streams.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});
