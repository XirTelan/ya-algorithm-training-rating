import { useTheme } from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { Toggle } from "./ui/toggle";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <Toggle aria-label="Switch theme" onClick={toggle}>
      {theme === "dark" ? <Moon /> : <Sun />}
    </Toggle>
  );
}
