import { addToFavorites } from "@/api/tracks/add-favorite";
import { deleteFromFavorites } from "@/api/tracks/delete-favorite";
import { CoverIcon } from "@/common/components/cover-icon";
import { FavoriteIcon } from "@/common/components/favorite-icon";
import { NextIcon } from "@/common/components/next-icon";
import { PauseIcon } from "@/common/components/pause-icon";
import { PlayIcon } from "@/common/components/play-icon";
import { PrevIcon } from "@/common/components/prev-icon";
import { RepeatIcon } from "@/common/components/repeat-icon";
import { ShuffleIcon } from "@/common/components/shuffle-icon";
import { VolumeIcon } from "@/common/components/volume-icon";
import { useTracksContext } from "@/contexts/tracks/use-tracks-context";
import { cn } from "@/lib/сlassnames";
import * as Slider from "@radix-ui/react-slider";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setRepeat] = useState(false);
  const [isShuffle, setShuffle] = useState(false);

  const location = useLocation();

  const {
    activeTrackId,
    setActiveTrackId,
    isPlayerVisible,
    setPlayerVisible,
    tracks,
  } = useTracksContext();

  const currentTrackIndex = tracks?.findIndex(
    (track) => track._id === activeTrackId,
  );
  const currentTrack = tracks?.find((track) => track._id === activeTrackId);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  };

  const handleNext = () => {
    if (
      !tracks ||
      currentTrackIndex === -1 ||
      currentTrackIndex === undefined
    ) {
      return;
    }

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * (tracks.length - 1));
      if (randomIndex === currentTrackIndex) {
        setActiveTrackId(tracks[randomIndex + 1]._id);
      } else {
        setActiveTrackId(tracks[randomIndex]._id);
      }
      return;
    }

    const nextIndex = currentTrackIndex + 1;

    if (nextIndex >= tracks.length) {
      audioRef.current?.pause();
      setActiveTrackId(null);
      setPlaying(false);
      setCurrentTime(0);
      setPlayerVisible(false);
    } else {
      setActiveTrackId(tracks[nextIndex]._id);
    }
  };

  const handlePrev = () => {
    if (
      !tracks ||
      currentTrackIndex === -1 ||
      currentTrackIndex === undefined
    ) {
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    if (audio.paused) {
      audio.currentTime = 0;
      audio.play();
      setPlaying(true);
      return;
    }

    if (audio.currentTime > 2 || currentTrackIndex === 0) {
      audio.currentTime = 0;
      audio.play();
      return;
    } else {
      setActiveTrackId(tracks[currentTrackIndex - 1]._id);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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
  }, [isPlayerVisible]);

  useEffect(() => {
    if (activeTrackId !== null) {
      setPlayerVisible(true);
    }
  }, [activeTrackId, setPlayerVisible]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !tracks || currentTrackIndex === undefined) {
      return;
    }

    if (isPlayerVisible) {
      audio.src = tracks[currentTrackIndex].trackUrl;
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  }, [currentTrackIndex, tracks, isPlayerVisible]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = "";
    }
    setActiveTrackId(null);
    setPlayerVisible(false);
    setPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [tracks, location.pathname, setActiveTrackId, setPlayerVisible]);

  return (
    <>
      {isPlayerVisible && (
        <div className="w-full h-[75px] bg-[#1C1C1C] fixed bottom-0 left-0">
          <audio
            ref={audioRef}
            preload="none"
            onEnded={() => {
              if (isRepeat) {
                audioRef.current!.currentTime = 0;
                audioRef.current!.play();
              } else {
                handleNext();
              }
            }}
          />
          <div className="flex items-center w-full">
            <Slider.Root
              className="group relative flex flex-1 items-center cursor-pointer"
              min={0}
              max={duration}
              value={[currentTime]}
              onValueChange={handleSeek}
            >
              <Slider.Track className="relative h-[5px] bg-[#797979] w-full">
                <Slider.Range className="absolute h-full bg-white" />
              </Slider.Track>
              <Slider.Thumb className="h-[10px] rounded-full border-2 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Slider.Root>
          </div>
          <div className="h-[70px] items-center flex justify-between">
            <div className="gap-[33px] ml-[33px] flex">
              <button onClick={handlePrev}>
                <PrevIcon width={16} height={14} />
              </button>
              <button onClick={handlePlayPause}>
                {isPlaying ? (
                  <PauseIcon width={16} height={20} />
                ) : (
                  <PlayIcon width={16} height={20} />
                )}
              </button>
              <button onClick={handleNext}>
                <NextIcon width={17} height={14} />
              </button>
              <button onClick={() => setRepeat(!isRepeat)}>
                <RepeatIcon
                  width={20}
                  height={18}
                  className={cn({ "text-[#AD61FF]": isRepeat })}
                />
              </button>
              <button onClick={() => setShuffle(!isShuffle)}>
                <ShuffleIcon
                  width={20}
                  height={18}
                  className={cn({ "text-[#AD61FF]": isShuffle })}
                />
              </button>
              {currentTrack && (
                <div className="flex items-center text-white">
                  <CoverIcon
                    width={52}
                    height={52}
                    className="ml-[17px] mr-[17px] shrink-0"
                  />
                  <div className="mr-[31px]">
                    <div className="truncate mb-[6px]">{currentTrack.name}</div>
                    <div className="text-sm">{currentTrack.author}</div>
                  </div>
                  <button
                    className="mr-[38px]"
                    onClick={() => addToFavorites(currentTrack._id)}
                  >
                    <FavoriteIcon width={16} height={15} isFavorite={false} />
                  </button>
                  <button onClick={() => deleteFromFavorites(currentTrack._id)}>
                    <FavoriteIcon width={16} height={15} isFavorite={true} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center mr-[65px]">
              <VolumeIcon width={15} height={18} className="mr-[17px]" />
              <Slider.Root
                className="relative flex items-center w-[109px] h-5 cursor-pointer"
                min={0}
                max={1}
                step={0.01}
                defaultValue={[0.5]}
                value={[volume]}
                onValueChange={([newVolume]) => setVolume(newVolume)}
              >
                <Slider.Track className="relative h-[2px] bg-[#797979] w-full">
                  <Slider.Range className="absolute h-full bg-white" />
                </Slider.Track>
                <Slider.Thumb className="block w-[12px] h-[12px] bg-[#1C1C1C] rounded-full border-2 border-white focus:outline-none focus:ring-0 focus-visible:outline-none" />
              </Slider.Root>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
