import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import axios from 'axios';
import { userId } from '../../types/UserId';
import { fetchUser as fetchUserFromAPI } from '../../api';

export const fetchUser = createAsyncThunk('tags/fetchUser', async (userId : userId) => {
  const response  = await fetchUserFromAPI(userId);
  return response.data;
});
export const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => action.payload,
      clearUser: (state) => null,
      getCurrentUser: (state) => state
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      });
    },
  });