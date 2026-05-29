import { useMemo } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constants";

axios.defaults.baseURL = `${API_BASE_URL}`;

const getAccessToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const setAccessToken = (token) => localStorage.setItem("token", token);
const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
};

const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token available");
  const response = await axios.post("auth/refresh", { refreshToken });
  const { accessToken } = response.data;
  setAccessToken(accessToken);
  return accessToken;
};

export const useAxios = () => {
  return useMemo(() => {
    const instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    instance.interceptors.request.use(
      (config) => {
        const token = getAccessToken();
        if (token) config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
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
          return instance(originalRequest);
        } catch (refreshError) {
          clearTokens();
          return Promise.reject(refreshError);
        }
      }
    );

    return instance;
  }, []);
};

export default useAxios;
