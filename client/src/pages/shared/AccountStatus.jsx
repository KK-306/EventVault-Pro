import { Link, useLocation, useParams } from "react-router-dom";
import StatusBadge from "../../components/common/StatusBadge";

const statusContent = {
  pending: {
    title: "Approval in progress",
    body:
      "Your workspace account has been created and is waiting for an administrator to approve access.",
    support:
      "You can sign in after approval is completed.",
  },
  suspended: {
    title: "Access suspended",
    body:
      "This account has been suspended by an administrator and cannot access the platform right now.",
    support:
      "Contact your platform administrator to request reactivation.",
  },
  rejected: {
    title: "Access request rejected",
    body:
      "This registration request was rejected and cannot sign in to the workspace.",
    support:
      "Reach out to an administrator if you believe this was a mistake.",
  },
};

const AccountStatus = () => {
  const { status = "pending" } = useParams();
  const location = useLocation();
  const content = statusContent[status] || statusContent.pending;
  const email = location.state?.email;
  const role = location.state?.role;

  return (
    <div className="standalone-page">
      <div className="auth-card status-card">
        <span className="eyebrow">Access Control</span>
        <StatusBadge value={status} />
        <h1>{content.title}</h1>
        <p>{content.body}</p>
        {email && (
          <p className="status-meta">
            Account: <strong>{email}</strong>
            {role ? ` (${role})` : ""}
          </p>
        )}
        <p>{content.support}</p>

        <div className="status-actions">
          <Link className="button primary" to="/login">
            Return to Login
          </Link>
          <Link className="button secondary" to="/register">
            Create Another Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountStatus;
