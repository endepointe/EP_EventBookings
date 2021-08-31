import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

/*
https://redux.js.org/tutorials/essentials/part-5-async-logic
*/

export const fetchEvents = createAsyncThunk ('events/fetchEvents', async () => {
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
      extraReducers(builder) {
        builder
          .addCase(fetchEvents.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(fetchEvents.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.posts = state.posts.concat(action.payload)
          })
          .addCase(fetchEvents.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
          })
      },
      prepare(id,name,capacity,description,summary,logo,venue_id,start,end,status,inventory_type) {
        // 
      }
    }
  }
});

export const {populate} = eventListSlice.actions;
export default eventListSlice.reducer;
export const getAllEvents = state => state.eventList.events