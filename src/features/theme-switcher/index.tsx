import { DarkThemeIcon } from "@/common/components/dark-theme-icon";
import { LightThemeIcon } from "@/common/components/light-theme-icon";
import { useTheme } from "@/hooks/use-theme";

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  const Icon = theme === "dark" ? DarkThemeIcon : LightThemeIcon;

  return (
    <button aria-label="Сменить тему" onClick={toggleTheme}>
      <Icon aria-hidden />
    </button>
  );
};
