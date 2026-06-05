import axios from "axios";
import { API_BASE_URL } from "../constants.js";
import { clearAuthSession } from "./auth";

const http = axios.create({
  baseURL: API_BASE_URL,
});


http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
    
  }
);

export default http;
