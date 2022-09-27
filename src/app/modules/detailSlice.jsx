import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  message: "",
  errorMessage: "",
  data: [],
};

export const postFeedDetailFetch = createAsyncThunk(
  "detail/postFeedDetailFetch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post(`/mytodos/${payload}/challenged`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getFeedDetailFetch = createAsyncThunk(
  "detail/getFeedDetailFetch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/todolists/${payload.todoId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    resetFeedDetailData: (state, action) => {
      const newState = { ...state };
      newState.errorMessage = "";
      newState.message = "";
      return newState;
    },
  },
  extraReducers: (builder) => {
    //!get
    builder.addCase(getFeedDetailFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(getFeedDetailFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.message = action.payload.message;
      newState.data = action.payload.data;
      newState.errorMessage = "";
      return newState;
    });
    builder.addCase(getFeedDetailFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload;
      newState.message = "";
      return newState;
    });
    //!post
    builder.addCase(postFeedDetailFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(postFeedDetailFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.message = action.payload.message;
      newState.errorMessage = "";
      return newState;
    });
    builder.addCase(postFeedDetailFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload;
      newState.message = "";
      return newState;
    });
  },
});

export const { resetFeedDetailData } = detailSlice.reducer;

export default detailSlice;
