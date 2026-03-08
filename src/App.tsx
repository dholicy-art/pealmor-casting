import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientSearch from "./pages/client/ClientSearch";
import ClientActorDetail from "./pages/client/ClientActorDetail";
import ClientCompare from "./pages/client/ClientCompare";
import ClientProjects from "./pages/client/ClientProjects";
import TalentDashboard from "./pages/talent/TalentDashboard";
import TalentApprovals from "./pages/talent/TalentApprovals";
import TalentProfile from "./pages/talent/TalentProfile";
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/search" element={<ClientSearch />} />
          <Route path="/client/actor/:id" element={<ClientActorDetail />} />
          <Route path="/client/compare" element={<ClientCompare />} />
          <Route path="/client/projects" element={<ClientProjects />} />
          <Route path="/talent" element={<TalentDashboard />} />
          <Route path="/talent/approvals" element={<TalentApprovals />} />
          <Route path="/talent/profile" element={<TalentProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
