import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Tag } from '../../types/Tag/Tag';
import { fetchTags as fetchTagsFromAPI } from '../../api/api';
import FavoriteTags from '../../helper/favoriteTag';
import { addTask } from './tasksSlice';
export const fetchTags = createAsyncThunk('tags/fetchTags', async (userId: number) => {
    const response = await fetchTagsFromAPI(userId);
    return response.data;
  });
export const tagsSlice = createSlice({
    name: 'tags',
    initialState: [...FavoriteTags] as Tag[],
    reducers: {
      addTag: (state, action: PayloadAction<Tag>) => {
        state.push(action.payload);
      },
      updateTag: (state, action: PayloadAction<Tag>) => {
        const updatedTag = action.payload;
        const tagIndex = state.tags.findIndex((tag : Tag) => tag.id === updatedTag.id);
        if (tagIndex !== -1) {
          state.tags[tagIndex] = updatedTag;
        }
      },
      removeTag: (state, action: PayloadAction<number>) => {
        const id = action.payload;
        return state.filter((tag) => tag.id !== id);
      },
      setTags: (state, action: PayloadAction<Tag[]>) => {
        action.payload = [...action.payload, ...FavoriteTags]
        return action.payload
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchTags.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTask, (state, action) => {
        const { id, tagId } = action.payload;
        const tag = state.find((tag) => tag.id === tagId);
        if (tag) {
          tag.tasksIds.push(id);
        }
      })
    },
  });
  export const { addTag, updateTag, removeTag, setTags } = tagsSlice.actions;
