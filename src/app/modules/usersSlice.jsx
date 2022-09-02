// import { createSlice } from "@reduxjs/toolkit";
// import { createAsyncThunk } from "@reduxjs/toolkit/dist/createAsyncThunk";

// const initialState = {
//   message: "",
//   token: "",
//   userId: 0,
//   nickname: "",
//   mbti: "",
// };

// export const postLoginFetch = createAsyncThunk(
//   "users/postLogin",
//   async (payload, thunkAPI) => {
//     try {
//       //get,delete요청에서 /:postid같은 경우랑 일반적인 /follow같은 경우의 차이점에 대해서 생각하고 있어야한다. 전자는 payload생각~~ `await axios.delete(server_url + `/api/posts/${value}`요런거,
//       console.log("서버와의 통신 시작");
//       const response = await axios.post("API 경로", payload);
//       console.log("서버 통신 성공 값 반환해줍니다");
//       return thunkAPI.fulfillWithValue(response.data);
      
//     } catch (error) {
//       console.log("서버와의 통신 에러")
//       return thunkAPI.rejectWithValue(error.data);
//     }
//   }
// );

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   //클라내에서
//   reducers: {},
//   //서버에서 필요
//   extraReducers: (builder) => {
//     builder.addCase(postLoginFetch.pending, (state, action) => {
//       state = action.payload;
//       return state;
//     });
//     builder.addCase(postLoginFetch.fulfilled, (state, action) => {
      
//       const newState = { ...state };
//       newState.result = action.payload.result;
//       return newState;
//     });
//     builder.addCase(postLoginFetch.rejected, (state, action) => {
//       const newState = { ...state };
//       newState.result = action.payload.result;
//       return newState;
//     });
//   },
// });

// // extraReducers: builder => {
// //   builder.addCase(액션크리에이터함수.요청을기다릴때, (state, action) => {
// //     return state;
// //   })
// //   builder.addCase(액션크리에이터함수.성공할때, (state, action) => {
// //     const newState = { ...state };
// //     newState.result = action.payload.result;
// //     return newState;
// //   })
// //   builder.addCase(액션크리에이터함수.실패할때, (state, action) => {
// //     const newState = { ...state };
// //     newState.result = action.payload.result;
// //     return newState;
// //   })

// export default usersSlice;
