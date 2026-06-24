import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import activityReducer from "../features/activity/activitySlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import eventReducer from "../features/events/eventSlice";
import uiReducer from "../features/ui/uiSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: activityReducer,
    dashboard: dashboardReducer,
    events: eventReducer,
    ui: uiReducer,
    users: userReducer,
  },
});
