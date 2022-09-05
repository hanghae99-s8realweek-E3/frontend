import { configureStore } from '@reduxjs/toolkit';
import  followCommentSlice  from './modules/followCommentSlice';
import accountsSlice from './modules/accountsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    comments:followCommentSlice.reducer 
  },
});