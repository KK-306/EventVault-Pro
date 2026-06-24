import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const location = useLocation();
  const {
    isAuthenticated,
    isBootstrapped,
    user,
  } = useSelector((state) => state.auth);

  if (!isBootstrapped) {
    return <Loader label="Securing workspace" />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
