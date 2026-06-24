import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoleHome, getRoleLabel } from "../../utils/roleRoutes";

const Unauthorized = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="standalone-page">
      <div className="auth-card">
        <span className="eyebrow">Access Control</span>
        <h1>Unauthorized</h1>
        <p>
          Your {getRoleLabel(user?.role).toLowerCase()} role does not have
          permission to open this area.
        </p>

        <Link className="button primary" to={getRoleHome(user?.role)}>
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
