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
        "grid grid-cols-[6fr_4fr_3fr_max-content] h-[52px] items-center pr-[10px] hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-600 cursor-pointer",
        {
          "dark:bg-neutral-700": activeTrackId === track._id,
          "bg-neutral-100": activeTrackId === track._id,
        },
      )}
    >
      <div className="flex items-center mr-[12px] min-w-0">
        <CoverIcon className="shrink-0 mr-[17px]" />
        <p data-testid="track-name" className="truncate">
          {track.name}
        </p>
      </div>

      <p className="truncate">{track.author}</p>

      <p className="text-muted-foreground truncate">{track.album}</p>

      <div className="flex items-center">
        <button
          className="w-[16px] h-[14px] bg-center mr-[12px]"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          aria-label={
            isFavorite ? "Удалить из избранного" : "Добавить в избранное"
          }
        >
          <FavoriteIcon isActive={isFavorite} aria-hidden />
        </button>

        <p className="text-muted-foreground">
          {formatDuration(track.durationInSeconds)}
        </p>
      </div>
    </li>
  );
};
