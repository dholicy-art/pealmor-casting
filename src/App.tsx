import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "@/i18n/I18nContext";
import { ThemeProvider } from "@/theme/ThemeContext";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientSearch from "./pages/client/ClientSearch";
import ClientActorDetail from "./pages/client/ClientActorDetail";
import ClientCompare from "./pages/client/ClientCompare";
import ClientProjects from "./pages/client/ClientProjects";
import ClientCastingRequest from "./pages/client/ClientCastingRequest";
import ClientLicenses from "./pages/client/ClientLicenses";
import ClientAudition from "./pages/client/ClientAudition";
import ClientSettings from "./pages/client/ClientSettings";
import ActorNetwork from "./pages/client/ActorNetwork";
import ActorTeams from "./pages/client/ActorTeams";
import ActorUniverses from "./pages/client/ActorUniverses";
import AutoCasting from "./pages/client/AutoCasting";
import TalentDashboard from "./pages/talent/TalentDashboard";
import TalentApprovals from "./pages/talent/TalentApprovals";
import TalentProfile from "./pages/talent/TalentProfile";
import TalentEarnings from "./pages/talent/TalentEarnings";
import TalentLicenses from "./pages/talent/TalentLicenses";
import TalentNotifications from "./pages/talent/TalentNotifications";
import TalentSettings from "./pages/talent/TalentSettings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminVerification from "./pages/admin/AdminVerification";
import AdminDisputes from "./pages/admin/AdminDisputes";
import AdminAuditLogs from "./pages/admin/AdminAuditLogs";
import AdminRequests from "./pages/admin/AdminRequests";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
    <I18nProvider>
      <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            {/* Client — Discovery & Orchestration (requires login) */}
            <Route path="/client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
            <Route path="/client/search" element={<ProtectedRoute><ClientSearch /></ProtectedRoute>} />
            <Route path="/client/actor/:id" element={<ProtectedRoute><ClientActorDetail /></ProtectedRoute>} />
            <Route path="/client/compare" element={<ProtectedRoute><ClientCompare /></ProtectedRoute>} />
            <Route path="/client/projects" element={<ProtectedRoute><ClientProjects /></ProtectedRoute>} />
            <Route path="/client/casting-request/:talentId" element={<ProtectedRoute><ClientCastingRequest /></ProtectedRoute>} />
            <Route path="/client/licenses" element={<ProtectedRoute><ClientLicenses /></ProtectedRoute>} />
            <Route path="/client/audition" element={<ProtectedRoute><ClientAudition /></ProtectedRoute>} />
            <Route path="/client/network" element={<ProtectedRoute><ActorNetwork /></ProtectedRoute>} />
            <Route path="/client/teams" element={<ProtectedRoute><ActorTeams /></ProtectedRoute>} />
            <Route path="/client/universes" element={<ProtectedRoute><ActorUniverses /></ProtectedRoute>} />
            <Route path="/client/autocast" element={<ProtectedRoute><AutoCasting /></ProtectedRoute>} />
            <Route path="/client/settings" element={<ProtectedRoute><ClientSettings /></ProtectedRoute>} />
            {/* Talent — Profile & Approvals (requires login) */}
            <Route path="/talent" element={<ProtectedRoute><TalentDashboard /></ProtectedRoute>} />
            <Route path="/talent/approvals" element={<ProtectedRoute><TalentApprovals /></ProtectedRoute>} />
            <Route path="/talent/profile" element={<ProtectedRoute><TalentProfile /></ProtectedRoute>} />
            <Route path="/talent/earnings" element={<ProtectedRoute><TalentEarnings /></ProtectedRoute>} />
            <Route path="/talent/licenses" element={<ProtectedRoute><TalentLicenses /></ProtectedRoute>} />
            <Route path="/talent/notifications" element={<ProtectedRoute><TalentNotifications /></ProtectedRoute>} />
            <Route path="/talent/settings" element={<ProtectedRoute><TalentSettings /></ProtectedRoute>} />
            {/* Admin — Compliance via PEALMOR (requires admin role) */}
            <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/verification" element={<ProtectedRoute requireAdmin><AdminVerification /></ProtectedRoute>} />
            <Route path="/admin/disputes" element={<ProtectedRoute requireAdmin><AdminDisputes /></ProtectedRoute>} />
            <Route path="/admin/audit" element={<ProtectedRoute requireAdmin><AdminAuditLogs /></ProtectedRoute>} />
            <Route path="/admin/requests" element={<ProtectedRoute requireAdmin><AdminRequests /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><AdminSettings /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AuthProvider>
    </I18nProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
