import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import axios from 'axios';
import { fetchUser as fetchUserFromAPI } from '../../api/api';

export const fetchUser = createAsyncThunk('tags/fetchUser', async (userId : number) => {
  const response  = await fetchUserFromAPI(userId);
  return response.data;
});
export const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => action.payload,
      clearUser: (state) => null,
      getCurrentUser: (state) => state,
      getCurrentUserId: (state) => state?.id
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });
export const { setUser, clearUser, getCurrentUser,getCurrentUserId } = userSlice.actions;
