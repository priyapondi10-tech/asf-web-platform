import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes } from './App';

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);
}

describe('screen routes', () => {
  it.each([
    ['/', 'Dashboard'],
    ['/projects', 'Projects'],
    ['/projects/platform-foundation', 'Platform foundation'],
    ['/activity', 'Activity'],
    ['/notifications', 'Notifications'],
    ['/settings', 'Settings'],
    ['/help', 'Help'],
  ])('renders %s with a focused page heading', (path, title) => {
    renderAt(path);
    const heading = screen.getByRole('heading', { level: 1, name: title });
    expect(heading).toHaveFocus();
    expect(document.title).toBe(`${title} | ASF Platform`);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('keeps Projects selected on a detail route', () => {
    renderAt('/projects/platform-foundation');
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(within(nav).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page');
  });

  it('recovers from unknown routes', () => {
    renderAt('/missing');
    expect(screen.getByRole('heading', { name: 'Page not found', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to dashboard' })).toHaveAttribute('href', '/');
  });

  it('recovers from an unknown project ID', () => {
    renderAt('/projects/missing');
    expect(screen.getByRole('heading', { name: 'Project not found', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Browse projects' })).toBeInTheDocument();
  });
});

it('filters projects and recovers from no results', async () => {
  const user = userEvent.setup();
  renderAt('/projects');
  await user.type(screen.getByRole('searchbox', { name: 'Search projects' }), 'no-such-project');
  expect(screen.getByRole('heading', { name: 'No projects match' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Show all projects' }));
  expect(screen.getByRole('link', { name: 'Platform foundation' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('3 of 3 sample projects');
});

it('restores project filters from the URL', () => {
  renderAt('/projects?q=research&status=At%20risk');
  expect(screen.getByRole('searchbox', { name: 'Search projects' })).toHaveValue('research');
  expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('At risk');
  expect(screen.getByRole('link', { name: 'UX research' })).toBeInTheDocument();
  expect(screen.getByRole('status')).toHaveTextContent('1 of 3 sample projects');
});

it('opens the mobile menu and closes it after navigation', async () => {
  const user = userEvent.setup();
  renderAt('/');
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  await user.click(trigger);
  const dialog = screen.getByRole('dialog', { name: 'Navigation' });
  expect(dialog).toHaveAttribute('open');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await user.click(within(dialog).getByRole('link', { name: 'Help' }));
  expect(dialog).not.toHaveAttribute('open');
  expect(screen.getByRole('heading', { level: 1, name: 'Help' })).toHaveFocus();
  expect(document.body.style.overflow).toBe('');
});

it('updates demo unread counts and shows a caught-up state', async () => {
  const user = userEvent.setup();
  renderAt('/notifications');
  await user.click(screen.getByRole('checkbox', { name: 'Unread only' }));
  await user.click(screen.getByRole('button', { name: 'Mark all as read' }));
  expect(screen.getByRole('status')).toHaveTextContent('0 unread sample notifications');
  expect(screen.getByRole('heading', { name: "You're all caught up" })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Mark all as read' })).toBeDisabled();
});

it('validates settings and states the scope of a demo save', async () => {
  const user = userEvent.setup();
  renderAt('/settings');
  const name = screen.getByRole('textbox', { name: 'Display name (required)' });
  await user.clear(name);
  await user.click(screen.getByRole('button', { name: 'Save demo preferences' }));
  expect(name).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByRole('alert')).toHaveTextContent('at least 2 characters');
  expect(name).toHaveFocus();
  await user.type(name, 'Sample user');
  await user.click(screen.getByRole('button', { name: 'Save demo preferences' }));
  expect(screen.getByRole('status')).toHaveTextContent('Nothing was sent to a server');
  expect(screen.getByRole('button', { name: 'Save demo preferences' })).toBeDisabled();
});

it('recovers from an empty help search', async () => {
  const user = userEvent.setup();
  renderAt('/help');
  await user.type(screen.getByRole('searchbox', { name: 'Search help' }), 'not-a-help-topic');
  expect(screen.getByRole('heading', { name: 'No answers match' })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Clear search' }));
  expect(screen.getByText('Is my data saved?')).toBeInTheDocument();
});
