import { createSlice } from "@reduxjs/toolkit";



const initialState = {
  isAuth: false,
  jid: "",
  username:"",
  role:"",
  mobile_number:""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
        console.log(action.payload,"Payload")
      state.isAuth = action.payload;
    },
    setJid: (state, action) => {
      state.jid = action.payload;
    },
    setRole: (state,action) =>{
      state.role = action.payload
    },
    setusername: (state,action) =>{
      state.username = action.payload
    },
    setMobileNumber: (state,action) =>{
      state.mobile_number = action.payload
    }

  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setJid, setMobileNumber, setRole, setusername } = authSlice.actions;

export const authReducer = authSlice.reducer;