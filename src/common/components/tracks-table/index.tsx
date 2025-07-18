import { addToFavorites } from "@/api/tracks/add-favorite";
import type { TrackData } from "@/api/tracks/get-tracks";
import { formatDuration } from "@/lib/format-duration";
import { DurationIcon } from "../duration-icon";
import { FavoriteIcon } from "../favorite-icon";

export const TracksTable = ({
  tracks,
  isLoading,
}: {
  tracks: TrackData[];
  isLoading: boolean;
}) => {
  const handleFavoriteClick = async (id: string) => {
    await addToFavorites(id);
  };

  return (
    <ul className="flex flex-col text-white p-[10px]">
      <li className="grid grid-cols-[6fr_4fr_3fr_70px] text-sm text-[#4E4E4E] mb-[24px] items-center">
        <div>ТРЕК</div>
        <div>ИСПОЛНИТЕЛЬ</div>
        <div>АЛЬБОМ</div>
        <DurationIcon className="ml-auto mr-[10px]" />
      </li>

      {isLoading
        ? Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="grid grid-cols-[6fr_4fr_3fr_70px] animate-pulse items-center mb-[12px]"
            >
              <div className="flex items-center">
                <div className="min-w-[51px] h-[51px] mr-[17px] bg-[#313131]" />
                <div className="w-full h-[19px] mr-[17px] bg-[#313131]" />
              </div>
              <div className="h-[19px] mr-[17px] bg-[#313131]" />
              <div className="h-[19px] mr-[17px] bg-[#313131]" />
              <div className="h-[19px] bg-[#313131]" />
            </li>
          ))
        : tracks?.map((track) => (
            <li
              key={track._id}
              className="grid grid-cols-[6fr_4fr_3fr_max-content] items-center mb-[12px] pr-[10px] hover:bg-neutral-800 cursor-pointer"
            >
              <div className="flex items-center mr-[12px]">
                <div className="min-w-[51px] h-[51px] bg-[url(./assets/images/cover.svg)] mr-[17px]" />
                <div>{track.name}</div>
              </div>

              <div>{track.author}</div>

              <div className="text-[#4E4E4E]">{track.album}</div>

              <div className="flex items-center">
                <button
                  className="w-[16px] h-[14px] bg-center mr-[12px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(track._id);
                  }}
                >
                  <FavoriteIcon />
                </button>

                <div className="text-[#4E4E4E]">
                  {formatDuration(track.durationInSeconds)}
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
};
