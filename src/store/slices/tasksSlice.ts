import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import Task from '../../types/Task/Task';
import axios from 'axios';
import { Tag } from '../../types/Tag/Tag';
import { fetchTasks as fetchTasksFromAPI } from '../../api/api';
import { RootState } from '..';
import { createSelector } from '@reduxjs/toolkit';
import { isToday, isSameDay,isThisWeek,isThisMonth } from 'date-fns';
import { addTaskToTag, moveTaskToTag, removeTag, tagsSlice } from './tagsSlice';
import calculateNextDueDate from '../../helper/calculateNextDueDate'
import uniqid from 'uniqid'
import { useDispatch } from 'react-redux';
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (userId:number) => {
    if(!userId) return
    const response = await fetchTasksFromAPI(userId);
    return response.data;
  });
export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: [] as Task[],
    reducers: {
      addTask: (state, action: PayloadAction<Task>) => {
        const task = action.payload;
        console.log(task)
        state.unshift(task);
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
        if(task?.repeat && task.completed && !state.find(t => t.taskSuccessorId == task.id)){
          const nextDueDate = calculateNextDueDate(task.dueDate,task.repeat)
          const id = uniqid()
          console.log(nextDueDate)
          tasksSlice.caseReducers.addTask(
            state,
            {
              type: "tasks/addTask",
              payload: {
                text: task.text,
               completed: false,
               important: task.important,
               dueDate: nextDueDate,
               repeat: task.repeat,
               createdAt: Date.now(),
               ownerId: task.ownerId,
               myDay: false,
               myDayDate: null,
               tagId: task.tagId,
               id,
               completedAt: null,
               taskSuccessorId: task.id,
              }
              
           }
          )
          action.payload = { id, tagId: task.tagId }
        }
      },
      toggleMyDay: (state, action) => {
        const taskId = action.payload;
        const task = state.find((task) => task.id === taskId);
        if (task) {
          task.myDay = !task.myDay; // Toggle the favorite status
          task.myDayDate = Date.now()
        }
      },
      updateTaskProp: (state, action: PayloadAction<Task>) => {
        const {taskId,prop,value} = action.payload;
        const taskIndex = state.findIndex((task : Task) => task.id === taskId);
        if (taskIndex !== -1) {
          state[taskIndex][prop] = value;
        }
      },
      setTasks: (state, action: PayloadAction<Task[]>) => {
          return action.payload
      },
      },
    extraReducers: (builder) => {
      builder.addCase(fetchTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(moveTaskToTag,(state,action) => {
        const {taskId,tagId} = action.payload;
        const taskIndex = state.findIndex(t => t.id == taskId);
        const newTask = {...state[taskIndex]}
        newTask.tagId = tagId;
        state[taskIndex] = newTask
      })
      .addCase(removeTag, (state,action) => {
        return state.filter(task => task.tagId !== action.payload)
      })
    },
  });
const selectTasks = (state: RootState) => state.tasks;
const selectTaskById =(taskId: string) => createSelector(
  selectTasks, 
  (tasks) => {
    return tasks.find(t => t.id == taskId)
  }
)
const selectTasksByTagId = (tagId: number | string,searchInput : string | null) => createSelector(
  selectTasks,
  (tasks) => {
    switch (tagId) {
      case 'completed': return tasks.filter((task) => task.completed);
      case 'important': return tasks.filter((task) => task.important);
      case 'myday': return tasks.filter((task) => task.dueDate? isToday(task.dueDate) || task.myDay : false);
      case 'all': return tasks;
      case 'search': return tasks.filter((task => searchInput.length > 0 && task.text.toLowerCase().includes(searchInput.toLowerCase()))) 
      default: return tasks.filter((task) => task.tagId == tagId);
    }
  }
);

const selectTasksByDueDate = (dueDate : Date | string  | null) => createSelector(
  selectTasks, 
  (tasks) => {
    if(typeof dueDate == 'string'){
      switch(dueDate){
        case 'Today' : return tasks.filter(task => isToday(task.dueDate));
        case 'This week':return tasks.filter((task) => isThisWeek(task.dueDate));
        case 'This month' :return tasks.filter((task) => isThisMonth(task.dueDate));
      }
    } else {
      return tasks.filter((task) => (!dueDate || isToday(dueDate))? task.dueDate? isToday(task.dueDate) : false :  task.dueDate? isSameDay(task.dueDate, dueDate) : false)
    }
   
  }
)
const selectNumberOfTasksByTagId = (tagId : string) => createSelector(
  selectTasks,
  (tasks) => {
    switch (tagId) {
      case 'completed': return 0;
      case 'important': return tasks.filter((task) => task.important && !task.completed).length;
      case 'myday': return tasks.filter((task) => task.dueDate? (isToday(task.dueDate) || task.myDay) && !task.completed : false).length;
      case 'all': return 0;
      default: return tasks.filter((task) => task.tagId == tagId && !task.completed).length;
    }
  }
)
export {selectTasks,selectTasksByTagId,selectTaskById, selectTasksByDueDate,selectNumberOfTasksByTagId}
export const { addTask, updateTask, removeTask, setTasks, toggleCompleted, toggleImportant,toggleMyDay,updateTaskProp } = tasksSlice.actions;
