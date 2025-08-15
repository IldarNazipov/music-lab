import { useEffect } from "react";
import { useLocation } from "react-router";

import type { TrackData } from "@/api/tracks/get-tracks";

type UseResetPlayerProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  setActiveTrackId: (id: string | null) => void;
  setPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (currentTime: number) => void;
  setDuration: (duration: number) => void;
  baseTracks: TrackData[] | null;
};

export const useResetPlayer = ({
  audioRef,
  setActiveTrackId,
  setPlaying,
  setCurrentTime,
  setDuration,
  baseTracks,
}: UseResetPlayerProps) => {
  const location = useLocation();

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    }

    setActiveTrackId(null);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [
    location.pathname,
    baseTracks,
    setActiveTrackId,
    audioRef,
    setCurrentTime,
    setDuration,
    setPlaying,
  ]);
};
