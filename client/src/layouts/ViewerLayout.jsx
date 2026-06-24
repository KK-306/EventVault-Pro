import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { closeSidebar } from "../features/ui/uiSlice";

const ViewerLayout = () => {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="app-shell">
      <Sidebar
        role="viewer"
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

export default ViewerLayout;
