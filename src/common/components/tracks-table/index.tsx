import type { TrackData } from "@/api/tracks/get-tracks";

import { DurationIcon } from "../duration-icon";
import { SkeletonTracks } from "../skeleton-tracks";
import { TrackItem } from "../track";

export const TracksTable = ({
  tracks,
  isLoading,
}: {
  tracks?: TrackData[];
  isLoading: boolean;
}) => (
  <ul className="flex flex-col p-[10px] gap-[12px] mb-[72px]">
    <li className="grid grid-cols-[6fr_4fr_3fr_70px] text-sm text-muted-foreground uppercase mb-[12px] items-center">
      <p>трек</p>
      <p>исполнитель</p>
      <p>альбом</p>
      <DurationIcon className="ml-auto mr-[10px]" />
    </li>

    {isLoading ? (
      <SkeletonTracks count={5} />
    ) : (
      tracks?.map((track) => <TrackItem track={track} key={track._id} />)
    )}
  </ul>
);
