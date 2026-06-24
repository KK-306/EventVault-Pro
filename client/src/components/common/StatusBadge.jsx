import { toTitleCase } from "../../utils/formatters";

const StatusBadge = ({ value = "pending", tone }) => {
  const resolvedTone = tone || value;

  return (
    <span className={`status-badge status-${resolvedTone}`}>
      {toTitleCase(value)}
    </span>
  );
};

export default StatusBadge;
