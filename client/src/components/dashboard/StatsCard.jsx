const StatsCard = ({
  icon,
  label,
  value,
  helper,
  tone = "blue",
}) => {
  return (
    <article className={`metric-card metric-${tone}`}>
      <div className="metric-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        {helper && <small>{helper}</small>}
      </div>
    </article>
  );
};

export default StatsCard;
