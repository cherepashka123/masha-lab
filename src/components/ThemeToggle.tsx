import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleTheme}
      className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border-border/50"
    >
      {theme === 'dark' ? (
        <>
          <Moon className="w-4 h-4" />
          Night
        </>
      ) : (
        <>
          <Sun className="w-4 h-4" />
          Day
        </>
      )}
    </Button>
  );
};