
import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    itinerary:[]
};

export const itinearySlice = createSlice({
  name: "itinerary",
  initialState,
  reducers: {
    setItineraryS: (state,action)=>{
        state.itinerary = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const {setItineraryS} = itinearySlice.actions;

export const itineraryReducer = itinearySlice.reducer;