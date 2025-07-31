import { useGetTracks } from "@/api/hooks/use-get-tracks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router";
import _ from "lodash";

type FilterType = "author" | "genre" | "date" | null;

export const useFilters = () => {
  const { data } = useGetTracks();

  const [openFilter, setOpenFilter] = useState<FilterType>(null);
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc" | null>(null);
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

  const toggleFilterItem = useCallback(
    (
      item: string,
      filterList: string[],
      setFilterList: (val: string[]) => void,
    ) => {
      if (filterList.includes(item)) {
        setFilterList(filterList.filter((i) => i !== item));
      } else {
        setFilterList([...filterList, item]);
      }
    },
    [],
  );

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
    setSelectedAuthors,
    selectedGenres,
    setSelectedGenres,
    toggleFilterItem,
    ids,
  };
};
