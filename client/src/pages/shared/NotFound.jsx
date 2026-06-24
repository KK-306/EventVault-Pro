import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoleHome } from "../../utils/roleRoutes";

const NotFound = () => {
  const {
    isAuthenticated,
    user,
  } = useSelector((state) => state.auth);
  const homePath = isAuthenticated ? getRoleHome(user?.role) : "/login";

  return (
    <div className="standalone-page">
      <div className="auth-card">
        <span className="eyebrow">404</span>
        <h1>Page Not Found</h1>
        <p>The route you opened is not part of this EventVault workspace.</p>

        <Link className="button primary" to={homePath}>
          Back to Workspace
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
