import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "./instance";

const initialState = {
  message: "",
  errorMessage: "",
  token: "",
  userInfo: {}
}

//예시
// dispatch(postSignUpFetch(payload))

// payload값이 서버에 payload를 전달하지 않더라도, 경로를 만들기 위해서 사용하는 경우도 있다 (예시-/api/todoLists/:todoId), ('api url /${payload.id값}' , payload값은 필요한 경우만 사용한다.)


export const postLoginFetch = createAsyncThunk(
  "users/postLogin",
  async (payload, thunkAPI) => {
    try {
      //get,delete요청에서 /:postid같은 경우랑 일반적인 /follow같은 경우의 차이점에 대해서 생각하고 있어야한다. 전자는 payload생각~~ `await axios.delete(server_url + `/api/posts/${value}`요런거,
      const response = await instance.post("/accounts/login", payload);
      return thunkAPI.fulfillWithValue(response.data);
      
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postSignUpFetch = createAsyncThunk(
  'users/postSignUp',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.post("/accounts/signup", payload)  //('API경로에는 서버와 통신하는 경로값', payload 자리에는 서버로 보내줘야할 값이 들어간다)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 프로필 정보 받아올 시에 사용되는 thunk action creater 
export const getMyPageFetch = createAsyncThunk(
  'users/getMyPageFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get("/accounts")
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 프로필 수정 시에 사용되는 thunk action creater 
export const putModifyProfileFetch = createAsyncThunk(
  'users/putProfileFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.put("/accounts", payload)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)

// 회원 탈퇴 시에 사용되는 thunk action creater 
export const deleteWithdrawFetch = createAsyncThunk(
  'users/deleteHelpDeskFetch',
  async (payload, thunkAPI) => {
    try {
      console.log(payload)
      const response = await instance.delete("/accounts", payload)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log(error.response.data)
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)


const accountsSlice = createSlice({
  name:"accounts",
  initialState,
  reducers:{
    resetSuccessMessage: (state, action) => {
      const newState = {...state };
      newState.message = "";
      newState.errorMessage = "";
      return newState;
    }
  },  
  extraReducers: builder => { 
    builder.addCase(postLoginFetch.pending, (state, action) => {
      state = action.payload;
      return state;
    });
    builder.addCase(postLoginFetch.fulfilled, (state, action) => {
      const newState = {...state };
      // // newState.result로만 해왔었는데 api명세서를 확인해봤을때 result가아니라 message로 반환을해줬었다..
      newState.message = action.payload.message;
      window.localStorage.setItem("token", action.payload.token)
      return newState;
      // state = action.payload;
      // return state;
    });
    builder.addCase(postLoginFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      alert(newState);
      return newState;
    });
    
    builder.addCase(postSignUpFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(postSignUpFetch.fulfilled, (state,action)=> {
      const newState = {...state}
      newState.message = action.payload.message;
      window.localStorage.setItem("token", action.payload.token)
      return newState;
    })
    builder.addCase(postSignUpFetch.rejected, (state,action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

    // getMyPageFetch Creater 작동 시 적용되는 내용들
    builder.addCase(getMyPageFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(getMyPageFetch.fulfilled, (state,action)=> {
      const newState = {...state}
      newState.userInfo = action.payload.userInfo;
      return newState;
    })
    builder.addCase(getMyPageFetch.rejected, (state,action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

    // putModifyProfileFetch Creater 작동 시 적용되는 내용들
    builder.addCase(putModifyProfileFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(putModifyProfileFetch.fulfilled, (state,action)=> {
      const newState = {...state}
      newState.message = action.payload.message;
      window.localStorage.setItem("token", action.payload.token)
      return newState;
    })
    builder.addCase(putModifyProfileFetch.rejected, (state,action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    })

    // deleteHelpDeskFetch Creater 작동 시 적용되는 내용들
    builder.addCase(deleteWithdrawFetch.pending , (state, action)=> {
      return state;
    })
    builder.addCase(deleteWithdrawFetch.fulfilled, (state,action)=> {
      const newState = {...state}
      newState.message = action.payload.message;
      return newState;
    })
    builder.addCase(deleteWithdrawFetch.rejected, (state,action)=> {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      console.log(newState)
      return newState;
    })
  }
})

export default accountsSlice;