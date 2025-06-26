import { apiClient } from "@/api/axios";

export type RegisterParams = {
  email: string;
  password: string;
};

export const register = async (params: RegisterParams) => {
  const result = await apiClient.post("/auth/register", {
    email: params.email,
    password: params.password,
  });

  return result.data;
};
