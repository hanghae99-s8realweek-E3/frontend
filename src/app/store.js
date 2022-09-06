import { configureStore } from '@reduxjs/toolkit';
import  commentsSlice  from './modules/commentsSlice';
import accountsSlice from './modules/accountsSlice';
import mytodosSlice from './modules/mytodosSlice';
import mbtiSlice from './modules/mbtiSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    comments:commentsSlice.reducer,
    mytodos:mytodosSlice.reducer,
    mbti:mbtiSlice.reducer,
  },
});
