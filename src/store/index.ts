import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { tagsSlice } from './slices/tagsSlice';
import { userSlice } from './slices/userSlice';
import { tasksSlice } from './slices/tasksSlice';

// Combine all slices
const rootReducer = combineReducers({
  tags: tagsSlice.reducer,
  user: userSlice.reducer,
  tasks: tasksSlice.reducer,
});

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

export default store;

// Export actions
export const { addTag, updateTag, removeTag, setTags } = tagsSlice.actions;
export const { setUser, clearUser, getCurrentUser } = userSlice.actions;
export const { addTask, updateTask, removeTask, setTasks } = tasksSlice.actions;

// Selectors
export const selectTags = (state: RootState) => state.tags;
export const selectTasksByTagId = (tagId: number) => (state: RootState) => state.tasks.filter((task) => task.tagId === tagId);
export const selectCompletedTasks = (state: RootState) => state.tasks.filter((task) => task.completed);
export const selectFavoriteTasks = (state: RootState) => state.tasks.filter((task) => task.favorite);
  
// RootState type
export type RootState = ReturnType<typeof store.getState>;