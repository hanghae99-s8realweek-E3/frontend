import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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

export const postComment = createAsyncThunk(
    "POST_COMMENT",
    async(newComment)=> {
        try {
            const response = await axios.post("http://localhost:8001/comment", newComment);
        return response.data;
        } 
        catch (error) {
            return error.message;
        }
    }
)

const initialState = {
    loading:false,
    comm:"",
    error:""
}

const followCommentSlice = createSlice({
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
          builder.addCase(postComment.pending, (state) => {
            state.loading = true;
          });
          builder.addCase(postComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comm = [...state.comm, action.payload];
            state.error = "";
          });
          builder.addCase(postComment.rejected, (state, action) => {
            state.loading = false;
            state.comm = [];
            state.error = action.error.message;
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

export default followCommentSlice;
