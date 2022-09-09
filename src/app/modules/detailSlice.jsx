import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import instance from "./instance"


const initialState = {
    message:"",
    data:[],
}

export const postFeedDetailFetch = createAsyncThunk(
    'detail/postFeedDetailFetch',
    async (payload, thunkAPI) => {
        try {
            const response = await instance.post(`/mytodos/${payload}/challenged`)
            return thunkAPI.fulfillWithValue(response.data);
        }catch(error) {
            return thunkAPI.rejectWithValue(error.data)
        }
    }
)

export const getFeedDetailFetch = createAsyncThunk(
    'detail/getFeedDetailFetch',
    async (payload, thunkAPI) => {
        try {
        const response = await instance.get(`/todolists/${payload.todoId}`)
        return thunkAPI.fulfillWithValue(response.data);
        }
        catch (error) {
        return thunkAPI.rejectWithValue(error.data);
    }
    }
    )

const detailSlice = createSlice({
    name:"detail",
    initialState,
    reducers:{},
    extraReducers: builder => {
        //!get
        builder.addCase(getFeedDetailFetch.pending , (state, action)=> {
            return state;
        })
        builder.addCase(getFeedDetailFetch.fulfilled, (state, action)=> {
            const newState ={...state}
            newState.message = action.payload.message;
            newState.data = action.payload.data;
            return newState;
        })
        builder.addCase(getFeedDetailFetch.rejected, (state, action)=> {
            const newState = {...state };
            newState.errorMessage = action.payload.errorMessage;
            return newState;
        })
        //!post
        builder.addCase(postFeedDetailFetch.pending, (state,action)=> {
            return state;
        })
        builder.addCase(postFeedDetailFetch.fulfilled, (state, action)=> {
            const newState = {...state}
            newState.message = action.payload.message;
            return newState;
        })
        builder.addCase(postFeedDetailFetch.rejected, (state, action)=> {
            const newState = {...state };
            newState.errorMessage = action.payload.errorMessage;
            return newState;
        })
    }
})

export default detailSlice;