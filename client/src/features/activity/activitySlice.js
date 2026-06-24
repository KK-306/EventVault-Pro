import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getErrorMessage } from "../../api/axios";
import { getActivityLogs } from "./activityAPI";

const initialState = {
  logs: [],
  loading: false,
  error: null,
};

export const fetchActivityLogs = createAsyncThunk(
  "activity/fetchLogs",
  async (_, thunkAPI) => {
    try {
      return await getActivityLogs();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to load activity logs")
      );
    }
  }
);

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    clearActivityError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivityLogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityLogs.fulfilled, (state, action) => {
        state.loading = false;
        state.logs = action.payload.logs || [];
      })
      .addCase(fetchActivityLogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearActivityError } = activitySlice.actions;

export default activitySlice.reducer;
