import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
import * as Sentry from "@sentry/react";

const initialState = {
  data: [],
  message: "",
  errorMessage: "",
};

//!get 팔로우/팔로잉리스트 불러오기
export const getMyPageFollowFetch = createAsyncThunk(
  "follow/getMyPageFollowFetch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/follows/${payload.userId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      Sentry.captureException(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// //!put 팔로우/언팔로우 하기
// export const putMyPageFollowFetch= createAsyncThunk (
//     'follow/putMyPageFollowFetch',
//     async (payload,thunkAPI) => {
//         try {
//             const response = await instance.put(`/follows/${payload}`)
//             return thunkAPI.fulfillWithValue(response.data)
//         }catch (error) {
//             return thunkAPI.rejectWithValue(error.data);
//         }
//     }
// )

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMyPageFollowFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(getMyPageFollowFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.data = action.payload.data;
      return newState;
    });
    builder.addCase(getMyPageFollowFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    });
    // //!put
    // builder.addCase(putMyPageFollowFetch.pending , (state,action)=> {
    //     return state;
    // })
    // builder.addCase(putMyPageFollowFetch.fulfilled, (state,action)=> {
    //     const newState = {...state};
    //     newState.message=action.payload.message;
    //     return newState;
    // })
    // builder.addCase(putMyPageFollowFetch.rejected, (state, action)=> {
    //     const newState={...state};
    //     newState.errorMessage=action.payload.errorMessage;
    //     return newState;
    // })
  },
});

export default followSlice;
