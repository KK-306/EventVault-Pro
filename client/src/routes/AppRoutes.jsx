import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ApprovalDashboard from "../pages/admin/ApprovalDashboard";
import ActivityLogs from "../pages/admin/ActivityLogs";
import AdminDashboard from "../pages/admin/Dashboard";
import EventManagement from "../pages/admin/EventManagement";
import RoleManagement from "../pages/admin/RoleManagement";
import Settings from "../pages/admin/Settings";
import UserManagement from "../pages/admin/UserManagement";
import CreateEvent from "../pages/manager/CreateEvent";
import EditEvent from "../pages/manager/EditEvent";
import ManagerDashboard from "../pages/manager/Dashboard";
import MyEvents from "../pages/manager/MyEvents";
import EventDetails from "../pages/viewer/EventDetails";
import EventGallery from "../pages/viewer/EventGallery";
import ViewerDashboard from "../pages/viewer/Dashboard";
import AccountStatus from "../pages/shared/AccountStatus";
import NotFound from "../pages/shared/NotFound";
import Profile from "../pages/shared/Profile";
import Unauthorized from "../pages/shared/Unauthorized";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import ViewerLayout from "../layouts/ViewerLayout";
import PublicRoute from "./PublicRoute";
import RoleRedirect from "./RoleRedirect";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoleRedirect />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/account-status/:status" element={<AccountStatus />} />

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="approvals" element={<ApprovalDashboard />} />
            <Route path="activity-logs" element={<ActivityLogs />} />
            <Route path="roles" element={<RoleManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["manager"]} />}>
          <Route path="/manager" element={<ManagerLayout />}>
            <Route index element={<ManagerDashboard />} />
            <Route path="dashboard" element={<Navigate to="/manager" replace />} />
            <Route path="events" element={<MyEvents />} />
            <Route path="events/new" element={<CreateEvent />} />
            <Route path="events/:id/edit" element={<EditEvent />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["viewer"]} />}>
          <Route path="/viewer" element={<ViewerLayout />}>
            <Route index element={<ViewerDashboard />} />
            <Route path="dashboard" element={<Navigate to="/viewer" replace />} />
            <Route path="events" element={<EventGallery />} />
            <Route path="events/:id" element={<EventDetails />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
