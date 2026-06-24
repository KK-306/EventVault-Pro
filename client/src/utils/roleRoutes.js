export const roleHome = {
  admin: "/admin",
  manager: "/manager",
  viewer: "/viewer",
};

export const roleLabels = {
  admin: "Admin",
  manager: "Manager",
  viewer: "Viewer",
};

export const getRoleHome = (role) => roleHome[role] || "/login";

export const getRoleLabel = (role) => roleLabels[role] || "User";
