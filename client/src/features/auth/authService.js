import API from "../../api/axios";

// Register User
export const registerUser = async (userData) => {
  const response = await API.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await API.post(
    "/auth/login",
    userData
  );

  return response.data;
};

// Current User
export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");

  return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
  const response = await API.post(
    "/auth/forgot-password",
    {
      email,
    }
  );

  return response.data;
};

// Reset Password
export const resetPassword = async (
  token,
  password
) => {
  const response = await API.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};
