import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { getRoleHome } from "../utils/roleRoutes";

const PublicRoute = () => {
  const {
    isAuthenticated,
    isBootstrapped,
    user,
  } = useSelector((state) => state.auth);

  if (!isBootstrapped) {
    return <Loader label="Restoring session" />;
  }

  if (isAuthenticated) {
    return <Navigate to={getRoleHome(user?.role)} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
