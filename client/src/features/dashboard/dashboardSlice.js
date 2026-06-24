import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getErrorMessage } from "../../api/axios";
import { getDashboardOverview } from "./dashboardAPI";

const initialState = {
  analytics: null,
  activity: [],
  recentEvents: [],
  loading: false,
  error: null,
};

export const fetchDashboardOverview = createAsyncThunk(
  "dashboard/fetchOverview",
  async (_, thunkAPI) => {
    try {
      return await getDashboardOverview();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to load dashboard")
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload.analytics;
        state.activity = action.payload.activity;
        state.recentEvents = action.payload.recentEvents;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDashboardError } = dashboardSlice.actions;

export default dashboardSlice.reducer;
