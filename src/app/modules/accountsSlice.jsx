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
// 9 13 리팩토링
// export const postLoginFetch = createAsyncThunk(
//   "users/postLogin",
//   async (payload, thunkAPI) => {
//     try {
//       //get,delete요청에서 /:postid같은 경우랑 일반적인 /follow같은 경우의 차이점에 대해서 생각하고 있어야한다. 전자는 payload생각~~ `await axios.delete(server_url + `/api/posts/${value}`요런거,
//       const response = await instance.post("/accounts/login", payload);
//       return thunkAPI.fulfillWithValue(response.data);
      
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

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
    // builder.addCase(postLoginFetch.pending, (state, action) => {
    //   state = action.payload;
    //   return state;
    // });
    // builder.addCase(postLoginFetch.fulfilled, (state, action) => {
    //   const newState = {...state };
    //   // // newState.result로만 해왔었는데 api명세서를 확인해봤을때 result가아니라 message로 반환을해줬었다..
    //   newState.message = action.payload.message;
    //   window.localStorage.setItem("token", action.payload.token)
    //   return newState;
    //   // state = action.payload;
    //   // return state;
    // });
    // builder.addCase(postLoginFetch.rejected, (state, action) => {
    //   const newState = { ...state };
    //   newState.errorMessage = action.payload.errorMessage;
    //   alert(newState);
    //   return newState;
    // });
    
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

    // // 소셜로그인 카카오
    // builder.addCase(getKakaoLoginFetch.pending, (state, action) => {
    //   state = action.payload;
    //   return state;
    // });
    // builder.addCase(getKakaoLoginFetch.fulfilled, (state, action) => {
    //   const newState = {...state };
    //   // // newState.result로만 해왔었는데 api명세서를 확인해봤을때 result가아니라 message로 반환을해줬었다..
    //   newState.message = action.payload.message;
    //   window.localStorage.setItem("token", action.payload.token)
    //   return newState;
    //   // state = action.payload;
    //   // return state;
    // });
    // builder.addCase(getKakaoLoginFetch.rejected, (state, action) => {
    //   // const newState = { ...state };
    //   // newState.errorMessage = action.payload.errorMessage;
    //   // alert(newState);
    //   // return newState;
    //   state = action.payload;
    //   console.log(state);
    //   return state;

    // });
  }
})

export default accountsSlice;