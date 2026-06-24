const EventChart = ({ data = [] }) => {
  const maxValue = Math.max(
    1,
    ...data.map((item) => Number(item.value || 0))
  );

  return (
    <div className="chart-card">
      <div className="card-heading">
        <h3>Event Pipeline</h3>
        <span>Status mix</span>
      </div>

      <div className="bar-chart">
        {data.map((item) => (
          <div className="bar-row" key={item.label}>
            <span>{item.label}</span>
            <div className="bar-track">
              <div
                className={`bar-fill ${item.tone || ""}`}
                style={{
                  width: `${Math.max(8, (item.value / maxValue) * 100)}%`,
                }}
              />
            </div>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventChart;
