import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
  users: [],
  tasks: [],
  loadingUsers: false,
  loadingTasks: false,
  errorUsers: null,
  errorTasks: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.USERS.get_all();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.TASKS.get_all();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "An unknown error occurred");
    }
  }
);
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loadingUsers = true;
        state.errorUsers = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loadingUsers = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loadingUsers = false;
        state.errorUsers = action.payload || "Failed to fetch users";
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loadingTasks = true;
        state.errorTasks = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loadingTasks = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loadingTasks = false;
        state.errorTasks = action.payload || "Failed to fetch tasks";
      });
  },
});

export const { deleteUser, setAllTasks, addTask, updateTask, deleteTask } =
  dataSlice.actions;

export default dataSlice.reducer;
