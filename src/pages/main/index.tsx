import { Title } from "@/common/components/title";
import { PlaylistsList } from "@/features/playlists-list";
import { TracksList } from "@/features/tracks-list";

export const MainPage = () => (
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

      <TracksList />
    </div>

    <div className="ml-[90px] mt-[250px] min-w-[250px] mr-[90px]">
      <PlaylistsList />
    </div>
  </div>
);
