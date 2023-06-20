import { configureStore, combineReducers,createSelector } from '@reduxjs/toolkit';
import { tagsSlice } from './slices/tagsSlice';
import { userSlice } from './slices/userSlice';
import { tasksSlice } from './slices/tasksSlice';
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

// Export actions

// Selectors
export const selectTags = (state: RootState) => state.tags;
export const selectTasks = (state: RootState) => state.tasks;
export const selectTagById = (tagId : number | string) => createSelector(selectTags, (tags) => tags.find(tag => tag.id == tagId))
export const selectTasksByTagId = (tagId: number | string) => createSelector(
  selectTasks,
  (tasks) => {
    switch (tagId) {
      case 'completed': return tasks.filter((task) => task.completed);
      case 'important': return tasks.filter((task) => task.important);
      case 'myday': return tasks.filter((task) => task.dueDate? isToday(task.dueDate) : false);
      case 'all': return tasks;
      default: return tasks.filter((task) => task.tagId == tagId);
    }
  }
);

export const selectNonFavoriteTags = createSelector(selectTags, (tags) => tags.filter((tag) => !favoriteTagsIds.includes(tag.id))) 
  
// RootState type
export type RootState = ReturnType<typeof store.getState>;