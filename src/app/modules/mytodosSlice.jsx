import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "./instance";

const initialState = {
  message: "",
  errorMessage: "",
  data: {},
  isCompleted: ""
}

export const postmytodosFetch = createAsyncThunk(
  "users/postLogin",
  async (payload, thunkAPI) => {
    try {
      console.log("통신시작");
      const response = await instance.post("/mytodos", payload);
      console.log("통신완료 값 반환")
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("에러발생")
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 타인의 todo 피드 조회
export const getOthersTodoFetch = createAsyncThunk(
  'otherstodos/getOthersTodoFetch',
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const response = await instance.get(`/mytodos/${payload.userId}`);
      console.log(response)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 오늘의 미믹을 진행중/완료 처리하는 Creator
export const putSetUpTodoFetch = createAsyncThunk(
  'setuptodo/putSetUpTodoFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put(`/mytodos/${payload.todoId}/challenged`, { date: payload.date });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 내가 제안한 미믹을 삭제해주는 Creator
export const deleteMyTodosFetch = createAsyncThunk(
  'setuptodo/deleteMyTodosFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`mytodos/${payload}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 내가 도전하기로 한 투두를 포기시켜주는 Creator
export const deleteSetUpTodoFetch = createAsyncThunk(
  'setuptodo/deleteSetUpTodoFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/mytodos/${payload.todoId}/challenged`, { date: payload.date});
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

const mytodosSlice = createSlice({
  name:"myTodos",
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
    
    //타인의 todo
    builder.addCase(getOthersTodoFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(getOthersTodoFetch.fulfilled, (state, action)=> {
      const newState ={...state}
      newState.message = action.payload.message;
      newState.data = action.payload.data;
      console.log(newState.data);
      return newState;
    })
    builder.addCase(getOthersTodoFetch.rejected, (state, action)=> {
      const newState = {...state };
      console.log(newState.data);
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

    //putSetUpTodoFetch Creater 작동 시 적용되는 내용들
    builder.addCase(putSetUpTodoFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(putSetUpTodoFetch.fulfilled, (state, action)=> {
      const newState ={ ...state }
      newState.message = action.payload.message;
      newState.isCompleted = action.payload.isCompleted;
      return newState;
    })
    builder.addCase(putSetUpTodoFetch.rejected, (state, action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

    //deleteMyTodosFetch Creater 작동 시 적용되는 내용들
    builder.addCase(deleteMyTodosFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(deleteMyTodosFetch.fulfilled, (state, action)=> {
      const newState ={ ...state }
      newState.message = action.payload.message;
      return newState;
    })
    builder.addCase(deleteMyTodosFetch.rejected, (state, action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

    //deleteSetUpTodoFetch Creater 작동 시 적용되는 내용들
    builder.addCase(deleteSetUpTodoFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(deleteSetUpTodoFetch.fulfilled, (state, action)=> {
      const newState ={ ...state }
      newState.message = action.payload.message;
      return newState;
    })
    builder.addCase(deleteSetUpTodoFetch.rejected, (state, action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

  }
})

export default mytodosSlice;