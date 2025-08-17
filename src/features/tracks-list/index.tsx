import _ from "lodash";
import { useEffect, useMemo } from "react";

import { useGetTracks } from "@/api/hooks/use-get-tracks";
import { TracksTable } from "@/common/components/tracks-table";
import { useTracksContext } from "@/contexts/tracks/use-tracks-context";
import { useSearch } from "@/hooks/use-search";

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

  const { setBaseTracks } = useTracksContext();

  useEffect(() => {
    if (baseTracks) {
      setBaseTracks(baseTracks);
    }
  }, [baseTracks, setBaseTracks]);

  return <TracksTable tracks={searchedTracks} isLoading={isLoading} />;
};
