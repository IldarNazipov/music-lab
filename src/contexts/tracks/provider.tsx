import { useMemo, useState } from "react";
import { TracksContext } from "./context";
import type { TrackData } from "@/api/tracks/get-tracks";

type Props = { children: React.ReactNode };

export const TracksProvider = ({ children }: Props) => {
  const [baseTracks, setBaseTracks] = useState<TrackData[] | null>(null);
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);

  const value = useMemo(
    () => ({
      baseTracks,
      setBaseTracks,
      activeTrackId,
      setActiveTrackId,
    }),
    [activeTrackId, baseTracks],
  );

  return (
    <TracksContext.Provider value={value}>{children}</TracksContext.Provider>
  );
};
