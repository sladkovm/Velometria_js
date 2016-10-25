import { normalize } from 'normalizr';
import * as schema from './schema';

export const RECEIVE_STREAMS = 'RECEIVE_STREAMS';

const receiveStreams = (streams) => {
  console.log(normalize(streams, schema.arrayOfStreams));
  return ({
    type: RECEIVE_STREAMS,
    response: normalize(streams, schema.arrayOfStreams),
  });
};

export default receiveStreams;
