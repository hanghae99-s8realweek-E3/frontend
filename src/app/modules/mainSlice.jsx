import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { preInstance } from "./instance";

const initialState = {
  message: "",
  data: {},
};

export const getMainFetch = createAsyncThunk(
  "get/getMainFetch",
  async (payload, thunkAPI) => {
    try {
      const response = await preInstance.get("/todolists/ranking");
      return thunkAPI.fulfillWithValue(response.data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMainFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(getMainFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.data = action.payload;
      return newState;
    });
    builder.addCase(getMainFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    });
  },
});
