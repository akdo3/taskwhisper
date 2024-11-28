import { Button } from "@/components/ui/button";
import { Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { toast } from "sonner";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.remove("light", "gradient");
      document.documentElement.classList.add("dark");
      toast.success("Dark theme activated");
    } else if (theme === "dark") {
      setTheme("gradient");
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add("gradient");
      toast.success("Gradient theme activated");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark", "gradient");
      document.documentElement.classList.add("light");
      toast.success("Light theme activated");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="touch-target h-9 w-9 transition-colors duration-200"
    >
      {theme === "light" && <Sun className="h-4 w-4" />}
      {theme === "dark" && <Moon className="h-4 w-4" />}
      {theme === "gradient" && <Palette className="h-4 w-4" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}