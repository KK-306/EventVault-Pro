const TOKEN_KEY = "eventvault_token";
const USER_KEY = "eventvault_user";

export const getToken = () => (
  localStorage.getItem(TOKEN_KEY) ||
  localStorage.getItem("token")
);

export const getStoredUser = () => {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const setAuthSession = (token, user) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("token", token);
  }

  if (user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem("token");
};
