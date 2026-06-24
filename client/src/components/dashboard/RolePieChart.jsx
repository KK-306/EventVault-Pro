const RolePieChart = ({ managers = 0, viewers = 0 }) => {
  const total = Math.max(1, managers + viewers);
  const managerAngle = (managers / total) * 360;

  return (
    <div className="chart-card">
      <div className="card-heading">
        <h3>Team Roles</h3>
        <span>Access distribution</span>
      </div>

      <div className="donut-wrap">
        <div
          className="donut"
          style={{
            background: `conic-gradient(#3b82f6 0deg ${managerAngle}deg, #8b5cf6 ${managerAngle}deg 360deg)`,
          }}
        >
          <span>{total}</span>
        </div>

        <div className="legend">
          <span><i className="legend-blue" /> Managers: {managers}</span>
          <span><i className="legend-purple" /> Viewers: {viewers}</span>
        </div>
      </div>
    </div>
  );
};

export default RolePieChart;
