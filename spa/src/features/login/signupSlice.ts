import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newUserApi } from "../../api/users/create";

interface IInitial {
  status: string;
}

const initialState: IInitial = {
  status: "idle",
};

export const newUser = createAsyncThunk("users/newUser", async (data: any) => {
  const res = await newUserApi(data);
  return res.data;
});

export const signupSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(newUser.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(newUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(newUser.fulfilled, (state) => {
        state.status = "idle";
      });
  },
});

export default signupSlice.reducer;
