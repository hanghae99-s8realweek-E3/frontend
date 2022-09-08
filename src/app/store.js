import { configureStore } from '@reduxjs/toolkit';
import  commentsSlice  from './modules/commentsSlice';
import accountsSlice from './modules/accountsSlice';
import mytodosSlice from './modules/mytodosSlice';
import mbtiSlice from './modules/mbtiSlice';
import todolistsSlice from './modules/todolistsSlice';
import detailSlice from './modules/detailSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    comments:commentsSlice.reducer,
    mytodos:mytodosSlice.reducer,
    mbti:mbtiSlice.reducer,
    todolists:todolistsSlice.reducer,
    detail:detailSlice.reducer,
  },
});
