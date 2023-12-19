"use client"
import { Provider } from "react-redux";
import { store } from "./stores";
import { persistStore } from "redux-persist";

persistStore(store); // persist the store

export default function Providers({
  children,
}) {
  return <Provider store={store}>{children}</Provider>;
}