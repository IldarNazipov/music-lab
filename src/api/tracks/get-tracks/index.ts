import { apiClient } from "../../axios";

export type TrackData = {
  _id: string;
  name: string;
  author: string;
  releaseDate: string;
  genre: string;
  durationInSeconds: number;
  album: string;
  previewUrl: string;
  trackUrl: string;
};

export const getTracks = async () => {
  const result = await apiClient.get<TrackData[]>("/tracks");

  return result.data;
};
