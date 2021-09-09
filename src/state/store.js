import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import eventListReducer from './eventListSlice';
import eventPackageReducer from './eventPackageSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    events: eventListReducer,
    package: eventPackageReducer,
  },
});