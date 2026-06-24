import axios from "axios";
import {
  clearAuthSession,
  getToken,
} from "../utils/tokenStorage";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.includes("/auth/login")
    ) {
      clearAuthSession();
    }

    return Promise.reject(error);
  }
);

export const getErrorMessage = (error, fallback = "Something went wrong") => (
  error.response?.data?.message ||
  error.message ||
  fallback
);

export default API;
