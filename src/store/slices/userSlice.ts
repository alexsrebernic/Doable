import {  createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import axios from 'axios';
import { fetchUser as fetchUserFromAPI } from '../../api/api';
import { addTag, removeTag } from './tagsSlice';
import { RootState } from '..';
import {  signInWithRedirect, GoogleAuthProvider, getRedirectResult, signOut } from "firebase/auth";
import {auth} from '../../api/firebase/firebase.config'
import { setUser as setUserInDatabase,getUser,updateUser as updateUserInDb} from '../../api/firebase/controllers/userController';
import { deleteTag } from '../../api/firebase/controllers/tagController';
export const fetchUser = createAsyncThunk('user/fetchUser', async (userId : number,{fulfillWithValue}) => {
  const response  = await getUser(userId);
  return fulfillWithValue(response);
});
export const updateUser = createAsyncThunk('user/updateUser', async (user : User) => {
  if(!user) return
  return await updateUserInDb(user)
})
export const logOutUser = createAsyncThunk('user/logOutUser', async () => {
  signOut(auth).then(() => {
    console.log("User sign out")
  }).catch((error) => {
    console.log(error)
    return error
  });
})
export const updateUserThunk = (args) => async (dispatch,getState) => {
  try {
    if(args) dispatch(updateUserProp(args))
    const user = getState().user
    if(user.id !== 'anonymus') dispatch(updateUser(user))
  } catch (e){
     console.error(e)
  }
}
export const userSlice = createSlice({
    name: 'user',
    initialState: null as User | null,
    reducers: {
      setUser: (state, action: PayloadAction<User>) => action.payload,
      setUserInDB: (state,action: PayloadAction<User>) => {
        const user = action.payload
        setUserInDatabase(user)
      },
      clearUser: (state) => {
        console.log(state?.email)
        return  null
      },
      updateUserProp: (state, action) => {
        const {prop,value} = action.payload;
        state[prop] = value;
      },
      logInUserWithGoogle: (state) => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider)
      
      },
    },
    extraReducers: (builder) => {
      builder.addCase(fetchUser.fulfilled, (state, action) => {
        if(!action.payload) return
        return action.payload;
      })
      .addCase(addTag,(state,action) => {
        const {id} = action.payload
        state?.tagsIds.push(id)
      })
      .addCase(logOutUser.fulfilled, (state,action) => {
        return {
          id:'anonymus',
          createdAt: Date.now(),
          tagsIds: [],
          email: null,
          img : ""
        }
      })
      .addCase(removeTag,(state,action) => {
        const id = action.payload;
        state?.tagsIds.filter(t => t != id)
      })
    },
  });
export const selectCurrentUser = (state: RootState) => state.user
export const { setUser, clearUser,updateUserProp,logInUserWithGoogle,setUserInDB } = userSlice.actions;
