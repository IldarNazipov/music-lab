import * as Slider from "@radix-ui/react-slider";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";

import { useFavoriteTrack } from "@/api/hooks/use-favorite-track";
import type { TrackData } from "@/api/tracks/get-tracks";
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
import { usePlayerProgressBar } from "@/widgets/music-player/hooks/use-player-progress-bar";
import { usePlayerVolume } from "@/widgets/music-player/hooks/use-player-volume";
import { useResetPlayer } from "@/widgets/music-player/hooks/use-reset-player";
import { useStartPlayer } from "@/widgets/music-player/hooks/use-start-player";

export const MusicPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlayerVisible, setPlayerVisible] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isRepeat, setRepeat] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [tracksArray, setTracksArray] = useState<TrackData[]>([]);

  const { activeTrackId, setActiveTrackId, baseTracks } = useTracksContext();
  const { toggleFavorite, isFavorite } = useFavoriteTrack(activeTrackId);

  useEffect(() => {
    if (activeTrackId !== null) {
      setPlayerVisible(true);
    } else {
      setPlayerVisible(false);
    }
  }, [activeTrackId, setPlayerVisible]);

  useEffect(() => {
    if (!baseTracks) {
      return;
    }

    if (isShuffle) {
      setTracksArray(_.shuffle(baseTracks));
    } else {
      setTracksArray(baseTracks);
    }
  }, [baseTracks, isShuffle]);

  const currentTrackIndex = tracksArray.findIndex(
    (track) => track._id === activeTrackId,
  );

  const currentTrack =
    currentTrackIndex !== -1 ? tracksArray[currentTrackIndex] : null;

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setPlaying(false);
    } else {
      audioRef.current?.play();
      setPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (
      !tracksArray ||
      currentTrackIndex === -1 ||
      currentTrackIndex === undefined
    ) {
      return;
    }

    const nextIndex = currentTrackIndex + 1;

    if (nextIndex >= tracksArray.length) {
      setActiveTrackId(tracksArray[0]._id);
    } else {
      setActiveTrackId(tracksArray[nextIndex]._id);
    }
  };

  const handlePrevTrack = () => {
    if (
      !tracksArray ||
      currentTrackIndex === -1 ||
      currentTrackIndex === undefined
    ) {
      return;
    }

    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const PREVIOUS_TRACK_TIME_LIMIT_SECONDS = 4;

    if (
      audio.currentTime > PREVIOUS_TRACK_TIME_LIMIT_SECONDS ||
      currentTrackIndex === 0
    ) {
      audio.currentTime = 0;
      audio.play();
      setPlaying(true);
    } else {
      setActiveTrackId(tracksArray[currentTrackIndex - 1]._id);
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

  const handleTrackEnd = () => {
    if (isRepeat) {
      audioRef.current!.currentTime = 0;
      audioRef.current!.play();
    } else {
      handleNextTrack();
    }
  };

  usePlayerProgressBar({
    audioRef,
    setCurrentTime,
    setDuration,
    isPlayerVisible,
  });

  usePlayerVolume({ audioRef, volume });

  useStartPlayer({
    audioRef,
    currentTrackIndex,
    tracksArray,
    setPlaying,
    isPlayerVisible,
  });

  useResetPlayer({
    audioRef,
    setActiveTrackId,
    setPlaying,
    setCurrentTime,
    setDuration,
    baseTracks,
  });

  if (!isPlayerVisible) {
    return <audio ref={audioRef} preload="none" />;
  }

  return (
    <>
      <audio ref={audioRef} preload="none" onEnded={handleTrackEnd} />
      <div
        className="w-full h-[75px] bg-[#1C1C1C] fixed bottom-0 left-0"
        data-testid="player"
      >
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
          <div className="gap-[33px] ml-[33px] flex items-center">
            <button onClick={handlePrevTrack} data-testid="prev">
              <PrevIcon width={16} height={14} />
            </button>
            <button onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon width={16} height={20} data-testid="pause" />
              ) : (
                <PlayIcon width={16} height={20} />
              )}
            </button>
            <button onClick={handleNextTrack} data-testid="next">
              <NextIcon width={17} height={14} />
            </button>
            <button onClick={() => setRepeat(!isRepeat)} data-testid="repeat">
              <RepeatIcon
                width={20}
                height={18}
                className={cn({ "text-[#AD61FF]": isRepeat })}
              />
            </button>
            <button
              onClick={() => setShuffle(!isShuffle)}
              data-testid="shuffle"
            >
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
                  <div className="truncate mb-[6px]" data-testid="playingTrack">
                    {currentTrack.name}
                  </div>
                  <div className="text-sm">{currentTrack.author}</div>
                </div>
                <button className="mr-[38px]" onClick={toggleFavorite}>
                  <FavoriteIcon width={16} height={15} isActive={isFavorite} />
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center mr-[66px]">
            <VolumeIcon width={15} height={18} className="mr-[16px]" />
            <Slider.Root
              className="relative flex items-center w-[109px] h-5 cursor-pointer"
              min={0}
              max={1}
              step={0.1}
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
    </>
  );
};
