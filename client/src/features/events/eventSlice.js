import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { getErrorMessage } from "../../api/axios";
import {
  approveEventRequest,
  createEventRequest,
  deleteEventRequest,
  getEventById,
  getEvents,
  rejectEventRequest,
  updateEventRequest,
  uploadEventImageRequest,
} from "./eventService";

const initialState = {
  events: [],
  selectedEvent: null,
  pagination: {
    totalEvents: 0,
    currentPage: 1,
    totalPages: 1,
    count: 0,
  },
  filters: {
    search: "",
    category: "",
    status: "",
    page: 1,
    limit: 8,
  },
  loading: false,
  saving: false,
  uploadLoading: false,
  error: null,
};

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async (params = {}, thunkAPI) => {
    try {
      return await getEvents(params);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to load events")
      );
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchEventById",
  async (id, thunkAPI) => {
    try {
      return await getEventById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to load event")
      );
    }
  }
);

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, thunkAPI) => {
    try {
      return await createEventRequest(eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to create event")
      );
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/updateEvent",
  async ({ id, eventData }, thunkAPI) => {
    try {
      return await updateEventRequest(id, eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to update event")
      );
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/deleteEvent",
  async (id, thunkAPI) => {
    try {
      await deleteEventRequest(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to delete event")
      );
    }
  }
);

export const approveEvent = createAsyncThunk(
  "events/approveEvent",
  async (id, thunkAPI) => {
    try {
      return await approveEventRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to approve event")
      );
    }
  }
);

export const rejectEvent = createAsyncThunk(
  "events/rejectEvent",
  async (id, thunkAPI) => {
    try {
      return await rejectEventRequest(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to reject event")
      );
    }
  }
);

export const uploadEventImage = createAsyncThunk(
  "events/uploadImage",
  async (file, thunkAPI) => {
    try {
      return await uploadEventImageRequest(file);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Unable to upload image")
      );
    }
  }
);

const replaceEvent = (events, event) => (
  events.map((item) => (
    item._id === event._id ? event : item
  ))
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
    clearEventError: (state) => {
      state.error = null;
    },
    setEventFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetEventFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events || [];
        state.pagination = {
          totalEvents: action.payload.totalEvents || 0,
          currentPage: action.payload.currentPage || 1,
          totalPages: action.payload.totalPages || 1,
          count: action.payload.count || 0,
        };
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload.event;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.saving = false;
        state.events = [
          action.payload.event,
          ...state.events,
        ];
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.saving = false;
        state.events = replaceEvent(state.events, action.payload.event);
        state.selectedEvent = action.payload.event;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.saving = false;
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(approveEvent.fulfilled, (state, action) => {
        state.events = replaceEvent(state.events, action.payload.event);
      })
      .addCase(approveEvent.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(rejectEvent.fulfilled, (state, action) => {
        state.events = replaceEvent(state.events, action.payload.event);
      })
      .addCase(rejectEvent.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(uploadEventImage.pending, (state) => {
        state.uploadLoading = true;
        state.error = null;
      })
      .addCase(uploadEventImage.fulfilled, (state) => {
        state.uploadLoading = false;
      })
      .addCase(uploadEventImage.rejected, (state, action) => {
        state.uploadLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setEvents,
  setSelectedEvent,
  clearSelectedEvent,
  clearEventError,
  resetEventFilters,
  setEventFilters,
} = eventSlice.actions;

export default eventSlice.reducer;
