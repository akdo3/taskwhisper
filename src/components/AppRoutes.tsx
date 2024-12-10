import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Settings from "@/pages/Settings";
import ProjectManagement from "@/pages/ProjectManagement";
import Analytics from "@/pages/Analytics";
import ThemeCustomizer from "@/pages/ThemeCustomizer";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/projects" element={<ProjectManagement />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/theme" element={<ThemeCustomizer />} />
    </Routes>
  );
};