import { getTracks } from "@/api/tracks/get-tracks";
import { useQuery } from "@tanstack/react-query";

export const useGetTracks = () =>
  useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });
