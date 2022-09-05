import { configureStore } from '@reduxjs/toolkit';
import  followCommentSlice  from './modules/followCommentSlice';
import usersSlice from './modules/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    comments:followCommentSlice.reducer 
  },
});