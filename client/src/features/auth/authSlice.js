import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getCurrentUser,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
} from "./authService";
import {
  clearAuthSession,
  getStoredUser,
  getToken,
  setAuthSession,
} from "../../utils/tokenStorage";
import { getErrorMessage } from "../../api/axios";

const storedToken = getToken();

const initialState = {
  user: getStoredUser(),
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  isBootstrapped: !storedToken,
  loading: false,
  actionLoading: false,
  error: null,
  message: null,
};

// ==========================
// REGISTER
// ==========================

export const register =
  createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
      try {
        return await registerUser(
          userData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(error)
        );
      }
    }
  );

// ==========================
// LOGIN
// ==========================

export const login =
  createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
      try {
        return await loginUser(
          userData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(error)
        );
      }
    }
  );

// ==========================
// CURRENT USER
// ==========================

export const fetchMe =
  createAsyncThunk(
    "auth/me",
    async (_, thunkAPI) => {
      try {
        return await getCurrentUser();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(error, "Session expired")
        );
      }
    }
  );

// ==========================
// FORGOT PASSWORD
// ==========================

export const forgot =
  createAsyncThunk(
    "auth/forgot",
    async (email, thunkAPI) => {
      try {
        return await forgotPassword(
          email
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(error)
        );
      }
    }
  );

// ==========================
// RESET PASSWORD
// ==========================

export const reset =
  createAsyncThunk(
    "auth/reset",
    async (
      { token, password },
      thunkAPI
    ) => {
      try {
        return await resetPassword(
          token,
          password
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          getErrorMessage(error)
        );
      }
    }
  );

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isBootstrapped = true;
      state.error = null;
      state.message = null;

      clearAuthSession();
    },
    clearAuthFeedback: (state) => {
      state.error = null;
      state.message = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(
        login.pending,
        (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        }
      )

      .addCase(
        login.fulfilled,
        (state, action) => {
          state.loading = false;

          state.user =
            action.payload.user;

          state.token =
            action.payload.token;

          state.isAuthenticated = true;
          state.isBootstrapped = true;

          setAuthSession(
            action.payload.token,
            action.payload.user
          );
        }
      )

      .addCase(
        login.rejected,
        (state, action) => {
          state.loading = false;
          state.isAuthenticated = false;

          state.error =
            action.payload;
        }
      )

      // CURRENT USER
      .addCase(
        fetchMe.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMe.fulfilled,
        (state, action) => {
          state.loading = false;
          state.isBootstrapped = true;
          state.isAuthenticated = true;
          state.user = action.payload.user;

          setAuthSession(
            state.token,
            action.payload.user
          );
        }
      )

      .addCase(
        fetchMe.rejected,
        (state, action) => {
          state.loading = false;
          state.isBootstrapped = true;
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          state.error = action.payload;

          clearAuthSession();
        }
      )

      // REGISTER
      .addCase(
        register.pending,
        (state) => {
          state.actionLoading = true;
          state.error = null;
          state.message = null;
        }
      )

      .addCase(
        register.fulfilled,
        (state, action) => {
          state.actionLoading = false;
          state.message =
            action.payload.message ||
            "Account created successfully";
        }
      )

      .addCase(
        register.rejected,
        (state, action) => {
          state.actionLoading = false;

          state.error =
            action.payload;
        }
      )

      // FORGOT PASSWORD
      .addCase(
        forgot.pending,
        (state) => {
          state.actionLoading = true;
          state.error = null;
          state.message = null;
        }
      )

      .addCase(
        forgot.fulfilled,
        (state, action) => {
          state.actionLoading = false;
          state.message =
            action.payload.message ||
            "Password reset email sent";
        }
      )

      .addCase(
        forgot.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      )

      // RESET PASSWORD
      .addCase(
        reset.pending,
        (state) => {
          state.actionLoading = true;
          state.error = null;
          state.message = null;
        }
      )

      .addCase(
        reset.fulfilled,
        (state, action) => {
          state.actionLoading = false;
          state.message =
            action.payload.message ||
            "Password reset successful";
        }
      )

      .addCase(
        reset.rejected,
        (state, action) => {
          state.actionLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearAuthFeedback,
  logout,
} =
  authSlice.actions;

export default authSlice.reducer;
