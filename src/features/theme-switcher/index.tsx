import { DarkThemeIcon } from "@/common/components/dark-theme-icon";
import { LightThemeIcon } from "@/common/components/light-theme-icon";
import { useTheme } from "@/hooks/use-theme";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button aria-label="Сменить тему" onClick={toggleTheme}>
      {theme === "dark" ? (
        <DarkThemeIcon aria-hidden />
      ) : (
        <LightThemeIcon aria-hidden />
      )}
    </button>
  );
};
