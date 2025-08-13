import type { TrackData } from "@/api/tracks/get-tracks";
import { createContext } from "react";

type TracksContextType = {
  baseTracks: TrackData[] | null;
  setBaseTracks: (tracks: TrackData[] | null) => void;
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
};

export const TracksContext = createContext<TracksContextType | null>(null);
