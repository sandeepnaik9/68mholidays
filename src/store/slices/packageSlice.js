import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  packageName: "",
  packageStartingPrice:"",
  noOfDays:"",
  noOfCities:"",
  noOfNights:"",
  keyHighlights:[],
  tourDetails:[],
  itineary:[],
  tourInfo:[],
  tourIncludes:{},
  bannerImage:"",
  destinations:[],
  pricing:[],
  travellers:{"adults":0,kids:0,infants:0},
  tourIncludes:[],
  rooms:[{}],
  change:false,
  status:"",
  isEditing:false
};

export const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPackageName: (state, action) => {
      state.packageName = action.payload;
    },
    setPackageStartingPrice: (state, action) => {
      state.packageStartingPrice = action.payload;
    },
    setNofDays: (state,action)=>{
        state.noOfDays = action.payload
    },
    setNofCities: (state,action)=>{
        state.noOfCities = action.payload
    },
    setNofDays: (state,action)=>{
        state.noOfDays = action.payload
    },
    setIsEditing: (state,action)=>{
        state.isEditing = action.payload
    },
    setDestinationS: (state,action)=>{
      state.destinations = action.payload
    },
    setBannerImageS: (state,action)=>{
      state.bannerImage = action.payload
    },
    setTourIncludesS: (state,action)=>{
      state.tourIncludes = action.payload
    },
    setChange: (state,action)=>{
      state.change = action.payload
    },
    setPricingS: (state,action)=>{
      state.pricing= action.payload
    },
    setKeyHighlightS: (state,action)=>{
      state.keyHighlights = action.payload
    },
    setStatusS: (state,action)=>{
      state.status = action.payload
    }
  },
});

// Action creators are generated for each case reducer function
export const { setPackageName, setIsEditing, setNofCities, setNofDays,setPackageStartingPrice, setDestinationS,setBannerImageS, setTourIncludesS, setChange, setPricingS, setKeyHighlightS, setStatusS } = packageSlice.actions;

export const packageReducer = packageSlice.reducer;