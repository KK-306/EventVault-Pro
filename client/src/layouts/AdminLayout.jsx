import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { closeSidebar } from "../features/ui/uiSlice";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="app-shell">
      <Sidebar
        role="admin"
        isOpen={sidebarOpen}
        onClose={() => dispatch(closeSidebar())}
      />

      <main className="shell-main">
        <Navbar />
        <section className="workspace">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
