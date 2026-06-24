import {
  FaBars,
  FaMoon,
  FaSignOutAlt,
  FaSun,
  FaUserCircle,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import {
  pushToast,
  toggleSidebar,
  toggleTheme,
} from "../../features/ui/uiSlice";
import { getRoleHome, getRoleLabel } from "../../utils/roleRoutes";

const titles = {
  "/admin": "Admin Dashboard",
  "/admin/events": "Event Operations",
  "/admin/users": "User Management",
  "/admin/activity-logs": "Activity Logs",
  "/admin/roles": "Role Management",
  "/admin/settings": "Platform Settings",
  "/admin/profile": "Profile",
  "/manager": "Manager Dashboard",
  "/manager/events": "My Events",
  "/manager/events/new": "Create Event",
  "/manager/profile": "Profile",
  "/viewer": "Viewer Dashboard",
  "/viewer/events": "Event Gallery",
  "/viewer/profile": "Profile",
};

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.ui);

  const pageTitle =
    titles[location.pathname] ||
    titles[`/${location.pathname.split("/").filter(Boolean).slice(0, 2).join("/")}`] ||
    "EventVault";

  const handleLogout = () => {
    dispatch(logout());
    dispatch(pushToast({
      title: "Signed out",
      message: "Your session has been closed.",
      type: "success",
    }));
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          type="button"
          className="icon-button mobile-menu"
          onClick={() => dispatch(toggleSidebar())}
          aria-label="Open navigation"
        >
          <FaBars />
        </button>

        <div>
          <span className="eyebrow">EventVault Pro</span>
          <h2>{pageTitle}</h2>
        </div>
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="icon-button"
          onClick={() => dispatch(toggleTheme())}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>

        <Link className="profile-chip" to={`${getRoleHome(user?.role)}/profile`}>
          <FaUserCircle />
          <span>
            <strong>{user?.name || "EventVault User"}</strong>
            <small>{getRoleLabel(user?.role)}</small>
          </span>
        </Link>

        <button
          type="button"
          className="icon-button danger"
          onClick={handleLogout}
          aria-label="Logout"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
