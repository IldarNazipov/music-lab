import type { TrackData } from "@/api/tracks/get-tracks";
import { createContext } from "react";

type TracksContextType = {
  tracks: TrackData[] | null;
  setTracks: (tracks: TrackData[] | null) => void;
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
  isPlayerVisible: boolean;
  setPlayerVisible: (isPlayerVisible: boolean) => void;
};

export const TracksContext = createContext<TracksContextType | null>(null);
