const EmptyState = ({
  title = "Nothing here yet",
  description = "Once data is available, it will appear here.",
  action,
}) => {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;
