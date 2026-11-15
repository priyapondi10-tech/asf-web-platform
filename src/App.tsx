import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { Page, EmptyState } from './components/ui';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { ProjectDetails } from './pages/ProjectDetails';
import { Activity } from './pages/Activity';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';

export function AppRoutes() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/activity" element={<Activity />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="*" element={
          <Page title="Page not found" description="This address is not part of the demo workspace.">
            <EmptyState title="Let's get you back on track" description="Choose a screen from navigation or return to the dashboard."
              action={<Link className="button" to="/">Go to dashboard</Link>} />
          </Page>
        } />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return <HashRouter><AppRoutes /></HashRouter>;
}
