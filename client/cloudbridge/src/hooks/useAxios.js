import axios from "axios";
import { API_BASE_URL } from "../constants";

axios.defaults.baseURL = `${API_BASE_URL}`;

/**
 * Retrieve the access token from storage.
 * Adjust the key/storage location to match your auth setup.
 */
const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const setAccessToken = (token) => localStorage.setItem("token", token);
const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

/** Refresh the access token using the refresh token. */
const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");

  const response = await axios.post("auth/refresh", { refreshToken });
  const { accessToken } = response.data;
  setAccessToken(accessToken);
  return accessToken;
};

export const useAxios = () => {
  const instance = axios.create();

  // ── Request interceptor ───────────────────────────────────────────────────
  // Attach the Bearer token to every outgoing request.
  instance.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ── Response interceptor ──────────────────────────────────────────────────
  // On 401, attempt a token refresh once and retry the original request.
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Bail out if:
      //  • it's not a 401
      //  • we've already retried once (_retry flag)
      //  • the failing request IS the refresh endpoint (avoid infinite loop)
      if (
        error.response?.status !== 401 ||
        originalRequest._retry ||
        originalRequest.url?.includes("auth/refresh")
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return instance(originalRequest); // retry with fresh token
      } catch (refreshError) {
        // Refresh failed – clear tokens and let the caller handle it
        // (e.g. redirect to login).
        clearTokens();
        return Promise.reject(refreshError);
      }
    }
  );

  return instance;
};

export default useAxios;