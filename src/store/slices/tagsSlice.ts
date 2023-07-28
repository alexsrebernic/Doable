import { createSlice, PayloadAction, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { Tag } from '../../types/Tag/Tag';
import { fetchTags as fetchTagsFromAPI } from '../../api/api';
import FavoriteTags,{favoriteTagsIds} from '../../helper/favoriteTag';
import { addTask, removeTask, selectTaskById, toggleCompleted } from './tasksSlice';
import { RootState } from '..';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, selectCurrentUser, updateUserThunk } from './userSlice';
import * as tagsApi from '../../api/firebase/controllers/tagController';
import { updateUser } from '../../api/firebase/controllers/userController';
import { deleteTask } from '../../api/firebase/controllers/taskController';
export const fetchTags = createAsyncThunk('tags/fetchTags', async (userId: string) => {
    if(!userId) return [...FavoriteTags]
    const response = await tagsApi.getTags(userId);
    return [...response, ...FavoriteTags];
});
export const createTag = createAsyncThunk('tags/createTag', async (tag: Tag) => {
  await tagsApi.setTag(tag);
});
export const updateTag = createAsyncThunk('tags/updateTag', async (tag: Tag) => {
  await tagsApi.updateTag(tag);
});
export const deleteTag = createAsyncThunk('tags/deleteTag', async (tagId: string) => {
  await tagsApi.deleteTag(tagId);
});
export const updateTagThunk = (type : string,args : object) => async (dispatch,getState) => {
  try {
    if(type && args) dispatch(tagsSlice.actions[type](args))
    const tag = getState().tags.filter(t => t.id == args.tagId).pop()
    if(tag.ownerId !== 'anonymus') dispatch(updateTag(tag))
    dispatch(updateUserThunk(null))
  } catch (e){
    console.error(e)
  }
} 
export const createTagThunk = (tag: Tag) => async (dispatch) => {
  try {
      dispatch(addTag(tag))
      if(tag.ownerId !== 'anonymus') dispatch(createTag(tag))
      dispatch(updateUserThunk(null))
  } catch(e){
    console.error(e)
  }
}
export const deleteTagThunk = (tagId) => async (dispatch,getState) => {
  try {
    const tag = getState().tags.filter(t => t.id == tagId).pop()
    if(tag.ownerId !== 'anonymus') {
      dispatch(removeTag(tagId))
      if(tag.tasksIds.length > 0){
        tag.tasksIds.forEach(t => {
          deleteTask(t)
        })
      }
    }
    dispatch(deleteTag(tagId))
    dispatch(updateUserThunk(null))
  } catch (e){
    console.error(e)
  }
}
export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [] as Tag[],
    reducers: {
      addTag: (state, action) => {
        const tag = action.payload
        state.push(tag);
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
        console.log(taskId,tagId)
        const toTagIndex = state.findIndex((tag : Tag) => tag.id == tagId);
        const fromTagIndex = state.findIndex((tag : Tag) => tag.tasksIds?.includes(taskId))
        if(toTagIndex == fromTagIndex) return
        const taskIndex = state[fromTagIndex].tasksIds?.findIndex(t => t.id == taskId)
        state[toTagIndex].tasksIds?.push(taskId)
        state[fromTagIndex].tasksIds?.slice(taskIndex,1)
      },
      setFavoriteTags:(state,action) => {
        return [...FavoriteTags]
      },
      addTaskToTag: (state,action) => {
        const { taskId, tagId } = action.payload;
        const tag = state.find((tag) => tag.id == tagId);
        if (tag) {
          if (!tag.tasksIds) {
            tag.tasksIds = []
          }
          tag.tasksIds.unshift(taskId);
        }
      }
    },
    extraReducers: (builder) => {
      builder
      .addCase(fetchTags.fulfilled, (state, action, ) => {
        return action.payload
      })
      .addCase(addTask.type, (state, action) => {
        const { id, tagId } = action.payload;
        const tag = state.find((tag) => tag.id == tagId);
        if (tag) {
          if (!tag.tasksIds) {
            tag.tasksIds = []
          }
          tag.tasksIds.unshift(id);
        }
      })
      .addCase(removeTask, (state, action) => {
        const { taskId, tagId } = action.payload;
        const tag = state.find((tag) => tag.id == tagId);
        if (tag) {
          tag.tasksIds = tag.tasksIds?.filter(t => t !== taskId)
        }
      })
      .addCase(toggleCompleted, (state,action) => {
        const { id, tagId } = action.payload;
        if(id && tagId){
          const tag = state.find((tag) => tag.id == tagId);
          if (tag) {
            if (!tag.tasksIds) {
              tag.tasksIds = []
            }
            tag.tasksIds.unshift(id);
          }
        }
      })
      .addCase(logOutUser.fulfilled, (state,action) => {
        return [...FavoriteTags]
      })
    },
  });

export const selectTags = (state: RootState) => state.tags;
export const selectTagById = (tagId : number | string) => createSelector(selectTags, (tags) => tags.find(tag => tag.id == tagId))
export const selectNonFavoriteTags = createSelector(selectTags, (tags) => tags.filter((tag) => !favoriteTagsIds.includes(tag.id))) 
export const { addTag, updateTagProp, removeTag, setTags, moveTaskToTag, setFavoriteTags,addTaskToTag } = tagsSlice.actions;
