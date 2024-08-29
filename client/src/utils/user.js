import { createSlice } from "@reduxjs/toolkit";

const parseJSON = (key) => {
  const value = localStorage.getItem(key);
  try {
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error parsing JSON from localStorage key "${key}":`, error);
    return null;
  }
};



const initialState = {
  users: parseJSON("users"),
  isStudent: parseJSON("isStudent") || false,
  regno: parseJSON("regno"),
};


const appSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.users = action.payload;
      state.regno = action.payload.regno; 
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("regno", JSON.stringify(state.regno)); 
    },
    logout: (state) => {
      state.users = null;
      state.isStudent = false;
      state.regno = null;
      localStorage.removeItem("users");
      localStorage.removeItem("isStudent");
      localStorage.removeItem("regno");
    },
    isStudent: (state, action) => {
      state.isStudent = action.payload;
      localStorage.setItem("isStudent", JSON.stringify(state.isStudent));
    },
  },
});

export const { login, logout, isStudent } = appSlice.actions;
export default appSlice.reducer;
