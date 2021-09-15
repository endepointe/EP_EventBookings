import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  packages: [],
  status: 'idle',
  error: null,
};

/*
https://redux.js.org/tutorials/essentials/part-5-async-logic
*/

const eventPackageSlice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    populateEventPackages(state,action) {
      state.eventPackages.push(action.payload);
    }
  }
});

export const {populateEventPackages} = eventPackageSlice.actions;
export default eventPackageSlice.reducer;
export const getEventPackages = state => state.packages.packages;