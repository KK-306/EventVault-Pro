import {
  FaEnvelope,
  FaShieldAlt,
  FaUserCircle,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import { formatDate } from "../../utils/formatters";
import { getRoleLabel } from "../../utils/roleRoutes";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Account"
        title="Profile"
        description="Review the signed-in identity and role assignment for this workspace."
        actions={<StatusBadge value={user?.status || "active"} tone="approved" />}
      />

      <section className="profile-summary panel-card">
        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <div>
          <span className="eyebrow">{getRoleLabel(user?.role)}</span>
          <h2>{user?.name || "EventVault User"}</h2>
          <p>{user?.email || "No email available"}</p>
        </div>
      </section>

      <section className="detail-grid">
        <article className="panel-card">
          <div className="card-heading">
            <h3>Identity</h3>
            <span>Session details</span>
          </div>

          <div className="detail-list">
            <span><FaEnvelope /> {user?.email || "No email available"}</span>
            <span><FaShieldAlt /> {getRoleLabel(user?.role)} access</span>
          </div>
        </article>

        <article className="panel-card">
          <div className="card-heading">
            <h3>Account State</h3>
            <span>Access status</span>
          </div>

          <div className="detail-list">
            <span>Joined {formatDate(user?.createdAt)}</span>
            <span>Status: {user?.status || "active"}</span>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Profile;
