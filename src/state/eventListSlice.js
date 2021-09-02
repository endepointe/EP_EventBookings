import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {client} from '../api/client';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
};

/*
https://redux.js.org/tutorials/essentials/part-5-async-logic
*/

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const data = await client.get(`${process.env.EXPRESS_API_HOST}/eventbrite/read`);
  console.log(data);
  return data;
});
    
const eventListSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    // populate: {
    //   reducer(state, action) {
    //     console.log(action.payload);
    //     state.events.push(action.payload);
    //   },
    //   prepare(id,name,capacity,description,summary,logo,venue_id,start,end,status,inventory_type) {
    //     return {
    //       payload: {
    //         id, 
    //         name, 
    //         capacity, 
    //         description, 
    //         summary, 
    //         logo, 
    //         venue_id, 
    //         start, 
    //         end,
    //         status, 
    //         inventory_type
    //       }
    //     }
    //   }
    // }
    populate(state,action) {
      // console.log(action.payload); 
      state.events.push(action.payload);
    }
  }
});

export const {populate} = eventListSlice.actions;
export default eventListSlice.reducer;
export const getAllEvents = state => state.events.events