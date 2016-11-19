import { combineReducers } from 'redux';

import { SET_CURRENT_PAGE } from '../actions/page';

export const currentPage = (state = 0, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE:
      return action.payload;
    default:
      return state;
  }
};


const page = combineReducers({ currentPage });

export default page;
