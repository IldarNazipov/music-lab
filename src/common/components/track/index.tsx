import { addToFavorites } from "@/api/tracks/add-favorite";
import type { TrackData } from "@/api/tracks/get-tracks";
import { CoverIcon } from "../cover-icon";
import { FavoriteIcon } from "../favorite-icon";
import { formatDuration } from "@/lib/format-duration";
import { useTracksContext } from "@/contexts/tracks/use-tracks-context";
import { useUser } from "@/api/hooks/use-user";
import { deleteFromFavorites } from "@/api/tracks/delete-favorite";
import { useState } from "react";
import { cn } from "@/lib/сlassnames";

export const TrackItem = ({ track }: { track: TrackData }) => {
  const { activeTrackId, setActiveTrackId } = useTracksContext();
  const { data } = useUser();

  const favoriteIds = data?.favorites || [];
  const [isFavorite, setFavorite] = useState(favoriteIds.includes(track._id));

  const handleFavoriteClick = async (id: string) => {
    setFavorite(!isFavorite);

    if (!favoriteIds.includes(id)) {
      await addToFavorites(id);
    } else {
      await deleteFromFavorites(id);
    }
  };

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
        <div data-testid="track-name" className="truncate">
          {track.name}
        </div>
      </div>

      <div className="truncate">{track.author}</div>

      <div className="text-[#4E4E4E] truncate">{track.album}</div>

      <div className="flex items-center">
        <button
          className="w-[16px] h-[14px] bg-center mr-[12px]"
          onClick={(e) => {
            e.stopPropagation();
            handleFavoriteClick(track._id);
          }}
        >
          <FavoriteIcon width={16} height={15} isFavorite={isFavorite} />
        </button>

        <div className="text-[#4E4E4E]">
          {formatDuration(track.durationInSeconds)}
        </div>
      </div>
    </li>
  );
};
