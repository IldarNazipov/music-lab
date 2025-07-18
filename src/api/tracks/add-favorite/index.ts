import { apiClient } from "@/api/axios";

export const addToFavorites = async (id: string) => {
  const result = await apiClient.post(`/tracks/favorite/${id}`);

  return result.data;
};
