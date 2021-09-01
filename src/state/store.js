import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import eventListReducer from './eventListSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    events: eventListReducer,
  },
});