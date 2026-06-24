const Loader = ({ label = "Loading" }) => {
  return (
    <div className="loader-state">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  );
};

export const SkeletonBlock = ({ rows = 3 }) => {
  return (
    <div className="skeleton-stack">
      {Array.from({ length: rows }).map((_, index) => (
        <span className="skeleton-line" key={index} />
      ))}
    </div>
  );
};

export default Loader;
