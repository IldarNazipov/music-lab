import { apiClient } from "@/api/axios";

export type LogInParams = {
  email: string;
  password: string;
};

export const logIn = async (params: LogInParams) => {
  const result = await apiClient.post("/auth/login", {
    email: params.email,
    password: params.password,
  });

  return result.data;
};
