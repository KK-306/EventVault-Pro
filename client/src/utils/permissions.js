export const canCreateEvents = (role) => ["admin", "manager"].includes(role);
export const canManageUsers = (role) => role === "admin";
export const canApproveEvents = (role) => role === "admin";
export const canDeleteEvents = (role) => role === "admin";

export const isOwnEvent = (event, user) => {
  const createdBy = event?.createdBy;
  const createdById = typeof createdBy === "object" ? createdBy?._id : createdBy;

  return Boolean(user?._id && createdById && user._id === createdById);
};

export const canEditEvent = (event, user) => (
  user?.role === "admin" ||
  (user?.role === "manager" && isOwnEvent(event, user))
);
