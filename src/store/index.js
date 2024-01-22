import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar';
import loaderReducer from './loader';
import notificationReducer from './notification';

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    loader: loaderReducer,
    notification: notificationReducer,
  },
});

export default store;
