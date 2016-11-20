import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';


import { CURRENTSTREAM_SUB,
         CURRENTSTREAM_SUBSCRIPTION_READY,
         CURRENTSTREAM_SUBSCRIPTION_CHANGED } from '../actions/current-stream';

const initialState = {
  ready: false,
  data: {},
  currentStreamSubscriptionStopped: false,
};

export const currentStream = (state = initialState, action) => {
  // console.log('Reducer: ', action)
  switch (action.type) {
    case CURRENTSTREAM_SUBSCRIPTION_READY:
      return Object.assign({}, state, { ready: action.payload.ready });
    case CURRENTSTREAM_SUBSCRIPTION_CHANGED: {
      return Object.assign({}, state,
        {
          data: action.payload,
        });
    }
    case STOP_SUBSCRIPTION:
      return action.payload === CURRENTSTREAM_SUB
        ? Object.assign({}, state, { currentStreamSubscriptionStopped: true })
        : state;
    default:
      return state;
  }
};

export default currentStream;

// // Selector
// export const getAllStreams = (state) => {
//   if (state.streams.allIds.length !== 0) { // data is loaded from Mongo
//     return state.streams.allIds.map(idx => state.streams.byId[idx]);
//   }
//   return [];
// };
