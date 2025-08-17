import { useQuery } from "@tanstack/react-query";

import { getPlaylists } from "@/api/playlists/get-playlists";

export const useGetPlaylists = () =>
  useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });
