import { useGetTracks } from "@/api/hooks/use-get-tracks";
import { Badge } from "@/common/components/badge";
import { Label } from "@/common/components/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/common/components/popover";
import { RadioGroup, RadioGroupItem } from "@/common/components/radio-group";
import { Title } from "@/common/components/title";
import { PlaylistsList } from "@/features/playlists-list";
import { TracksList } from "@/features/tracks-list";
import { useFilters } from "@/hooks/use-filters";
import { cn } from "@/lib/сlassnames";

export const MainPage = () => {
  const { data } = useGetTracks();

  const {
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
  } = useFilters(data);

  return (
    <div className="flex">
      <div className="w-[70%]">
        <Title size="4xl" className="mt-[50px] mb-[60px]">
          Треки
        </Title>

        <div className="flex items-center mb-[51px] whitespace-nowrap">
          <p className="mr-[12px]">Искать по:</p>
          <div className="flex gap-[10px]">
            <Popover
              open={openFilter === "author"}
              onOpenChange={() => handleOpenFilter("author")}
            >
              <PopoverTrigger asChild>
                <button className="relative border-1 px-[21px] py-[10px] rounded-full hover:border-[#580ea2] dark:hover:border-[#D9B6FF] hover:text-[#580EA2] dark:hover:text-[#D9B6FF] active:border-[#AD61FF] active:text-[#AD61FF]">
                  исполнителю
                  {Boolean(selectedAuthors.length) && (
                    <Badge className="absolute -top-2.5 -right-1">
                      {selectedAuthors.length}
                    </Badge>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] h-[305px]">
                <ul className="space-y-[28px]">
                  {allAuthors.map((name) => (
                    <li key={name}>
                      <button
                        onClick={() => toggleAuthorItem(name)}
                        className={cn(
                          "text-left hover:text-[#D9B6FF] active:text-[#AD61FF]",
                          {
                            "text-[#B672FF] underline":
                              selectedAuthors.includes(name),
                          },
                        )}
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>

            <Popover
              open={openFilter === "date"}
              onOpenChange={() => handleOpenFilter("date")}
            >
              <PopoverTrigger asChild>
                <button className="relative border-1 px-[21px] py-[10px] rounded-full hover:border-[#580ea2] dark:hover:border-[#D9B6FF] hover:text-[#580EA2] dark:hover:text-[#D9B6FF]  active:border-[#AD61FF] active:text-[#AD61FF]">
                  году выпуска
                </button>
              </PopoverTrigger>
              <PopoverContent className="overflow-hidden">
                <RadioGroup
                  value={sortingOrder}
                  onValueChange={(val: "asc" | "desc") => setSortingOrder(val)}
                  className="flex gap-6"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="desc" id="r1" />
                    <Label
                      htmlFor="r1"
                      className="text-xl font-normal cursor-pointer"
                    >
                      Более новые
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="asc" id="r2" />
                    <Label
                      htmlFor="r2"
                      className="text-xl font-normal cursor-pointer"
                    >
                      Более старые
                    </Label>
                  </div>
                </RadioGroup>
              </PopoverContent>
            </Popover>

            <Popover
              open={openFilter === "genre"}
              onOpenChange={() => handleOpenFilter("genre")}
            >
              <PopoverTrigger asChild>
                <button className="relative border-1 px-[21px] py-[10px] rounded-full hover:border-[#580ea2] dark:hover:border-[#D9B6FF] hover:text-[#580EA2] dark:hover:text-[#D9B6FF] active:border-[#AD61FF] active:text-[#AD61FF]">
                  жанру
                  {Boolean(selectedGenres.length) && (
                    <Badge className="absolute -top-2.5 -right-1">
                      {selectedGenres.length}
                    </Badge>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-[250px] h-[305px]">
                <ul className="space-y-[28px]">
                  {allGenres.map((name, index) => (
                    <li key={index}>
                      <button
                        onClick={() => toggleGenreItem(name)}
                        className={cn(
                          "text-left hover:text-[#D9B6FF] active:text-[#AD61FF]",
                          {
                            "text-[#B672FF] underline":
                              selectedGenres.includes(name),
                          },
                        )}
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <TracksList ids={ids} />
      </div>

      <div className="ml-[90px] mt-[250px] min-w-[250px] mr-[90px]">
        <PlaylistsList />
      </div>
    </div>
  );
};
