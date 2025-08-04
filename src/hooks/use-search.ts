import { useSearchParams } from "react-router";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("search") || "";

  const setValue = (newValue: string) => {
    const params = new URLSearchParams(searchParams);

    if (newValue) {
      params.set("search", newValue);
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  };

  return [value, setValue] as const;
};
