export const navigation = [
  { to: '/', label: 'Dashboard', mark: 'D' },
  { to: '/projects', label: 'Projects', mark: 'P' },
  { to: '/activity', label: 'Activity', mark: 'A' },
  { to: '/notifications', label: 'Notifications', mark: 'N' },
  { to: '/settings', label: 'Settings', mark: 'S' },
  { to: '/help', label: 'Help', mark: '?' },
];

export function routeLabel(path: string) {
  if (path.startsWith('/projects/')) return 'Project details';
  return navigation.find((item) => item.to === path)?.label ?? 'Page not found';
}
