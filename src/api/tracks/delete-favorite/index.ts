import { apiClient } from "@/api/axios";

export const deleteFromFavorites = async (id: string) => {
  const result = await apiClient.delete(`/tracks/favorite/${id}`);

  return result.data;
};
