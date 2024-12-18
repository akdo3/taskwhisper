import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect } from "react";
import { initNotifications } from "./utils/notifications";
import { AppRoutes } from "./components/AppRoutes";
import { AppProviders } from "./components/AppProviders";
import { PersistentHeader } from "./components/layout/PersistentHeader";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const App = () => {
  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <AppProviders queryClient={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <PersistentHeader />
        <Toaster />
        <Sonner />
        <AppRoutes />
      </div>
    </AppProviders>
  );
};

export default App;