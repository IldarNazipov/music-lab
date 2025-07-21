import { Title } from "@/common/components/title";
import { TracksTable } from "@/common/components/tracks-table";
import { useGetPlaylists } from "@/hooks/use-get-playlists";
import { useGetTracks } from "@/hooks/use-get-tracks";
import { useParams } from "react-router";

export const PlaylistPage = () => {
  const { id } = useParams();
  const { data: playlists } = useGetPlaylists();
  const { data: tracks, isLoading: tracksLoading } = useGetTracks();

  const targetPlaylist = playlists?.find((item) => item._id === id);

  const playlistTracks =
    tracks?.filter((item) => targetPlaylist?.tracks.includes(item._id)) || [];

  return (
    <div className="w-[70%]">
      <Title size="4xl" className="mt-[50px] mb-[60px]">
        {targetPlaylist?.name}
      </Title>

      <TracksTable tracks={playlistTracks} isLoading={tracksLoading} />
    </div>
  );
};
