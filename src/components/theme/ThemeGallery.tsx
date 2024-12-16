import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemePreset, themePresets, applyTheme } from '@/utils/themePresets';
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function ThemeGallery() {
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "light", "dark", "gradient", "minimal", "vibrant"];

  const filteredThemes = themePresets.filter(theme => 
    theme.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategory === "all" || theme.name.toLowerCase().includes(selectedCategory))
  );

  const handleThemeSelect = (theme: ThemePreset) => {
    applyTheme(theme);
    setTheme('custom');
    toast.success(`Theme "${theme.name}" applied successfully`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <ScrollArea className="h-[500px] rounded-md border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredThemes.map((theme, index) => (
            <motion.div
              key={theme.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleThemeSelect(theme)}
              >
                <div className="p-4 space-y-4">
                  <div
                    className="h-24 rounded-md"
                    style={{
                      background: theme.gradient || `hsl(${theme.colors.primary})`,
                      border: `1px solid hsl(${theme.colors.border || theme.colors.secondary})`
                    }}
                  />
                  <div>
                    <h3 className="font-semibold">{theme.name}</h3>
                    <p className="text-sm text-muted-foreground">{theme.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}