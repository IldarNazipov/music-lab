import { Playlist } from "@/common/components/playlist";
import { SkeletonPlaylists } from "@/common/components/skeleton-playlists";
import { useGetPlaylists } from "@/hooks/use-get-playlists";

export const PlaylistsList = () => {
  const { data: playlists, isLoading: playlistsLoading } = useGetPlaylists();

  return (
    <>
      {playlistsLoading ? (
        <SkeletonPlaylists count={3} />
      ) : (
        playlists?.map((playlist, index) => (
          <Playlist playlist={playlist} key={playlist._id} index={index} />
        ))
      )}
    </>
  );
};
