import { configureStore } from '@reduxjs/toolkit';
import  commentsSlice  from './modules/commentsSlice';
import usersSlice from './modules/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    comments:commentsSlice.reducer 
  },
});