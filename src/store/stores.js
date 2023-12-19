import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import { authReducer } from "./slices/authSlice";
import storage from "./customStorage";
import { createFilter } from "redux-persist-transform-filter";
import { packageReducer } from "./slices/packageSlice";
import { itineraryReducer } from "./slices/itinerarySlice";

const saveUserLoginSubsetFilter = createFilter("authReducer", ["jid"]);

const authPersistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["isAuth", "jid","mobile_number","role","username"],
};


const packagePersistConfig = {
  key: "package",
  storage: storage,
  whitelist: [
  "packageName",
  "packageStartingPrice",
  "noOfDays",
  "noOfCities",
  "keyHighlights",
  "tourDetails",
  "itineary",
  "tourInfo",
  "tourIncludes",
  "bannerImage",
  "destinations",
  "travellers",
  "rooms",
  "tourIncludes",
  "change",
  'destinations',
  "pricing",
  "status",
  "isEditing"
],
};

const itinearyPersistConfig = {
key:"itinerary",
storage:storage,
whitelist:[
  "itinerary"
]
}

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  package: persistReducer(packagePersistConfig,packageReducer),
  itinerary: persistReducer(itinearyPersistConfig,itineraryReducer)
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;