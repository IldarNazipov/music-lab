import { apiClient } from "../../axios";

export type PlaylistData = {
  _id: string;
  name: string;
  owner: string;
  tracks: string[];
};

export const getPlaylists = async () => {
  const result = await apiClient.get<PlaylistData[]>("/playlists");

  return result.data;
};
