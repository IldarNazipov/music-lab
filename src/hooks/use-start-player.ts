import type { TrackData } from "@/api/tracks/get-tracks";
import { useEffect, useRef } from "react";

export const useStartPlayer = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  currentTrackIndex: number | undefined,
  tracks: TrackData[] | null,
  setPlaying: (isPlaying: boolean) => void,
  isPlayerVisible: boolean,
) => {
  const playingTrackIdRef = useRef<string | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (
      !audio ||
      !tracks ||
      currentTrackIndex === -1 ||
      currentTrackIndex === undefined
    ) {
      return;
    }

    if (isPlayerVisible) {
      const currentTrack = tracks[currentTrackIndex];

      if (playingTrackIdRef.current === currentTrack._id) {
        return;
      }

      audio.src = currentTrack.trackUrl;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));

      playingTrackIdRef.current = currentTrack._id;
    }
  }, [audioRef, setPlaying, tracks, currentTrackIndex, isPlayerVisible]);
};
