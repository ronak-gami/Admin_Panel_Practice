import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authSlice } from "./slices/auth.slice";
import { dataSlice } from "./slices/data.slice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  data: dataSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
