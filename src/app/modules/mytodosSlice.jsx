import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

const initialState = {
  message: "",
  errorMessage: "",
  data: {},
  isCompleted: "",
};

// 9/13 리팩토링
// export const postmytodosFetch = createAsyncThunk(
//   "users/postLogin",
//   async (payload, thunkAPI) => {
//     try {
//       console.log("통신시작");
//       const response = await instance.post("/mytodos", payload);
//       console.log("통신완료 값 반환")
//       return thunkAPI.fulfillWithValue(response.data);
//     } catch (error) {
//       console.log("에러발생")
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// );

// 타인의 todo 피드 조회
export const getOthersTodoFetch = createAsyncThunk(
  "otherstodos/getOthersTodoFetch",
  async (payload, thunkAPI) => {
    try {
      const response = await instance.get(`/mytodos/${payload.userId}`);
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const mytodosSlice = createSlice({
  name: "myTodos",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // builder.addCase(postmytodosFetch.pending , (state, action)=> {
    //   return state;
    // })
    // builder.addCase(postmytodosFetch.fulfilled, (state,action)=> {
    // const newState ={...state}
    //   newState.message = action.payload.message;
    //   return newState;
    // })
    // builder.addCase(postmytodosFetch.rejected, (state,action)=> {
    //   const newState = {...state };
    //   newState.message = action.payload.message;
    //   return newState;
    // })

    //타인의 todo
    builder.addCase(getOthersTodoFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(getOthersTodoFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.message = action.payload.message;
      newState.data = action.payload.data;
      return newState;
    });
    builder.addCase(getOthersTodoFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return newState;
    });
  },
});

export default mytodosSlice;
