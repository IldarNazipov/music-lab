import { getTracks } from "@/api/tracks/get-tracks";
import { useQuery } from "@tanstack/react-query";

export const useGetTracks = () => {
  const query = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });

  return query;
};
