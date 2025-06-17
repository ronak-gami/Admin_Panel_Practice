import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  tasks: [],
};

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.users = action.payload;
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    setAllTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const { id, ...updates } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updates };
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const {
  setAllUsers,
  deleteUser,
  setAllTasks,
  addTask,
  updateTask,
  deleteTask,
} = dataSlice.actions;

export default dataSlice.reducer;
