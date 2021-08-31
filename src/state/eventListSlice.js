import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 12345,
    name: 'EP Test Event', 
    capacity: 1337, 
    description: '', 
    summary: 'A test event for Redux store', 
    logo: '', 
    venue_id: '67890', 
    start: {timezone: '', local: '', utc: ''}, 
    end:  {timezone: '', local: '', utc: ''}, 
    status: '', 
    inventory_type: 'limited', 
  }
];

export const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    populate: (state, action) => {
      state.push(action.payload);
    },
  }
});

const fetchEventbriteData = () => {
  return async (dispatch, getState) => {
    try {
      let data = await fetch(`${process.env.EXPRESS_API_HOST}/eventbrite/read`);
      let events = await data.json();
      console.log(events);
      // dispatch(eventsLoaded(events));
    } catch (err) {
      console.error(err); 
    }
  }
}

export const {populate} = eventListSlice.actions;

export default eventListSlice.reducer;