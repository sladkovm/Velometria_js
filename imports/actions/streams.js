import { normalize } from 'normalizr';
import * as schema from './schema';


export const FETCH_STREAMS_REQUEST = 'FETCH_STREAMS_REQUEST';
export const FETCH_STREAMS_SUCCESS = 'FETCH_STREAMS_SUCCESS';
export const FETCH_STREAMS_ERROR = 'FETCH_STREAMS_ERROR';

export const fetchStreamsRequest = () => ({
  type: FETCH_STREAMS_REQUEST,
});

export const fetchStreamsSuccess = (streams = []) => ({
  type: FETCH_STREAMS_SUCCESS,
  payload: normalize(streams, schema.arrayOfStreams),
});

export const fetchStreamsError = () => ({
  type: FETCH_STREAMS_ERROR,
  payload: new Error(),
  error: true,
});
