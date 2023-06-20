import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Task from '../../types/Task/Task';
import axios from 'axios';
import { Tag } from '../../types/Tag/Tag';
import { fetchTasks as fetchTasksFromAPI } from '../../api/api';
import { addTask } from '..';
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId:number) => {
    const response = await fetchTasksFromAPI(userId);
    return response.data;
  });
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [] as Task[],
    reducers: {
      addTask: (state, action: PayloadAction<Task>) => {
        const task = action.payload;
        state.push(task);
      },
      updateTask: (state, action: PayloadAction<Task>) => {
        const updatedTask = action.payload;
        const taskIndex = state.findIndex((task) => task.id === updatedTask.id);
        if (taskIndex !== -1) {
          state[taskIndex] = updatedTask;
        }
      },
      removeTask: (state, action: PayloadAction<number>) => {
        const taskId = action.payload;
        const taskIndex = state.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          state.splice(taskIndex, 1);
        }
      },
      reorderTasks: (state, action: PayloadAction<{ tagId: number; taskIds: number[] }>) => {
        const { tagId, taskIds } = action.payload;
        const tag = state.find((tag) => tag.id === tagId);
        if (tag) {
          tag.tasks = taskIds;
        }
      },
      toggleImportant: (state, action) => {
        const taskId = action.payload;
        const task = state.find((task) => task.id === taskId);
        if (task) {
          task.important = !task.important; // Toggle the favorite status
        }
      },
      toggleCompleted: (state, action) => {
        const taskId = action.payload;
        const task = state.find((task) => task.id === taskId);
        if (task) {
          task.completed = !task.completed; // Toggle the favorite status
        }
      },
      setTasks: (state, action: PayloadAction<Task[]>) => {
          return action.payload
      },
      },
    extraReducers: (builder) => {
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
export const { addTask, updateTask, removeTask, setTasks, toggleCompleted, toggleImportant } = tasksSlice.actions;
