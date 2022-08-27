import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  message: "",
  token: "",
  userId: 0,
  nickname: "",
}

const usersSlice = createSlice({
  name:"users",
  initialState,
  reducers:{

  },
  extraReducers:{

  }
})

export default usersSlice;