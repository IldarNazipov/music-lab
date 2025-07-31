import { useLogOut } from "@/api/hooks/use-logout";
import { BurgerIcon } from "@/common/components/burger-icon";
import { Input } from "@/common/components/input";
import { Logo } from "@/common/components/logo";
import { LogoutIcon } from "@/common/components/logout-icon";
import { SearchIcon } from "@/common/components/search-icon";
import { ThemeIcon } from "@/common/components/theme-icon";
import { cn } from "@/lib/сlassnames";
import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";

export const MainLayout = () => {
  const [isVisible, setVisible] = useState(false);
  const [search, setSearch] = useState("");

  const location = useLocation();

  useEffect(() => {
    setSearch("");
  }, [location.pathname]);

  const { mutate } = useLogOut();

  return (
    <div className="flex relative min-h-screen h-auto">
      <div
        className={cn(
          { "bg-[#1C1C1C]": isVisible },
          "min-w-[244px] pt-[23px] pl-[35px]",
        )}
      >
        <Link to="/">
          <Logo width={48} height={48} className="mb-[28px]" />
        </Link>

        <button
          onClick={() => setVisible(!isVisible)}
          aria-label="Открыть меню"
        >
          <BurgerIcon width={20} height={15} className="mb-[35px]" />
        </button>

        <div
          className={cn(
            {
              invisible: !isVisible,
            },
            "text-white flex flex-col gap-[26px]",
          )}
        >
          <Link to="/" className="hover:text-[#D9B6FF] active:text-[#AD61FF]">
            Главное
          </Link>
          <Link
            to="/mytracks"
            className="hover:text-[#D9B6FF] active:text-[#AD61FF]"
          >
            Мои треки
          </Link>
          <button
            className="text-left hover:text-[#D9B6FF] active:text-[#AD61FF]"
            onClick={() => mutate()}
          >
            Выйти
          </button>
          <button>
            <ThemeIcon width={40} height={40} />
          </button>
        </div>
      </div>

      <div className="flex grow flex-col ml-[50px] mt-[24px]">
        <div className="flex items-center">
          <div className="relative grow">
            <SearchIcon
              width={16}
              height={16}
              className="absolute top-1/2 left-[9px] transform -translate-y-1/2"
            />
            <Input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              className="text-white pl-[40px] placeholder:text-base border-[#4E4E4E]"
            />
          </div>

          <div className="w-[250px] mr-[90px] flex justify-end">
            <button onClick={() => mutate()}>
              <LogoutIcon width={41} height={41} />
            </button>
          </div>
        </div>

        <Outlet context={{ search, setSearch }} />
      </div>
    </div>
  );
};
