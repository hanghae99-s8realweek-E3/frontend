import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";
// import { setCookie } from "../../utils/cookie";
import axios from "axios";

const initialState = {
  data: [],
};

// 전체 Feed조회 - 최신순(기본)
export const gettodolistsFetch = createAsyncThunk(
  "todolists/gettodolistsFetch",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      console.log(payload)
      // axios.ins
      const response = await axios.get(
        "http://3.36.126.158:3000/api/todolists"
      );
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);
//피드 - 도전순
export const gettodolistsFetch1 = createAsyncThunk(
  "todolists/gettodolistsFetch1",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      // axios.ins

      const response = await axios.get(
        `http://3.36.126.158:3000/api/todolists?filter=${payload.challengedCount}`
      );
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);
//피드 - 댓글순
export const gettodolistsFetch2 = createAsyncThunk(
  "todolists/gettodolistsFetch2",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      console.log(payload)
      const response = await axios.get(
        `http://3.36.126.158:3000/api/todolists?filter=${payload.commentCounts}`
      );
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

const todolistsSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(gettodolistsFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(gettodolistsFetch.fulfilled, (state, action) => {
      console.log(action);
      const newState = { ...state };
      newState.data = action.payload.data;
      console.log(newState);
      // setCookie("token",action.payload.token);
      return newState;
    });
    builder.addCase(gettodolistsFetch.rejected, (state, action) => {
      console.log(action);
      // const newState = { ...state };
      // newState.error = action.payload.error;
      return state;
    });

      builder.addCase(gettodolistsFetch1.pending, (state, action) => {
        console.log(action);
        return state;
      });
      builder.addCase(gettodolistsFetch1.fulfilled, (state, action) => {
        console.log(action);
        const newState = { ...state };
        newState.data = action.payload.data;
        console.log(newState);
        // setCookie("token",action.payload.token);
        return newState;
      });
      builder.addCase(gettodolistsFetch1.rejected, (state, action) => {
        console.log(action);
        // const newState = { ...state };
        // newState.error = action.payload.error;
        return state;
      });
        builder.addCase(gettodolistsFetch2.pending, (state, action) => {
          console.log(action);
          return state;
        });
        builder.addCase(gettodolistsFetch2.fulfilled, (state, action) => {
          console.log(action);
          const newState = { ...state };
          newState.data = action.payload.data;
          console.log(newState);
          // setCookie("token",action.payload.token);
          return newState;
        });
        builder.addCase(gettodolistsFetch2.rejected, (state, action) => {
          console.log(action);
          // const newState = { ...state };
          // newState.error = action.payload.error;
          return state;
    });
  },
});

export default todolistsSlice;
