import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
  message: "",
  token: "",
  userId: 0,
  nickname: "",
  mbti: "",
}
//예시
// dispatch(postSignUpFetch(payload))

// payload값이 서버에 payload를 전달하지 않더라도, 경로를 만들기 위해서 사용하는 경우도 있다 (예시-/api/todoLists/:todoId), ('api url /${payload.id값}' , payload값은 필요한 경우만 사용한다.)

export const postLoginFetch = createAsyncThunk(
  "users/postLogin",
  async (payload, thunkAPI) => {
    try {
      //get,delete요청에서 /:postid같은 경우랑 일반적인 /follow같은 경우의 차이점에 대해서 생각하고 있어야한다. 전자는 payload생각~~ `await axios.delete(server_url + `/api/posts/${value}`요런거,
      console.log("서버와의 통신 시작");
      const response = await axios.post("API 경로", payload);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
      
    } catch (error) {
      console.log("서버와의 통신 에러")
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const postSignUpFetch = createAsyncThunk(
  'users/postSignUp',
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post('API 경로', payload)  //('API경로에는 서버와 통신하는 경로값', payload 자리에는 서버로 보내줘야할 값이 들어간다)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
)

// extraReducers: builder => {
//   builder.addCase(액션크리에이터함수.요청을기다릴때, (state, action) => {
//     return state;
//   })
//   builder.addCase(액션크리에이터함수.성공할때, (state, action) => {
//     const newState = { ...state };
//     newState.result = action.payload.result;
//     return newState;
//   })
//   builder.addCase(액션크리에이터함수.실패할때, (state, action) => {
//     const newState = { ...state };
//     newState.result = action.payload.result;
//     return newState;
//   })

const accountsSlice = createSlice({
  name:"users",
  initialState,
  reducers:{

  },
  extraReducers: builder => { 
    builder.addCase(postLoginFetch.pending, (state, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(postLoginFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.result = action.payload.result;
      return newState;
    });
    builder.addCase(postLoginFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.result = action.payload.result;
      return newState;
    });

    builder.addCase(postSignUpFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(postSignUpFetch.fulfilled, (state,action)=> {
      const newState = {...state}
      newState.result = action.payload.result;
      return newState;
    })
    builder.addCase(postSignUpFetch.rejected, (state,action)=> {
      const newState = { ...state };
      newState.result = action.payload.result;
      return newState;
    })
  }
})

export default accountsSlice;