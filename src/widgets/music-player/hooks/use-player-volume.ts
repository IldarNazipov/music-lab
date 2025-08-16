import { useEffect } from "react";

type Props = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  volume: number;
};

export const usePlayerVolume = ({ audioRef, volume }: Props) => {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);
};
