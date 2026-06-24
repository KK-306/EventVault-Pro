import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import EmptyState from "../../components/common/EmptyState";
import Loader from "../../components/common/Loader";
import PageHeader from "../../components/common/PageHeader";
import { fetchActivityLogs } from "../../features/activity/activitySlice";
import { formatDateTime, toTitleCase } from "../../utils/formatters";
import { getRoleLabel } from "../../utils/roleRoutes";

const ActivityLogs = () => {
  const dispatch = useDispatch();
  const {
    error,
    loading,
    logs,
  } = useSelector((state) => state.activity);
  const [query, setQuery] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    dispatch(fetchActivityLogs());
  }, [dispatch]);

  const actions = useMemo(() => (
    Array.from(new Set(logs.map((log) => log.action))).filter(Boolean)
  ), [logs]);

  const filteredLogs = useMemo(() => (
    logs.filter((log) => {
      const content = [
        log.action,
        log.user?.name,
        log.user?.email,
        log.metadata?.title,
      ].join(" ").toLowerCase();

      const matchesQuery = content.includes(query.toLowerCase());
      const matchesAction = action ? log.action === action : true;

      return matchesQuery && matchesAction;
    })
  ), [action, logs, query]);

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Audit Trail"
        title="Activity Logs"
        description="Track privileged actions, event changes, and access-sensitive platform movement."
      />

      <div className="filter-bar">
        <label className="field search-field">
          <span>Search</span>
          <div className="input-with-icon">
            <FaSearch />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search actor, action, event"
            />
          </div>
        </label>

        <label className="field">
          <span>Action</span>
          <select value={action} onChange={(event) => setAction(event.target.value)}>
            <option value="">All actions</option>
            {actions.map((item) => (
              <option value={item} key={item}>{toTitleCase(item)}</option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className="alert error">{error}</div>}
      {loading && <Loader label="Loading audit trail" />}

      {!loading && filteredLogs.length === 0 ? (
        <EmptyState
          title="No activity logs found"
          description="Audit entries will appear as users work across the platform."
        />
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Action</th>
                <th>Actor</th>
                <th>Metadata</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log._id}>
                  <td><strong>{toTitleCase(log.action)}</strong></td>
                  <td>
                    <strong>{log.user?.name || "System"}</strong>
                    <span>{getRoleLabel(log.user?.role)} · {log.user?.email || "No email"}</span>
                  </td>
                  <td>
                    <span>{log.metadata?.title || log.metadata?.eventId || "No metadata"}</span>
                  </td>
                  <td>{formatDateTime(log.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityLogs;
