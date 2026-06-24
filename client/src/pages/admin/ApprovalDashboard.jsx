import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import StatusBadge from "../../components/common/StatusBadge";
import {
  approveUser,
  fetchUsers,
  reactivateUser,
  rejectUser,
  suspendUser,
} from "../../features/users/userSlice";
import { pushToast } from "../../features/ui/uiSlice";
import { formatDate } from "../../utils/formatters";
import { getRoleLabel } from "../../utils/roleRoutes";

const managedRoles = ["manager", "viewer"];

const ApprovalDashboard = () => {
  const dispatch = useDispatch();
  const {
    error,
    loading,
    saving,
    users,
  } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const pendingUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          managedRoles.includes(user.role) &&
          user.status === "pending"
      ),
    [users]
  );

  const lifecycleUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          managedRoles.includes(user.role) &&
          ["active", "suspended", "rejected"].includes(user.status)
      ),
    [users]
  );

  const handleAction = async (action, id, title, message) => {
    await dispatch(action(id)).unwrap();
    dispatch(
      pushToast({
        title,
        message,
        type: "success",
      })
    );
  };

  if (loading) {
    return <Loader label="Loading approval queue" />;
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Identity Governance"
        title="Approval Dashboard"
        description="Approve pending registrations, suspend active access, and restore approved users with a complete lifecycle view."
      />

      {error && <div className="alert error">{error}</div>}

      <div className="metric-grid">
        <article className="metric-card">
          <div>
            <span>Pending approvals</span>
            <strong>{pendingUsers.length}</strong>
            <small>Manager and viewer requests waiting for review</small>
          </div>
        </article>

        <article className="metric-card metric-green">
          <div>
            <span>Active managed users</span>
            <strong>{lifecycleUsers.filter((user) => user.status === "active").length}</strong>
            <small>Accounts currently able to sign in</small>
          </div>
        </article>

        <article className="metric-card metric-amber">
          <div>
            <span>Suspended users</span>
            <strong>{lifecycleUsers.filter((user) => user.status === "suspended").length}</strong>
            <small>Accounts temporarily disabled</small>
          </div>
        </article>

        <article className="metric-card metric-purple">
          <div>
            <span>Rejected users</span>
            <strong>{lifecycleUsers.filter((user) => user.status === "rejected").length}</strong>
            <small>Registrations denied by admins</small>
          </div>
        </article>
      </div>

      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </td>
                <td>{getRoleLabel(user.role)}</td>
                <td><StatusBadge value={user.status} /></td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <div className="row-actions">
                    <button
                      className="button primary"
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        handleAction(
                          approveUser,
                          user._id,
                          "User approved",
                          `${user.name} can now sign in.`
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="button secondary"
                      type="button"
                      disabled={saving}
                      onClick={() =>
                        handleAction(
                          rejectUser,
                          user._id,
                          "User rejected",
                          `${user.name}'s request has been denied.`
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {pendingUsers.length === 0 && (
          <div className="table-empty">
            <EmptyState
              title="No approvals waiting"
              description="New manager and viewer registrations will appear here."
            />
          </div>
        )}
      </section>

      <section className="table-card">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lifecycleUsers.map((user) => (
              <tr key={user._id}>
                <td>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </td>
                <td>{getRoleLabel(user.role)}</td>
                <td><StatusBadge value={user.status} /></td>
                <td>{formatDate(user.updatedAt)}</td>
                <td>
                  <div className="row-actions">
                    {user.status === "active" ? (
                      <button
                        className="button secondary"
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          handleAction(
                            suspendUser,
                            user._id,
                            "User suspended",
                            `${user.name} can no longer sign in.`
                          )
                        }
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        className="button primary"
                        type="button"
                        disabled={saving}
                        onClick={() =>
                          handleAction(
                            reactivateUser,
                            user._id,
                            "User reactivated",
                            `${user.name} has active access again.`
                          )
                        }
                      >
                        Reactivate
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {lifecycleUsers.length === 0 && (
          <div className="table-empty">
            <EmptyState
              title="No managed users yet"
              description="Once approvals begin, active and inactive accounts will appear here."
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default ApprovalDashboard;
