import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  token: "",
};

export const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthData: (state) => {
      state.userData = null;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { setUserData, setToken, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
