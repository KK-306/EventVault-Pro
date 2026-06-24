import { NavLink } from "react-router-dom";
import {
  FaCalendarAlt,
  FaChartPie,
  FaClipboardList,
  FaCog,
  FaImages,
  FaShieldAlt,
  FaTachometerAlt,
  FaUserCheck,
  FaUserFriends,
} from "react-icons/fa";
import { getRoleLabel } from "../../utils/roleRoutes";

const navItems = {
  admin: [
    { label: "Dashboard", to: "/admin", icon: FaTachometerAlt, end: true },
    { label: "Events", to: "/admin/events", icon: FaCalendarAlt },
    { label: "Users", to: "/admin/users", icon: FaUserFriends },
    { label: "Approvals", to: "/admin/approvals", icon: FaUserCheck },
    { label: "Activity Logs", to: "/admin/activity-logs", icon: FaClipboardList },
    { label: "Roles", to: "/admin/roles", icon: FaShieldAlt },
    { label: "Settings", to: "/admin/settings", icon: FaCog },
  ],
  manager: [
    { label: "Dashboard", to: "/manager", icon: FaTachometerAlt, end: true },
    { label: "My Events", to: "/manager/events", icon: FaCalendarAlt },
    { label: "Create Event", to: "/manager/events/new", icon: FaChartPie },
  ],
  viewer: [
    { label: "Dashboard", to: "/viewer", icon: FaTachometerAlt, end: true },
    { label: "Event Gallery", to: "/viewer/events", icon: FaImages },
  ],
};

const Sidebar = ({ role, isOpen, onClose }) => {
  const items = navItems[role] || [];

  return (
    <>
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-mark compact">EV</div>
          <div>
            <strong>EventVault</strong>
            <span>{getRoleLabel(role)} Console</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label={`${role} navigation`}>
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (
                  `nav-item ${isActive ? "active" : ""}`
                )}
                onClick={onClose}
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      <button
        type="button"
        className={`sidebar-scrim ${isOpen ? "show" : ""}`}
        onClick={onClose}
        aria-label="Close navigation"
      />
    </>
  );
};

export default Sidebar;
