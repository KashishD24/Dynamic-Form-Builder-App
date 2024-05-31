import { configureStore, createReducer } from "@reduxjs/toolkit";
import { useReducer } from "react";
import { createStoreHook } from "react-redux";
import authReducer from "./authSlice"
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import usersReducer from "./usersSlice"

const persistConfig = {
  key: 'root',
  version:1,
  storage,
};

const rootReducer = combineReducers({
  authData: authReducer,
  usersData: usersReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
 reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
               immutableCheck: false,
               serializableCheck: false,
          })
}
)


export default store