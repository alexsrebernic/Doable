import { configureStore, combineReducers,createSelector } from '@reduxjs/toolkit';
import { tagsSlice } from './slices/tagsSlice';
import { userSlice } from './slices/userSlice';
import { tasksSlice } from './slices/tasksSlice';
import {componentSlice} from './slices/componentsSlice'

import { favoriteTagsIds } from '../helper/favoriteTag';
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore } from 'redux-persist';
import { isToday } from 'date-fns';
// Combine all slices
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['register']
};
const rootReducer = combineReducers({
  user: userSlice.reducer,
  tasks: tasksSlice.reducer,
  tags: tagsSlice.reducer,
  component: componentSlice.reducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
// Create the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: false, // Disable the serializable state check
    }),
    // logger,
  ],
});
const persistor = persistStore(store);

export  {store, persistor};

// RootState type
export type RootState = ReturnType<typeof store.getState>;