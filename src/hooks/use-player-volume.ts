import { useEffect } from "react";

export const usePlayerVolume = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  volume: number,
) => {
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
    }
  }, [audioRef, volume]);
};
