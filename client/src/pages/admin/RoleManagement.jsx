import PageHeader from "../../components/common/PageHeader";

const RoleManagement = () => {
  const roles = [
    {
      title: "Admin",
      description: "Full operational access: users, approvals, events, analytics, and audit logs.",
      permissions: ["Manage users", "Approve events", "Delete events", "View analytics"],
    },
    {
      title: "Manager",
      description: "Event contributor access for creating and maintaining assigned events.",
      permissions: ["Create events", "Edit own events", "Upload banners", "View event list"],
    },
    {
      title: "Viewer",
      description: "Read-only access to approved event discovery and event details.",
      permissions: ["View approved events", "Open event details", "Read-only navigation"],
    },
  ];

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="RBAC Matrix"
        title="Role Management"
        description="A clear portfolio-ready snapshot of how access is separated across the platform."
      />

      <div className="role-grid">
        {roles.map((role) => (
          <article className="panel-card" key={role.title}>
            <div className="card-heading">
              <h3>{role.title}</h3>
              <span>{role.permissions.length} permissions</span>
            </div>
            <p>{role.description}</p>
            <ul className="permission-list">
              {role.permissions.map((permission) => (
                <li key={permission}>{permission}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RoleManagement;
