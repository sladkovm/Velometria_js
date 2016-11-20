import { combineReducers } from 'redux';
import activities from './activities';
import currentStream from './current-stream';
import page from './page';


const rootReducer = combineReducers({
  activities,
  currentStream,
  page,
});

export default rootReducer;
