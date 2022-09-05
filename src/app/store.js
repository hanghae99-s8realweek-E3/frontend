import { configureStore } from '@reduxjs/toolkit';
import  commentsSlice  from './modules/commentsSlice';
import accountsSlice from './modules/accountsSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    comments:commentsSlice.reducer
  },
});