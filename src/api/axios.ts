import axios from "axios";

import { refreshToken } from "./user/refresh-token";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._isRetry) {
      originalRequest._isRetry = true;
      await refreshToken();

      return apiClient(originalRequest);
    }

    throw error;
  },
);
