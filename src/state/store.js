import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';
import eventListReducer from './eventListSlice';
import eventPackageReducer from './eventPackageSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    events: eventListReducer,
    package: eventPackageReducer,
  },
});