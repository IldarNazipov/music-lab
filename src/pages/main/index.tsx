import { Playlist } from "@/common/components/playlist";
import { SkeletonPlaylists } from "@/common/components/skeleton-playlists";
import { Title } from "@/common/components/title";
import { TracksTable } from "@/common/components/tracks-table";
import { useGetPlaylists } from "@/hooks/use-get-playlists";
import { useGetTracks } from "@/hooks/use-get-tracks";

export const MainPage = () => {
  const { data: tracks, isLoading: tracksLoading } = useGetTracks();
  const { data: playlists, isLoading: playlistsLoading } = useGetPlaylists();

  return (
    <div className="flex">
      <div className="text-white w-[70%]">
        <Title size="4xl" className="mt-[50px] mb-[60px]">
          Треки
        </Title>

        <div className="flex items-center mb-[51px]">
          <div className="mr-[12px]">Искать по:</div>
          <div className="flex gap-[10px]">
            <button className="border-1 px-[21px] py-[10px] rounded-full hover:border-[#D9B6FF] hover:text-[#D9B6FF] active:border-[#AD61FF] active:text-[#AD61FF]">
              исполнителю
            </button>
            <button className="border-1 px-[21px] py-[10px] rounded-full hover:border-[#D9B6FF] hover:text-[#D9B6FF] active:border-[#AD61FF] active:text-[#AD61FF]">
              году выпуска
            </button>
            <button className="border-1 px-[21px] py-[10px] rounded-full hover:border-[#D9B6FF] hover:text-[#D9B6FF] active:border-[#AD61FF] active:text-[#AD61FF]">
              жанру
            </button>
          </div>
        </div>

        <TracksTable tracks={tracks!} isLoading={tracksLoading} />
      </div>

      <div className="ml-[90px] mt-[250px] min-w-[250px] mr-[90px]">
        {playlistsLoading ? (
          <SkeletonPlaylists count={3} />
        ) : (
          playlists?.map((playlist, index) => (
            <Playlist playlist={playlist} index={index} />
          ))
        )}
      </div>
    </div>
  );
};
