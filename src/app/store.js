import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './modules/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
