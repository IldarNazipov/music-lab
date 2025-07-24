import { getPlaylists } from "@/api/playlists/get-playlists";
import { useQuery } from "@tanstack/react-query";

export const useGetPlaylists = () =>
  useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });
