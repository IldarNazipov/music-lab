import { useMemo, useState } from "react";
import { TracksContext } from "./context";
import type { TrackData } from "@/api/tracks/get-tracks";

type Props = { children: React.ReactNode };

export const TracksProvider = ({ children }: Props) => {
  const [tracks, setTracks] = useState<TrackData[] | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isPlayerVisible, setPlayerVisible] = useState(false);

  const value = useMemo(
    () => ({
      tracks,
      setTracks,
      activeTrackId,
      setActiveTrackId,
      isPlayerVisible,
      setPlayerVisible,
    }),
    [activeTrackId, tracks, isPlayerVisible],
  );

  return (
    <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
  );
};
