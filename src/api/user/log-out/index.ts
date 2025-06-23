import { apiClient } from "@/api/axios";

export const logOut = async () => {
  const result = await apiClient.get("/auth/logout");

  return result.data;
};
