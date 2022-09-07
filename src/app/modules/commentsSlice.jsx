import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "./instance";

//댓글 GET
export const getComment = createAsyncThunk(
    "GET_COMMENT", 
    async(thunkApi)=> {
        try{ 
            const response = await axios.get("http://localhost:8001/comment");
            return response.data
        }
        catch (error) {
            return error.message;
        }
})

// export const getList = createAsyncThunk("GET_TODO", async () => {
//     const response = await axios.get("http://localhost:8001/comment");
//     return response.data;
// });

export const postCommentFetch = createAsyncThunk(
    "posts/postCommentFetch",
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

const initialState = {
  message:"",
  errorMessage:"",
}

const commentsSlice = createSlice({
    name:"comm",
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(getComment.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(getComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comm = action.payload;
            state.error = "";
          });
          builder.addCase(getComment.rejected, (state, action) => {
            state.loading = false;
            state.comm = [];
            state.error = action.error.message;
          });
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
    }
})

// export const followCommentSlice = createSlice({
//     name: "getComment",
//     initialState: [],
//     reducers: {},
//     extraReducers: {
//     [getComment.fulfilled]: (state, { payload }) => [...payload],
//     },
//   });

export default commentsSlice;
