import { combineReducers } from 'redux';
import activities from './activities';
import streams from './streams';


const rootReducer = combineReducers({
  activities,
  streams,
});

export default rootReducer;
