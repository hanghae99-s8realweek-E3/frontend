import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance, { preInstance } from "./instance";
// import { setCookie } from "../../utils/cookie";
import axios from "axios";

const initialState = {
  message: "",
  errorMessage:"",
  data: [],
  mbtiData: {}
};

// 전체 Feed조회 - 최신순(기본)
export const getTodoListsFetch = createAsyncThunk(
  "todolists/gettodolistsFetch",
  async (payload, thunkAPI) => {
    try {
      // console.log("서버와의 통신 시작");
      // console.log(payload);
      let response;
      if (payload === false){
        console.log(payload)
        console.log("페이로드확인용")
        // response = await axios.get(`${process.env.REACT_APP_API}/todolists`);
        response = await preInstance.get("/todolists");
      console.log(response)
    }
      else if (payload=== true) 
      {
        response = await instance.get("/todolists");
      }
      else if(payload=== undefined)
      {
        response = await instance.get("/todolists");
      }
      // const response = await instance.get("/todolists")
      // console.log(response);
      // console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러1");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//피드 - 도전순
export const getTodoListsChallengeFetch = createAsyncThunk(
  "todolists/getTodoListsChallengeFetch",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      console.log(payload);
      let response;
      if (payload === false){
        response = await preInstance.get("/todolists?filter=challengedCounts");
      console.log(response)}
      else if (payload === true) {
        response = await instance.get("/todolists?filter=challengedCounts");
      }
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러2");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//피드 - 댓글순
export const getTodoListsCommentFetch = createAsyncThunk(
  "todolists/getTodoListsCommentFetch",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      console.log(payload);
      let response;
      if (payload === false){
        response = await preInstance.get("/todolists?filter=commentCounts");
      console.log(response)}
      else if (payload === true) {
        response = await instance.get("/todolists?filter=commentCounts");
      }
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러3");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//피드 - 특정mbti의 최신순
export const getMbtiTodoListsFetch = createAsyncThunk(
  "todolists/getMbtiTodoListsFetch",
  async (payload, thunkAPI) => {
    try {

      let response;
      if(payload.login === false){
        response = await preInstance.get(`/todolists?mbti=${payload.mbti}`);
        console.log("5")
        console.log("서버와의 통신 시작");
        console.log(payload);
      }
      else if(payload.login === true){
        response = await instance.get(`/todolists?mbti=${payload.mbti}`);
        console.log("6")
      }
      console.log(response.data)
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러4");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//피드 - 특정 mbti의 도전 순
export const getMbtiTodoListsChallengeFetch = createAsyncThunk(
  "todolists/getMbtiTodoListsChallengeFetch",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      console.log(payload);
      // axios.ins
      let response;
      if(payload.login === false){
        response = await preInstance.get(`/todolists?mbti=${payload.mbti}&filter=challengedCounts`);
      }
      else if(payload.login === true){
        response = await instance.get(`/todolists?mbti=${payload.mbti}&filter=challengedCounts`);
      }
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러5");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

//피드 - 특정 mbti의 댓글 순
export const getMbtiTodoListsCommentFetch = createAsyncThunk(
  "todolists/getMbtiTodoListsCommentFetch",
  async (payload, thunkAPI) => {
    try {
      console.log("서버와의 통신 시작");
      console.log(payload);
      // axios.ins
      let response;
      if(payload.login === false){
        response = await preInstance.get(`/todolists?mbti=${payload.mbti}&filter=commentCounts`);
      }
      else if(payload.login === true){
        response = await instance.get(`/todolists?mbti=${payload.mbti}&filter=commentCounts`);
      }
      // const response = await instance.get("/todolists")
      console.log(response);
      console.log("서버 통신 성공 값 반환해줍니다");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      console.log("서버와의 통신 에러6");
      return thunkAPI.rejectWithValue(error.data);
    }
  }
);

// 피드에서 내가 원하는 MBTI 피드만을 보고 싶을 때 설정하도록 해주는 Creator
export const getSelectMBTITodoFetch = createAsyncThunk(
  "get/getSelectMBTITodoFetch",
  async(payload, thunkAPI) => {
    try {
      const response = await instance.get("/todolists/mbti")
      return thunkAPI.fulfillWithValue(response.data)
    } catch (error) {
      console.log(error.data)
      return thunkAPI.rejectWithValue(error.data)
    }
  }
)


const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    //전체피드조회최신순기본
    builder.addCase(getTodoListsFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(getTodoListsFetch.fulfilled, (state, action) => {
      console.log(action);
      const newState = { ...state };
      newState.data = action.payload.data;
      console.log(newState);
      return newState;
    });
    builder.addCase(getTodoListsFetch.rejected, (state, action) => {
      console.log(action);
      // const newState = { ...state };
      // newState.error = action.payload.error;
      return state;
    });

    //전체피드조회 도전순
    builder.addCase(getTodoListsChallengeFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(getTodoListsChallengeFetch.fulfilled, (state, action) => {
      console.log(action);
      const newState = { ...state };
      newState.data = action.payload.data;
      console.log(newState);
      return newState;
    });
    builder.addCase(getTodoListsChallengeFetch.rejected, (state, action) => {
      console.log(action);
      // const newState = { ...state };
      // newState.error = action.payload.error;
      return state;
    });

    //전체피드조회 댓글순
    builder.addCase(getTodoListsCommentFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(getTodoListsCommentFetch.fulfilled, (state, action) => {
      console.log(action);
      const newState = { ...state };
      newState.data = action.payload.data;
      console.log(newState);
      return newState;
    });
    builder.addCase(getTodoListsCommentFetch.rejected, (state, action) => {
      console.log(action);
      // const newState = { ...state };
      // newState.error = action.payload.error;
      return state;
    });

    //피드 - 특정mbti의 최신순
    builder.addCase(getMbtiTodoListsFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(getMbtiTodoListsFetch.fulfilled, (state, action) => {
      console.log(action);
      const newState = { ...state };
      newState.data = action.payload.data;
      console.log(newState);
      return newState;
    });
    builder.addCase(getMbtiTodoListsFetch.rejected, (state, action) => {
      console.log(action);
      // const newState = { ...state };
      // newState.error = action.payload.error;
      return state;
    });
    //피드 - 특정mbti의 도전순
    builder.addCase(getMbtiTodoListsChallengeFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(
      getMbtiTodoListsChallengeFetch.fulfilled,
      (state, action) => {
        console.log(action);
        const newState = { ...state };
        newState.data = action.payload.data;
        console.log(newState);
        return newState;
      }
    );
    builder.addCase(
      getMbtiTodoListsChallengeFetch.rejected,
      (state, action) => {
        console.log(action);
        // const newState = { ...state };
        // newState.error = action.payload.error;
        return state;
      }
    );
    //피드 - 특정mbti의 댓글순
    builder.addCase(getMbtiTodoListsCommentFetch.pending, (state, action) => {
      console.log(action);
      return state;
    });
    builder.addCase(getMbtiTodoListsCommentFetch.fulfilled, (state, action) => {
      console.log(action);
      const newState = { ...state };
      newState.data = action.payload.data;
      console.log(newState);
      return newState;
    });
    builder.addCase(getMbtiTodoListsCommentFetch.rejected, (state, action) => {
      console.log(action);
      // const newState = { ...state };
      // newState.error = action.payload.error;
      return state;
    });

    //피드 - 특정mbti의 댓글순
    builder.addCase(getSelectMBTITodoFetch.pending, (state, action) => {
      return state;
    });
    builder.addCase(getSelectMBTITodoFetch.fulfilled, (state, action) => {
      const newState = { ...state };
      newState.message = action.payload.message;
      newState.mbtiData = action.payload.mbtiData;
      return newState;
    });
    builder.addCase(getSelectMBTITodoFetch.rejected, (state, action) => {
      const newState = { ...state };
      newState.errorMessage = action.payload.errorMessage;
      return state;
    });
  },
});

export default todolistsSlice;
