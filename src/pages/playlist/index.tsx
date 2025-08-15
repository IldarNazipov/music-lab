import { useParams } from "react-router";

import { useGetPlaylists } from "@/api/hooks/use-get-playlists";
import { Title } from "@/common/components/title";
import { TracksList } from "@/features/tracks-list";

export const PlaylistPage = () => {
  const { id } = useParams();
  const { data } = useGetPlaylists();

  const targetPlaylist = data?.find((playlist) => playlist._id === id);

  const playlistTracksIds = targetPlaylist?.tracks || [];

  return (
    <div className="w-[70%]">
      <Title size="4xl" className="mt-[50px] mb-[60px]">
        {targetPlaylist?.name}
      </Title>

      <TracksList ids={playlistTracksIds} />
    </div>
  );
};
