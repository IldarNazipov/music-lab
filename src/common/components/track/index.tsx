import { addToFavorites } from "@/api/tracks/add-favorite";
import type { TrackData } from "@/api/tracks/get-tracks";
import { CoverIcon } from "../cover-icon";
import { FavoriteIcon } from "../favorite-icon";
import { formatDuration } from "@/lib/format-duration";

export const TrackItem = ({ track }: { track: TrackData }) => {
  const handleFavoriteClick = async (id: string) => {
    await addToFavorites(id);
  };

  return (
    <li className="grid grid-cols-[6fr_4fr_3fr_max-content] items-center mb-[12px] pr-[10px] hover:bg-neutral-800 cursor-pointer">
      <div className="flex items-center mr-[12px]">
        <CoverIcon width={52} height={52} className="shrink-0 mr-[17px]" />
        <div data-testid="track-name">{track.name}</div>
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
          <FavoriteIcon width={16} height={14} />
        </button>

        <div className="text-[#4E4E4E]">
          {formatDuration(track.durationInSeconds)}
        </div>
      </div>
    </li>
  );
};
