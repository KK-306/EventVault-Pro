import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/common/Loader";
import { getRoleHome } from "../utils/roleRoutes";

const RoleRedirect = () => {
  const {
    isAuthenticated,
    isBootstrapped,
    user,
  } = useSelector((state) => state.auth);

  if (!isBootstrapped) {
    return <Loader label="Opening workspace" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={getRoleHome(user?.role)} replace />;
};

export default RoleRedirect;
