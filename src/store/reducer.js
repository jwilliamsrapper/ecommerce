import { combineReducers } from 'redux';

var INITIAL_STATE = {
  current: [],
};

const productReducer = (state = INITIAL_STATE, action) => {
  let products = {};
  switch (action.type) {
      case 'ADD_PRODUCT': 
      var {current} = state;
      current.push(action.payload);
      const newState = {current};
      // console.log('new state====>',newState)
      return newState;
      case 'DELETE_PRODUCT':
      // current.length = 0;
      state.current.length = 0;
      return state;
    default:
      return state
  }
};

export default combineReducers({
  products: productReducer,
});