import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/components/themeProvider";
import { Toggle } from "@repo/ui/toggle";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <Toggle onClick={toggle}>{theme === "dark" ? <Moon /> : <Sun />}</Toggle>
  );
}
