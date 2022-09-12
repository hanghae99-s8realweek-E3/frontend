import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

//!댓글 post
export const postCommentFetch = createAsyncThunk(
    "comments/postCommentFetch",
    async(payload, thunkAPI)=> {
        try {
            const response = await instance.post(`/comments/${payload.todoId}`,{comment:payload.comment});
            return thunkAPI.fulfillWithValue(response.data);
        } 
        catch (error) {
            return thunkAPI.rejectWithValue(error.data);
        }
    }
)

//!댓글삭제 
export const deleteCommentFetch = createAsyncThunk(
  'comments/deleteCommentFetch',
  async (payload, thunkAPI) => {
    try {
      const response = await instance.delete(`/comments/${payload}` )
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.data);
    }
  }
)


const initialState = {
  message:"",
  errorMessage:"",
}

const commentsSlice = createSlice({
    name:"comments",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
          //!post
          builder.addCase(postCommentFetch.pending, (state,action) => {
            return state;
          });
          builder.addCase(postCommentFetch.fulfilled, (state, action) => {
            const newState = {...state}
            newState.message = action.payload.message;
            return newState;

          });
          builder.addCase(postCommentFetch.rejected, (state, action) => {
            const newState = { ...state };
            newState.errorMessage = action.payload.errorMessage;
            return newState;
          });
          //!delete
          builder.addCase(deleteCommentFetch.pending , (state, action)=> {
            return state;
          })
          builder.addCase(deleteCommentFetch.fulfilled, (state,action)=> {
            const newState = {...state}
            newState.message = action.payload.message;
            return newState;
          })
          builder.addCase(deleteCommentFetch.rejected, (state,action)=> {
            const newState = { ...state };
            newState.errorMessage = action.payload.errorMessage;
            return newState;
          })
    }
})

export default commentsSlice;
