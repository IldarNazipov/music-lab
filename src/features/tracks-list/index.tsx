import { TracksTable } from "@/common/components/tracks-table";
import { useGetTracks } from "@/api/hooks/use-get-tracks";
import { useOutletContext } from "react-router";
import { useMemo } from "react";
import _ from "lodash";

export const TracksList = ({ ids }: { ids?: string[] }) => {
  const { data, isLoading } = useGetTracks();

  const { search } = useOutletContext<{ search: string }>();

  const baseTracks = useMemo(() => {
    if (!data || !ids) {
      return data;
    }

    const filteredTracks = data.filter((track) => ids.includes(track._id));

    return _.sortBy(filteredTracks, (track) => ids.indexOf(track._id));
  }, [data, ids]);

  const searchedTracks = useMemo(() => {
    return baseTracks?.filter((track) =>
      track.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [baseTracks, search]);

  return <TracksTable tracks={searchedTracks} isLoading={isLoading} />;
};
