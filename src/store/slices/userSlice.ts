import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import axios from 'axios';
import { fetchUser as fetchUserFromAPI } from '../../api/api';
import { addTag } from './tagsSlice';
import { RootState } from '..';

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
      updateUserProp: (state, action) => {
        const {prop,value} = action.payload;
        state[prop] = value;
      },
      logInUser: (state) => {

      }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(addTag,(state,action) => {
        const {id} = action.payload
        state?.tagsIds.push(id)
      })
    },
  });
export const selectCurrentUser = (state: RootState) => state.user
export const { setUser, clearUser,updateUserProp,logInUser } = userSlice.actions;
