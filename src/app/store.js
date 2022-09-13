import { configureStore } from '@reduxjs/toolkit';
import accountsSlice from './modules/accountsSlice';
import mytodosSlice from './modules/mytodosSlice';
import todolistsSlice from './modules/todolistsSlice';
import detailSlice from './modules/detailSlice';
import followSlice from './modules/followSlice';
import setUpTodosSlice from './modules/setUpTodoSlice';

export const store = configureStore({
  reducer: {
    accounts: accountsSlice.reducer,
    mytodos:mytodosSlice.reducer,
    todolists:todolistsSlice.reducer,
    detail:detailSlice.reducer,
    follow:followSlice.reducer,
    setuptodos:setUpTodosSlice.reducer,
  },
});
