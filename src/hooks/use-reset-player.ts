import type { TrackData } from "@/api/tracks/get-tracks";
import { useEffect } from "react";
import { useLocation } from "react-router";

export const useResetPlayer = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  setActiveTrackId: (id: string | null) => void,
  setPlaying: (isPlaying: boolean) => void,
  setCurrentTime: (currentTime: number) => void,
  setDuration: (duration: number) => void,
  tracks: TrackData[] | null,
) => {
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
    tracks,
    location.pathname,
    setActiveTrackId,
    audioRef,
    setCurrentTime,
    setDuration,
    setPlaying,
  ]);
};
