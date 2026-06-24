import PageHeader from "../../components/common/PageHeader";

const Settings = () => {
  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="Workspace"
        title="Platform Settings"
        description="Presentation controls and operational defaults for the EventVault demo workspace."
      />

      <div className="settings-grid">
        <article className="panel-card">
          <div className="card-heading">
            <h3>Demo Readiness</h3>
            <span>Portfolio mode</span>
          </div>
          <p>
            EventVault is configured to demonstrate authentication, RBAC,
            event approvals, Cloudinary uploads, audit logs, and analytics.
          </p>
        </article>

        <article className="panel-card">
          <div className="card-heading">
            <h3>API Base URL</h3>
            <span>Vite environment</span>
          </div>
          <code>{import.meta.env.VITE_API_URL || "http://localhost:5000/api"}</code>
        </article>
      </div>
    </div>
  );
};

export default Settings;
