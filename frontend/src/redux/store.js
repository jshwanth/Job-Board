// store.js
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';  // Ensure you are importing the reducer, not the slice
import jobSlice from './jobSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice';
import companySlice from './companySlice';
import applicationSlice from './applicationSlice';
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  auth:authReducer,
  job:jobSlice,
  company:companySlice,
  application:applicationSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
