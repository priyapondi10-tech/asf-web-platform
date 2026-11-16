import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { paths } from './navigation';
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
        <Route path={paths.home} element={<Dashboard />} />
        <Route path={paths.projects} element={<Projects />} />
        <Route path={paths.projectDetails} element={<ProjectDetails />} />
        <Route path={paths.activity} element={<Activity />} />
        <Route path={paths.notifications} element={<Notifications />} />
        <Route path={paths.settings} element={<Settings />} />
        <Route path={paths.help} element={<Help />} />
        <Route path="*" element={
          <Page title="Page not found" description="This address is not part of the demo workspace.">
            <EmptyState title="Let's get you back on track" description="Choose a screen from navigation or return to the dashboard."
              action={<Link className="button" to={paths.home}>Go to dashboard</Link>} />
          </Page>
        } />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return <HashRouter><AppRoutes /></HashRouter>;
}
