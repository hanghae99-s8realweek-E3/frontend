import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "./instance";

const initialState = {
  message: "",
  errorMessage: "",
  data: {}
}

export const postmytodosFetch = createAsyncThunk(
  "users/postLogin",
  async (payload, thunkAPI) => {
    
    try {
      const response = await instance.post("/mytodos", payload);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

// 나의 ToDo 피드를 조회할 때 사용되는 thunk action creater 
export const getSetUpMyTodoFetch = createAsyncThunk(
  'mytodos/getSetUpMyTodoFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/mytodos?date=${payload.date}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
)


const mytodosSlice = createSlice({
  name:"users",
  initialState,
  reducers:{
  },
  
  extraReducers: builder => { 
    builder.addCase(postmytodosFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(postmytodosFetch.fulfilled, (state,action)=> {
    const newState ={...state}
      newState.message = action.payload.message;
      window.localStorage.getItem("token")
      return newState;
    })
    builder.addCase(postmytodosFetch.rejected, (state,action)=> {
      const newState = {...state };
      newState.message = action.payload.message;
      return newState;
    })

    //getSetUpMyTodoFetch Creater 작동 시 적용되는 내용들
    builder.addCase(getSetUpMyTodoFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(getSetUpMyTodoFetch.fulfilled, (state, action)=> {
      const newState ={...state}
      newState.message = action.payload.message;
      newState.data = action.payload.data;
      return newState;
    })
    builder.addCase(getSetUpMyTodoFetch.rejected, (state, action)=> {
      const newState = {...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })
  }
})

export default mytodosSlice;