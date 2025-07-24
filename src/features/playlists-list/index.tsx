import { Playlist } from "@/common/components/playlist";
import { SkeletonPlaylists } from "@/common/components/skeleton-playlists";
import { useGetPlaylists } from "@/api/hooks/use-get-playlists";

export const PlaylistsList = () => {
  const { data, isLoading } = useGetPlaylists();

  if (isLoading) {
    return <SkeletonPlaylists count={3} />;
  }

  return (
    <>
      {data?.map((playlist, index) => (
        <Playlist playlist={playlist} key={playlist._id} index={index} />
      ))}
    </>
  );
};
