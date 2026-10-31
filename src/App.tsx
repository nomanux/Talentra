import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/calendar/CalendarPage";
import TimeOffPage from "./pages/time-off/TimeOffPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import ProjectDetailPage from "./pages/projects/detail/ProjectDetailPage";
import TeamsPage from "./pages/teams/TeamsPage";
import EmployeesPage from "./pages/employees/EmployeesPage";
import EmployeeDetailPage from "./pages/employees/EmployeeDetailPage";
import DocumentsPage from "./pages/documents/DocumentsPage";
import IntegrationsPage from "./pages/integrations/IntegrationsPage";
import PricingPage from "./pages/pricing/PricingPage";
import SettingsPage from "./pages/settings/SettingsPage";
import HelpPage from "./pages/help/HelpPage";
import { ConfirmCodePage, LoginPage, NewPasswordPage, OnboardingPage, ResetPasswordPage, SignUpPage, SuccessPage } from "./pages/auth/AuthPages";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route path="verify" element={<ConfirmCodePage />} />
      <Route path="new-password" element={<NewPasswordPage />} />
      <Route path="onboarding" element={<OnboardingPage />} />
      <Route path="welcome" element={<SuccessPage />} />
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="time-off" element={<TimeOffPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id/:tab?" element={<ProjectDetailPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="employees/:id" element={<EmployeeDetailPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="integrations" element={<IntegrationsPage />} />
        <Route path="pricing" element={<PricingPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
