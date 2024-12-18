import { useState } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemePreset, themePresets } from '@/utils/themes';
import { useTheme } from "@/components/ThemeProvider";
import { motion } from "framer-motion";
import { Search, Palette } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ThemeGallery() {
  const { setTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "light", "dark", "gradient"];

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
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="capitalize"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

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
                    className="h-48 rounded-md overflow-hidden"
                    style={{
                      background: theme.gradient || `hsl(${theme.colors.background})`,
                    }}
                  >
                    {/* Preview UI Elements */}
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <div
                          className="h-8 w-24 rounded"
                          style={{
                            background: `hsl(${theme.colors.card})`,
                            border: `1px solid hsl(${theme.colors.border})`
                          }}
                        />
                        <div
                          className="h-8 w-8 rounded-full"
                          style={{
                            background: `hsl(${theme.colors.primary})`
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <div
                          className="h-4 w-3/4 rounded"
                          style={{
                            background: `hsl(${theme.colors.muted})`
                          }}
                        />
                        <div
                          className="h-4 w-1/2 rounded"
                          style={{
                            background: `hsl(${theme.colors.muted})`
                          }}
                        />
                      </div>
                      <div className="flex gap-2">
                        <div
                          className="h-8 px-4 rounded flex items-center justify-center text-sm"
                          style={{
                            background: `hsl(${theme.colors.primary})`,
                            color: `hsl(${theme.colors.foreground})`
                          }}
                        >
                          Button
                        </div>
                        <div
                          className="h-8 px-3 rounded flex items-center justify-center text-sm"
                          style={{
                            background: `hsl(${theme.colors.secondary})`,
                            color: `hsl(${theme.colors.foreground})`
                          }}
                        >
                          Badge
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold flex items-center gap-2">
                      <Palette className="h-4 w-4" />
                      {theme.name}
                    </h3>
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