import { useEffect } from "react";

type UsePlayerVolumeProps = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volume: number;
};

export const usePlayerVolume = ({ audioRef, volume }: UsePlayerVolumeProps) => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);
};
