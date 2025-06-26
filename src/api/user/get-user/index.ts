import { apiClient } from "../../axios";

export type UserData = {
  _id: string;
  email: string;
  favorites?: string[];
};

export const getUser = async () => {
  const result = await apiClient.get<UserData>("/users/me");

  return result.data;
};
