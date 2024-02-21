import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role : null,
    userId: null,
    isAuthenticated: localStorage.getItem("isLoggedIn") === "100",
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setRole(state,action){
      state.role = action.payload;
    },
    setAuthentication() {
      localStorage.setItem("isLoggedIn", "100");
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
