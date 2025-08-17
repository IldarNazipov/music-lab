import { useQuery } from "@tanstack/react-query";

import { getTracks } from "@/api/tracks/get-tracks";

export const useGetTracks = () =>
  useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });
