import { TracksTable } from "@/common/components/tracks-table";
import { useGetTracks } from "@/api/hooks/use-get-tracks";

export const TracksList = ({ ids }: { ids?: string[] }) => {
  const { data, isLoading } = useGetTracks(ids);

  return <TracksTable tracks={data} isLoading={isLoading} />;
};
