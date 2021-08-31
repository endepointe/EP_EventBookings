import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

/*
https://redux.js.org/tutorials/essentials/part-5-async-logic
*/

export const fetchEvents = createAsyncThunk ('eventList/populate', async () => {
  let data = await fetch(`${process.env.EXPRESS_API_HOST}/eventbrite/read`);
  let events = await data.json();
  console.log(events);
  return events;
});
    
const eventListSlice = createSlice({
  name: 'eventList',
  initialState,
  reducers: {
    populate: {
      reducer(state, action) {
        state.events.push(action.payload);
      },
      prepare(id,name,capacity,description,summary,logo,venue_id,start,end,status,inventory_type) {
        // 
      }
    }
  }
});

export const getAllEvents = state => state.eventList.events

export const {populate} = eventListSlice.actions;
export default eventListSlice.reducer;
