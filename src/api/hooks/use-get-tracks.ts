import { getTracks } from "@/api/tracks/get-tracks";
import { useQuery } from "@tanstack/react-query";

export const useGetTracks = (ids?: string[]) =>
  useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
    select: (data) =>
      ids ? data.filter((track) => ids.includes(track._id)) : data,
  });
