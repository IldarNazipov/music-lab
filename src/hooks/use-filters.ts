import { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import _ from "lodash";
import type { TrackData } from "@/api/tracks/get-tracks";

type FilterType = "author" | "genre" | "date" | null;
type SortingOrderType = "asc" | "desc" | null;

export const useFilters = (data?: TrackData[]) => {
  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [sortingOrder, setSortingOrder] = useState<SortingOrderType>(null);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const { setSearch } = useOutletContext<{
    setSearch: (search: string) => void;
  }>();

  const allAuthors = useMemo(
    () => [...new Set(data?.map((t) => t.author))],
    [data],
  );

  const allGenres = useMemo(
    () => [...new Set(data?.map((t) => t.genre))],
    [data],
  );

  const handleOpenFilter = useCallback((filter: FilterType) => {
    setOpenFilter((prev) => (prev === filter ? null : filter));

    if (filter !== "author") {
      setSelectedAuthors([]);
    }
    if (filter !== "genre") {
      setSelectedGenres([]);
    }
    if (filter !== "date") {
      setSortingOrder(null);
    }
  }, []);

  const toggleAuthorItem = useCallback((name: string) => {
    setSelectedAuthors((prev) => {
      if (prev.includes(name)) {
        return prev.filter((i) => i !== name);
      }
      return [...prev, name];
    });
  }, []);

  const toggleGenreItem = useCallback((name: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(name)) {
        return prev.filter((i) => i !== name);
      }
      return [...prev, name];
    });
  }, []);

  const ids = useMemo(() => {
    let filtered = data || [];

    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((track) =>
        selectedAuthors.includes(track.author),
      );
    }

    if (selectedGenres.length > 0) {
      filtered = filtered.filter((track) =>
        selectedGenres.includes(track.genre),
      );
    }

    if (sortingOrder) {
      filtered = _.orderBy(filtered, "releaseDate", sortingOrder);
    }

    return filtered.map((track) => track._id);
  }, [data, selectedAuthors, selectedGenres, sortingOrder]);

  useEffect(() => {
    setSearch("");
  }, [ids, setSearch]);

  return {
    openFilter,
    handleOpenFilter,
    sortingOrder,
    setSortingOrder,
    allAuthors,
    allGenres,
    selectedAuthors,
    toggleAuthorItem,
    selectedGenres,
    toggleGenreItem,
    ids,
  };
};
