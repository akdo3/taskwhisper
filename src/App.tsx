import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { useEffect } from "react";
import { initNotifications } from "./utils/notifications";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import ProjectManagement from "./pages/ProjectManagement";
import Analytics from "./pages/Analytics";
import { AppRoutes } from "./components/AppRoutes";
import { AppProviders } from "./components/AppProviders";

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
        <Toaster />
        <Sonner />
        <AppRoutes />
      </div>
    </AppProviders>
  );
};

export default App;