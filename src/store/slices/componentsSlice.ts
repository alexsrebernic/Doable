// slice.js
import { createSlice } from '@reduxjs/toolkit';


export const componentSlice = createSlice({
  name: 'component',
  initialState: {},
  reducers: {
    setComponentVariable: (state, action) => {
      const { tagId, variable } : { tagId: string , variable : boolean} = action.payload;
      console.log(tagId,variable)
      state[tagId] = variable;
      console.log(state[tagId])
    },
    removeComponentVariable: (state, action) => {
      const { tag } = action.payload;
      delete state[tag];
    },
  },
});

export const { setComponentVariable, removeComponentVariable } =
  componentSlice.actions;