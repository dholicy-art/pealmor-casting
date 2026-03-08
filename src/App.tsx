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
import ClientCastingRequest from "./pages/client/ClientCastingRequest";
import ClientLicenses from "./pages/client/ClientLicenses";
import TalentDashboard from "./pages/talent/TalentDashboard";
import TalentApprovals from "./pages/talent/TalentApprovals";
import TalentProfile from "./pages/talent/TalentProfile";
import TalentEarnings from "./pages/talent/TalentEarnings";
import TalentNotifications from "./pages/talent/TalentNotifications";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVerification from "./pages/admin/AdminVerification";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminRequests from "./pages/admin/AdminRequests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Client */}
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/search" element={<ClientSearch />} />
          <Route path="/client/actor/:id" element={<ClientActorDetail />} />
          <Route path="/client/compare" element={<ClientCompare />} />
          <Route path="/client/projects" element={<ClientProjects />} />
          <Route path="/client/casting-request/:talentId" element={<ClientCastingRequest />} />
          <Route path="/client/licenses" element={<ClientLicenses />} />
          {/* Talent */}
          <Route path="/talent" element={<TalentDashboard />} />
          <Route path="/talent/approvals" element={<TalentApprovals />} />
          <Route path="/talent/profile" element={<TalentProfile />} />
          <Route path="/talent/earnings" element={<TalentEarnings />} />
          <Route path="/talent/notifications" element={<TalentNotifications />} />
          {/* Admin */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/verification" element={<AdminVerification />} />
          <Route path="/admin/disputes" element={<AdminDisputes />} />
          <Route path="/admin/audit" element={<AdminAuditLogs />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
