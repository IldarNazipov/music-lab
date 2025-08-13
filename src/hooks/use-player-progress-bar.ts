import { useEffect } from "react";

export const usePlayerProgressBar = (
  audioRef: React.RefObject<HTMLAudioElement | null>,
  setCurrentTime: (currentTime: number) => void,
  setDuration: (duration: number) => void,
  isPlayerVisible: boolean,
) => {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [isPlayerVisible, audioRef, setCurrentTime, setDuration]);
};
