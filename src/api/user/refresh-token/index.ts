import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const refreshToken = async () =>
  axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
