import { useState } from "react";
import { Link, Outlet } from "react-router";

import { useLogOut } from "@/api/hooks/use-logout";
import { BurgerIcon } from "@/common/components/burger-icon";
import { DarkThemeIcon } from "@/common/components/dark-theme-icon";
import { Input } from "@/common/components/input";
import { LightThemeIcon } from "@/common/components/light-theme-icon";
import { Logo } from "@/common/components/logo";
import { LogoutIcon } from "@/common/components/logout-icon";
import { SearchIcon } from "@/common/components/search-icon";
import { useSearch } from "@/hooks/use-search";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/сlassnames";

import { MusicPlayer } from "../music-player";

export const MainLayout = () => {
  const [isNavVisible, setNavVisible] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const [search, setSearch] = useSearch();

  const { mutate } = useLogOut();

  const handleLogOut = () => mutate();

  return (
    <div className="flex relative min-h-screen h-auto">
      <div
        className={cn(
          { "bg-sidebar": isNavVisible },
          "min-w-[244px] pt-[23px] pl-[35px]",
        )}
      >
        <Link to="/" aria-label="На главную" className="block w-fit mb-[28px]">
          <Logo />
        </Link>

        <button
          onClick={() => setNavVisible(!isNavVisible)}
          aria-label={isNavVisible ? "Закрыть меню" : "Открыть меню"}
        >
          <BurgerIcon
            aria-hidden
            className="text-black dark:text-[#D3D3D3] mb-[35px]"
          />
        </button>

        <div
          className={cn(
            {
              invisible: !isNavVisible,
            },
            "flex flex-col items-start gap-[26px]",
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
            onClick={handleLogOut}
          >
            Выйти
          </button>
          <button aria-label="Сменить тему" onClick={toggleTheme}>
            {theme === "dark" ? (
              <DarkThemeIcon aria-hidden />
            ) : (
              <LightThemeIcon aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div className="flex grow flex-col ml-[50px] mt-[24px]">
        <div className="flex items-center">
          <div className="relative grow">
            <SearchIcon className="absolute top-1/2 left-[9px] transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Поиск"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              name="search"
              className="pl-[40px] placeholder:text-base border-muted-foreground"
            />
          </div>

          <div className="w-[250px] mr-[90px] flex justify-end">
            <button onClick={handleLogOut} aria-label="Выйти">
              <LogoutIcon aria-hidden />
            </button>
          </div>
        </div>

        <Outlet />
      </div>
      <MusicPlayer />
    </div>
  );
};
