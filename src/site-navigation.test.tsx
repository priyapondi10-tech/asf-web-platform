import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

const originalUrl = window.location.href;
afterEach(() => window.history.replaceState(null, '', originalUrl));

const screens = [
  { path: '/', title: 'Dashboard', crumbs: ['Dashboard'], active: 'Dashboard' },
  { path: '/projects', title: 'Projects', crumbs: ['ASF', 'Projects'], active: 'Projects' },
  { path: '/projects/platform-foundation', title: 'Platform foundation', crumbs: ['ASF', 'Projects', 'Platform foundation'], active: 'Projects' },
  { path: '/activity', title: 'Activity', crumbs: ['ASF', 'Activity'], active: 'Activity' },
  { path: '/notifications', title: 'Notifications', crumbs: ['ASF', 'Notifications'], active: 'Notifications' },
  { path: '/settings', title: 'Settings', crumbs: ['ASF', 'Settings'], active: 'Settings' },
  { path: '/help', title: 'Help', crumbs: ['ASF', 'Help'], active: 'Help' },
  { path: '/projects/missing', title: 'Project not found', crumbs: ['ASF', 'Projects', 'Project not found'], active: 'Projects' },
  { path: '/missing', title: 'Page not found', crumbs: ['ASF', 'Page not found'], active: null },
  { path: '/projects/platform-foundation/extra', title: 'Page not found', crumbs: ['ASF', 'Page not found'], active: null },
  { path: '/quiz', title: 'Page not found', crumbs: ['ASF', 'Page not found'], active: null },
];

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);
}

function logoAt(placement: string) {
  const container = placement === 'sidebar'
    ? screen.getByRole('complementary', { name: 'Workspace sidebar' })
    : screen.getByRole('banner', { name: 'Workspace header' });
  return within(container).getByRole('link', { name: 'ASF home' });
}

describe('route-wide breadcrumb and active navigation consistency', () => {
  const cases = screens.flatMap((screen) => screen.path === '/' ? [screen] :
    [screen, { ...screen, path: `${screen.path}/` }]);

  it.each(cases)('matches the rendered page at $path', ({ path, title, crumbs, active }) => {
    renderAt(path);
    expect(screen.getByRole('heading', { level: 1, name: title })).toHaveFocus();
    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    const items = within(breadcrumb).getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual(crumbs);
    expect(items.at(-1)).toHaveAttribute('aria-current', 'page');
    expect(within(items.at(-1)!).queryByRole('link')).not.toBeInTheDocument();
    expect(breadcrumb.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
    if (path !== '/') {
      expect(within(breadcrumb).getByRole('link', { name: 'ASF' })).toHaveAttribute('href', '/');
    }
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    const selected = primary.querySelectorAll('[aria-current="page"]');
    expect(selected).toHaveLength(active ? 1 : 0);
    if (active) expect(selected[0]).toHaveTextContent(active);
  });

  it.each(['/PROJECTS/', '/HELP/', '/PROJECTS/platform-foundation/'])('uses the same case-insensitive matching as the router for %s', (path) => {
    renderAt(path);
    const title = screen.getByRole('heading', { level: 1 }).textContent;
    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(breadcrumb.querySelector('[aria-current="page"]')).toHaveTextContent(title!);
    const primary = screen.getByRole('navigation', { name: 'Primary' });
    expect(primary.querySelectorAll('[aria-current="page"]')).toHaveLength(1);
  });
});

describe.each(['sidebar', 'header'])('%s home logo', (placement) => {
  it.each(screens)('returns to the dashboard from $path', async ({ path }) => {
    const user = userEvent.setup();
    renderAt(path);
    const logo = logoAt(placement);
    expect(logo).toHaveAttribute('href', '/');
    await user.click(logo);
    const heading = screen.getByRole('heading', { level: 1, name: 'Dashboard' });
    expect(heading).toBeInTheDocument();
    if (path !== '/') expect(heading).toHaveFocus();
  });
});

it.each(['/projects', '/projects/'])('preserves filtered list context through the Projects breadcrumb from %s', async (path) => {
  const user = userEvent.setup();
  renderAt(`${path}?q=research&status=At%20risk`);
  await user.click(screen.getByRole('link', { name: 'UX research' }));
  const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
  const projects = within(breadcrumb).getByRole('link', { name: 'Projects' });
  expect(projects).toHaveAttribute('href', '/projects?q=research&status=At%20risk');
  expect(screen.getByRole('link', { name: 'Back to projects' })).toHaveAttribute('href', '/projects?q=research&status=At%20risk');
  await user.click(projects);
  expect(screen.getByRole('searchbox', { name: 'Search projects' })).toHaveValue('research');
  expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('At risk');
});

it.each([null, 42, '/help', '/projects/missing', '//example.test/projects', 'https://example.test/projects'])('rejects an invalid project return target: %s', (from) => {
  render(<MemoryRouter initialEntries={[{ pathname: '/projects/platform-foundation', state: { from } }]}><AppRoutes /></MemoryRouter>);
  const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
  expect(within(breadcrumb).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', '/projects');
  expect(screen.getByRole('link', { name: 'Back to projects' })).toHaveAttribute('href', '/projects');
});

it('retains the same safe return target when a project is missing', () => {
  const from = '/projects?q=research&status=At%20risk';
  render(<MemoryRouter initialEntries={[{ pathname: '/projects/missing', state: { from } }]}><AppRoutes /></MemoryRouter>);
  const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
  expect(within(breadcrumb).getByRole('link', { name: 'Projects' })).toHaveAttribute('href', from);
  expect(screen.getByRole('link', { name: 'Browse projects' })).toHaveAttribute('href', from);
});

describe.each(['/', '/asf-web-platform/'])('HashRouter hosted at %s', (base) => {
  it.each(['sidebar', 'header', 'breadcrumb'])('keeps the %s home link on the same host and deployment path', async (placement) => {
    const user = userEvent.setup();
    window.history.replaceState(null, '', `${base}?preview=1#/projects/platform-foundation`);
    render(<HashRouter><AppRoutes /></HashRouter>);
    const home = placement === 'breadcrumb'
      ? within(screen.getByRole('navigation', { name: 'Breadcrumb' })).getByRole('link', { name: 'ASF' })
      : logoAt(placement);
    expect(home).toHaveAttribute('href', '#/');
    await user.click(home);
    expect(window.location.pathname).toBe(base);
    expect(window.location.search).toBe('?preview=1');
    expect(window.location.hash).toBe('#/');
    expect(screen.getByRole('heading', { level: 1, name: 'Dashboard' })).toHaveFocus();
  });
});
