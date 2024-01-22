import { createSlice } from '@reduxjs/toolkit';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: false,
  reducers: {
    set(state, action) {
      return !state;
    },
  },
});

export const loaderAction = loaderSlice.actions;

export default loaderSlice.reducer;
