import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getErrorMessage } from "../../api/axios";
import {
  approveUserRequest,
  createUserRequest,
  deleteUserRequest,
  getUsers,
  reactivateUserRequest,
  rejectUserRequest,
  suspendUserRequest,
  updateUserRequest,
} from "./userAPI";

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  saving: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      return await getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to load users")
      );
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData, thunkAPI) => {
    try {
      return await createUserRequest(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to create user")
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      return await updateUserRequest(id, userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to update user")
      );
    }
  }
);

export const approveUser = createAsyncThunk(
  "users/approveUser",
  async (id, thunkAPI) => {
    try {
      return await approveUserRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to approve user")
      );
    }
  }
);

export const rejectUser = createAsyncThunk(
  "users/rejectUser",
  async (id, thunkAPI) => {
    try {
      return await rejectUserRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to reject user")
      );
    }
  }
);

export const suspendUser = createAsyncThunk(
  "users/suspendUser",
  async (id, thunkAPI) => {
    try {
      return await suspendUserRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to suspend user")
      );
    }
  }
);

export const reactivateUser = createAsyncThunk(
  "users/reactivateUser",
  async (id, thunkAPI) => {
    try {
      return await reactivateUserRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to reactivate user")
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      await deleteUserRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to delete user")
      );
    }
  }
);

const replaceUser = (users, user) => (
  users.map((item) => (
    item._id === user._id ? user : item
  ))
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = [
          action.payload.user,
          ...state.users,
        ];
      })
      .addCase(createUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = replaceUser(state.users, action.payload.user);
        state.selectedUser = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(approveUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(approveUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = replaceUser(state.users, action.payload.user);
      })
      .addCase(approveUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(rejectUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(rejectUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = replaceUser(state.users, action.payload.user);
      })
      .addCase(rejectUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(suspendUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(suspendUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = replaceUser(state.users, action.payload.user);
      })
      .addCase(suspendUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(reactivateUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(reactivateUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = replaceUser(state.users, action.payload.user);
      })
      .addCase(reactivateUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.saving = false;
        state.users = state.users.filter(
          (user) => user._id !== action.payload
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export const {
  setUsers,
  setSelectedUser,
  clearSelectedUser,
  clearUserError,
} = userSlice.actions;

export default userSlice.reducer;
