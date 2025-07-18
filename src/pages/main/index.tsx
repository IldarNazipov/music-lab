import { getPlaylists } from "@/api/playlists/get-playlists";
import { getTracks } from "@/api/tracks/get-tracks";
import { Title } from "@/common/components/title";
import { TracksTable } from "@/common/components/tracks-table";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

export const MainPage = () => {
  const { data: tracks, isLoading: tracksLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: getTracks,
  });

  const { data: playlists, isLoading: playlistsLoading } = useQuery({
    queryKey: ["playlists"],
    queryFn: getPlaylists,
  });

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
          <div className="animate-pulse">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-[150px] bg-[#313131] mb-[30px]"
              ></div>
            ))}
          </div>
        ) : (
          playlists?.map((playlist, index) => {
            const coverIndex = index % 3;

            return (
              <Link key={playlist._id} to={`/playlists/${playlist._id}`}>
                <div
                  className="w-full h-[150px] mb-[30px] flex items-center justify-center transition-transform duration-300 hover:scale-105"
                  style={{
                    backgroundImage: `url(src/assets/images/cover_${coverIndex}.jpg)`,
                  }}
                >
                  <span className="select-none text-white text-2xl">
                    {playlist.name}
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};
