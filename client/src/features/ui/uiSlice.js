import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: false,
  theme: localStorage.getItem("eventvault_theme") || "dark",
  toasts: [],
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      localStorage.setItem("eventvault_theme", state.theme);
    },
    pushToast: {
      reducer: (state, action) => {
        state.toasts.push(action.payload);
      },
      prepare: ({ title, message, type = "info" }) => ({
        payload: {
          id: `${Date.now()}-${Math.random()}`,
          title,
          message,
          type,
        },
      }),
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const {
  closeSidebar,
  openSidebar,
  pushToast,
  removeToast,
  toggleSidebar,
  toggleTheme,
} = uiSlice.actions;

export default uiSlice.reducer;
