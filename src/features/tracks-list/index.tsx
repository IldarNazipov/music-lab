import { TracksTable } from "@/common/components/tracks-table";
import { useGetTracks } from "@/api/hooks/use-get-tracks";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import { useSearch } from "@/hooks/use-search";
import { useTracksContext } from "@/contexts/tracks/use-tracks-context";

export const TracksList = ({ ids }: { ids?: string[] }) => {
  const { data, isLoading } = useGetTracks();

  const [search] = useSearch();

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

  const { setTracks } = useTracksContext();

  useEffect(() => {
    if (baseTracks) {
      setTracks(baseTracks);
    }
  }, [baseTracks, setTracks]);

  return <TracksTable tracks={searchedTracks} isLoading={isLoading} />;
};
