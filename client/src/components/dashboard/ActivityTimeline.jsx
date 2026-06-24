import { formatDateTime, toTitleCase } from "../../utils/formatters";
import EmptyState from "../common/EmptyState";

const ActivityTimeline = ({ logs = [] }) => {
  if (logs.length === 0) {
    return (
      <EmptyState
        title="No activity yet"
        description="System actions will appear here as your team works."
      />
    );
  }

  return (
    <div className="timeline">
      {logs.slice(0, 8).map((log) => (
        <article className="timeline-item" key={log._id}>
          <span className="timeline-dot" />
          <div>
            <strong>{toTitleCase(log.action)}</strong>
            <p>
              {log.user?.name || "System"} performed this action
              {log.metadata?.title ? ` on ${log.metadata.title}` : ""}.
            </p>
            <small>{formatDateTime(log.createdAt)}</small>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ActivityTimeline;
