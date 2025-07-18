import { getPlaylists } from "@/api/playlists/get-playlists";
import { getTracks } from "@/api/tracks/get-tracks";
import { Title } from "@/common/components/title";
import { TracksTable } from "@/common/components/tracks-table";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export const PlaylistPage = () => {
  const { id } = useParams();

  const { data: playlists } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

  const { data: tracks, isLoading: tracksLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });

  const targetPlaylist = playlists?.find((item) => item._id === id);
  const playlistTracks = tracks?.filter((item) =>
    targetPlaylist?.tracks.includes(item._id),
  );

  return (
    <div className="w-[70%]">
      <Title size="4xl" className="mt-[50px] mb-[60px]">
        {targetPlaylist?.name}
      </Title>

      <TracksTable tracks={playlistTracks!} isLoading={tracksLoading} />
    </div>
  );
};
