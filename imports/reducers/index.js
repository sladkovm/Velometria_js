import { combineReducers } from 'redux';
import activities from './activities';
import streams from './streams';
import page from './page';


const rootReducer = combineReducers({
  activities,
  streams,
  page,
});

export default rootReducer;
