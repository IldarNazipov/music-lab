import { Link } from "react-router";

import type { PlaylistData } from "@/api/playlists/get-playlists";

export const Playlist = ({
  playlist,
  index,
}: {
  playlist: PlaylistData;
  index: number;
}) => {
  const coverIndex = index % 3;

  return (
    <Link to={`/playlists/${playlist._id}`}>
      <div
        className="w-full h-[150px] mb-[30px] flex items-center justify-center transition-transform duration-300 hover:scale-105"
        style={{
          backgroundImage: `url(src/assets/images/cover_${coverIndex}.jpg)`,
        }}
      >
        <span className="select-none text-white text-2xl">{playlist.name}</span>
      </div>
    </Link>
  );
};
