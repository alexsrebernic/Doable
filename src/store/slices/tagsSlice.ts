import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { Tag } from '../../types/Tag/Tag';
import { fetchTags as fetchTagsFromAPI } from '../../api/api';
import FavoriteTags,{favoriteTagsIds} from '../../helper/favoriteTag';
import { addTask, selectTaskById } from './tasksSlice';
import { RootState } from '..';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './userSlice';
import Task from '../../types/Task/Task';
export const fetchTags = createAsyncThunk('tags/fetchTags', async (userId: number) => {
    const response = await fetchTagsFromAPI(userId);
    return [...response.data, ...FavoriteTags];
  });
export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [] as Tag[],
    reducers: {
      addTag: (state, action) => {
        const {id, userId,tagName} = action.payload
        state.push({
          name:tagName,
          icon:null,
          tasksIds: [],
          id: id,
          numberOfTasks: 0,
          ownerId:  userId,
          theme: 'default'
        });
      },
      updateTagProp: (state, action: PayloadAction<Tag>) => {
        const {tagId,prop,value} = action.payload;
        const tagIndex = state.findIndex((tag : Tag) => tag.id === tagId);
        if (tagIndex !== -1) {
          state[tagIndex][prop] = value;
        }
      },
      removeTag: (state, action: PayloadAction<string>) => {
        const id = action.payload;
        return state.filter((tag) => tag.id !== id);
      },
      setTags: (state, action: PayloadAction<Tag[]>) => {
        return action.payload
      },
      moveTaskToTag:(state, action) => {
        const {taskId,tagId} = action.payload;
        console.log(tagId)
        const toTagIndex = state.findIndex((tag : Tag) => tag.id == tagId);
        const fromTagIndex = state.findIndex((tag : Tag) => tag.tasksIds?.includes(taskId))
        if(toTagIndex == fromTagIndex) return
        console.log(toTagIndex,fromTagIndex)
        const taskIndex = state[fromTagIndex].tasksIds?.findIndex(t => t.id == taskId)
        state[toTagIndex].tasksIds?.push(taskId)
        state[fromTagIndex].tasksIds?.slice(taskIndex,1)
       
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTags.fulfilled, (state, action, ) => {
        return action.payload
      })
      .addCase(addTask, (state, action) => {
        const { id, tagId } = action.payload;
        const tag = state.find((tag) => tag.id == tagId);
        if (tag) {
          if (!tag.tasksIds) {
            tag.tasksIds = []
          }
          tag.tasksIds.push(id);
        }
      })
    },
  });

export const selectTags = (state: RootState) => state.tags;
export const selectTagById = (tagId : number | string) => createSelector(selectTags, (tags) => tags.find(tag => tag.id == tagId))
export const selectNonFavoriteTags = createSelector(selectTags, (tags) => tags.filter((tag) => !favoriteTagsIds.includes(tag.id))) 
export const { addTag, updateTagProp, removeTag, setTags, moveTaskToTag } = tagsSlice.actions;
