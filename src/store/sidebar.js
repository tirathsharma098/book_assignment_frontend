import { createSlice } from '@reduxjs/toolkit';

const initialSidebarState = { sidebarShow: true };

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: initialSidebarState,
  reducers: {
    set(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const sidebarActions = sidebarSlice.actions;

export default sidebarSlice.reducer;
