// slice.js
import { createSlice } from '@reduxjs/toolkit';


export const componentSlice = createSlice({
  name: 'groupTasksContainer',
  initialState: {},
  reducers: {
    setComponentVariable: (state, action) => {
      const { tagId, variable } = action.payload;
      console.log(tagId,variable)
      state[tagId] = variable;
    },
    removeComponentVariable: (state, action) => {
      const { tag } = action.payload;
      delete state[tag];
    },
  },
});

export const { setComponentVariable, removeComponentVariable } =
  componentSlice.actions;