import { getPlaylists } from "@/api/playlists/get-playlists";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaylists = () => {
  const query = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  return query;
};
