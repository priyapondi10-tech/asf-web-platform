import { matchRoutes, parsePath } from 'react-router-dom';
import { projects } from './data/demo';

export const paths = {
  home: '/',
  projects: '/projects',
  projectDetails: '/projects/:projectId',
  activity: '/activity',
  notifications: '/notifications',
  settings: '/settings',
  help: '/help',
} as const;

export const navigation = [
  { to: paths.home, label: 'Dashboard', mark: 'D' },
  { to: paths.projects, label: 'Projects', mark: 'P' },
  { to: paths.activity, label: 'Activity', mark: 'A' },
  { to: paths.notifications, label: 'Notifications', mark: 'N' },
  { to: paths.settings, label: 'Settings', mark: 'S' },
  { to: paths.help, label: 'Help', mark: '?' },
];

const routePatterns = [
  ...navigation.map((item) => ({ path: item.to })),
  { path: paths.projectDetails },
];

export function projectsReturnPath(from: unknown) {
  if (typeof from !== 'string') return paths.projects;
  const { pathname, search, hash } = parsePath(from);
  return !hash && pathname && matchRoutes([{ path: paths.projects }], pathname)
    ? `${paths.projects}${search ?? ''}` : paths.projects;
}

export function getRouteInfo(pathname: string, from?: unknown) {
  const match = matchRoutes(routePatterns, pathname)?.at(-1);
  const section = navigation.find((item) => item.to === match?.route.path);
  const isDetail = match?.route.path === paths.projectDetails;
  const project = isDetail ? projects.find((item) => item.id === match?.params.projectId) : undefined;
  const label = section?.label ?? (isDetail ? project?.name ?? 'Project not found' : 'Page not found');
  const activePath = section?.to ?? (isDetail ? paths.projects : undefined);
  const breadcrumbs: { label: string; to?: string }[] = [];

  if (match?.route.path !== paths.home) breadcrumbs.push({ label: 'ASF', to: paths.home });
  if (isDetail) breadcrumbs.push({ label: 'Projects', to: projectsReturnPath(from) });
  breadcrumbs.push({ label });
  return { label, activePath, breadcrumbs };
}
