import { useFavoriteTrack } from "@/api/hooks/use-favorite-track";
import type { TrackData } from "@/api/tracks/get-tracks";
import { useTracksContext } from "@/contexts/tracks/use-tracks-context";
import { formatDuration } from "@/lib/format-duration";
import { cn } from "@/lib/сlassnames";

import { CoverIcon } from "../cover-icon";
import { FavoriteIcon } from "../favorite-icon";

export const TrackItem = ({ track }: { track: TrackData }) => {
  const { activeTrackId, setActiveTrackId } = useTracksContext();
  const { isFavorite, toggleFavorite } = useFavoriteTrack(track._id);

  return (
    <li
      onClick={() => setActiveTrackId(track._id)}
      className={cn(
        "grid grid-cols-[6fr_4fr_3fr_max-content] h-[52px] items-center pr-[10px] hover:bg-neutral-800 active:bg-neutral-600 cursor-pointer",
        { "bg-neutral-700": activeTrackId === track._id },
      )}
    >
      <div className="flex items-center mr-[12px] min-w-0">
        <CoverIcon width={52} height={52} className="shrink-0 mr-[17px]" />
        <p data-testid="track-name" className="truncate">
          {track.name}
        </p>
      </div>

      <p className="truncate">{track.author}</p>

      <p className="text-[#4E4E4E] truncate">{track.album}</p>

      <div className="flex items-center">
        <button
          className="w-[16px] h-[14px] bg-center mr-[12px]"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
        >
          <FavoriteIcon width={16} height={15} isActive={isFavorite} />
        </button>

        <p className="text-[#4E4E4E]">
          {formatDuration(track.durationInSeconds)}
        </p>
      </div>
    </li>
  );
};
