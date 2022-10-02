import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import * as Sentry from "@sentry/react";

const initialState = {
  message: "",
  errorMessage: "",
  data: {},
};

// 나의 ToDo 피드를 조회할 때 사용되는 thunk action creater
export const getSetUpMyTodoFetch = createAsyncThunk(
  "mytodos/getSetUpMyTodoFetch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/mytodos?date=${payload.date}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      Sentry.captureException(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const setUpTodosSlice = createSlice({
  name: "setUpTodos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getSetUpMyTodoFetch Creater 작동 시 적용되는 내용들
    builder.addCase(getSetUpMyTodoFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(getSetUpMyTodoFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.message = action.payload.message;
      newState.data = action.payload.data;
      return newState;
    });
    builder.addCase(getSetUpMyTodoFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    });
  },
});

export default setUpTodosSlice;
