import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import instance from "./instance";
import { useCookies } from "react-cookie";
import { removeCookie, setCookie } from "../../utils/cookie";

const initialState = {
  message: "",
  token: "",
  userId: 0,
  nickname: "",
  mbti: "",
}

export const postmytodosFetch = createAsyncThunk(
  "users/postLogin",
  async (payload, thunkAPI) => {
    
    try {
      console.log("서버와의 통신 시작");
      const response = await instance.post("/mytodos", payload);
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러")
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

const mytodosSlice = createSlice({
  name:"users",
  initialState,
  reducers:{
  },
  
  extraReducers: builder => { 
    builder.addCase(postmytodosFetch.pending , (state, action)=> {
      console.log(action)
      return state;
    })
    builder.addCase(postmytodosFetch.fulfilled, (state,action)=> {
      console.log(action)
    const newState ={...state}
      newState.message = action.payload.message;
      setCookie("token",action.payload.token);
      return newState;
    })
    builder.addCase(postmytodosFetch.rejected, (state,action)=> {
      console.log(action)
      const newState = {...state };
      newState.message = action.payload.message;
      return newState;
    })
  }
})

export default mytodosSlice;