import { useEffect } from "react";

import type { TrackData } from "@/api/tracks/get-tracks";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  currentTrackIndex: number | undefined;
  tracksArray: TrackData[] | null;
  setPlaying: (isPlaying: boolean) => void;
  isPlayerVisible: boolean;
};

export const useStartPlayer = ({
  audioRef,
  currentTrackIndex,
  tracksArray,
  setPlaying,
  isPlayerVisible,
}: Props) => {
  useEffect(() => {
    const audio = audioRef.current;

    if (
      !audio ||
      !tracksArray ||
      currentTrackIndex === -1 ||
      currentTrackIndex === undefined
    ) {
      return;
    }

    if (isPlayerVisible) {
      const currentTrack = tracksArray[currentTrackIndex];

      audio.src = currentTrack.trackUrl;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [audioRef, setPlaying, tracksArray, currentTrackIndex, isPlayerVisible]);
};
