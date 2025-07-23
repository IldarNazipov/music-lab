import { TracksTable } from "@/common/components/tracks-table";
import { useGetTracks } from "@/hooks/use-get-tracks";

export const TracksList = ({ ids }: { ids?: string[] }) => {
  const { data: tracks, isLoading: tracksLoading } = useGetTracks();

  const tracksToRender = ids
    ? tracks?.filter((track) => ids.includes(track._id))
    : tracks;

  return <TracksTable tracks={tracksToRender} isLoading={tracksLoading} />;
};
