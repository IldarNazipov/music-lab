import { apiClient } from "../../axios";

export type PlaylistsData = {
  _id: string;
  name: string;
  owner: string;
  tracks: string[];
};

export const getPlaylists = async () => {
  const result = await apiClient.get<PlaylistsData[]>("/playlists");

  return result.data;
};
