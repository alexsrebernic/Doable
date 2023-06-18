import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Task from '../../types/Task/Task';
import axios from 'axios';
import { Tag } from '../../types/Tag/Tag';
import { fetchTasks as fetchTasksFromAPI } from '../../api';
export const fetchTasks = createAsyncThunk('tags/fetchTasks', async (userId:number) => {
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
        const { tagId } = task;
        const tag = state.find((tag) => tag.id === tagId);
        if (tag) {
          tag.tasks.push(task.id);
        }
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
          const { tagId } = state[taskIndex];
          state.splice(taskIndex, 1);
          const tag = state.find((tag) => tag.id === tagId);
          if (tag) {
            tag.tasks = tag.tasks.filter((taskId) => taskId !== taskId);
          }
        }
      },
      reorderTasks: (state, action: PayloadAction<{ tagId: number; taskIds: number[] }>) => {
        const { tagId, taskIds } = action.payload;
        const tag = state.find((tag) => tag.id === tagId);
        if (tag) {
          tag.tasks = taskIds;
        }
      },
    setTasks: (state, action: PayloadAction<Task[]>) => {
        return state = action.payload
      },

    },
  });