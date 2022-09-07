import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setCookie } from "../../utils/cookie";
import instance from "./instance"


const initialState = {
    message: "",
    errorMessage: "",
    userInfo: {}
}

export const postMbtifetch = createAsyncThunk(
    "mbti/postMbti",
    async (payload,thunkAPI) => {
        try {
            const response = await instance.post("/accounts/mbti", payload);
            console.log(response)
            return thunkAPI.fulfillWithValue(response.data)
        } catch (error) {
            return thunkAPI.rejectWithValue(error.data);
        }
    }
)

const mbtiSlice = createSlice({
    name: "mbti",
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(postMbtifetch.pending, (state, action) => {
            state = action.payload;
            return state;
        });
        builder.addCase(postMbtifetch.fulfilled, (state,action) => {
        const newState = {...state};
        console.log(newState)
        newState.message = action.payload.message;
        window.localStorage.setItem("token", action.payload.token);
        return newState;
        });
        builder.addCase(postMbtifetch.rejected, (state,action) => {

        })
    }
})

export default mbtiSlice;
