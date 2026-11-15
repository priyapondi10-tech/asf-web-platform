import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { expect, it } from 'vitest';
import { AppRoutes } from './App';

function renderAt(path: string) {
  return render(<MemoryRouter initialEntries={[path]}><AppRoutes /></MemoryRouter>);
}

it('moves skip-link focus to main without changing the hash route', async () => {
  const user = userEvent.setup();
  renderAt('/projects');
  await user.click(screen.getByRole('link', { name: 'Skip to main content' }));
  expect(screen.getByRole('main')).toHaveFocus();
  expect(screen.getByRole('heading', { name: 'Projects', level: 1 })).toBeInTheDocument();
});

it('returns from project details to the filtered project URL', async () => {
  const user = userEvent.setup();
  renderAt('/projects?q=research&status=At%20risk');
  await user.click(screen.getByRole('link', { name: 'UX research' }));
  expect(screen.getByRole('heading', { level: 1, name: 'UX research' })).toHaveFocus();
  await user.click(screen.getByRole('link', { name: 'Back to projects' }));
  expect(screen.getByRole('searchbox', { name: 'Search projects' })).toHaveValue('research');
  expect(screen.getByRole('combobox', { name: 'Status' })).toHaveValue('At risk');
  expect(screen.getByRole('status')).toHaveTextContent('1 of 3 sample projects');
});

it('links help to the public setup guide and roadmap', () => {
  renderAt('/help');
  expect(screen.getByRole('link', { name: 'Setup documentation' })).toHaveAttribute('href',
    'https://github.com/priyapondi10-tech/asf-web-platform#getting-started');
  expect(screen.getByRole('link', { name: 'View UX roadmap' })).toHaveAttribute('href',
    'https://github.com/priyapondi10-tech/asf-web-platform/blob/main/docs/UX_ROADMAP.md');
});

it('clears menu state and scroll lock when explicitly closed', async () => {
  const user = userEvent.setup();
  renderAt('/');
  const trigger = screen.getByRole('button', { name: 'Open navigation' });
  await user.click(trigger);
  expect(document.body.style.overflow).toBe('hidden');
  const dialog = screen.getByRole('dialog', { name: 'Navigation' });
  await user.click(within(dialog).getByRole('button', { name: 'Close menu' }));
  expect(dialog).not.toHaveAttribute('open');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
  expect(document.body.style.overflow).toBe('');
});

it('resets unsaved demo settings without implying a server write', async () => {
  const user = userEvent.setup();
  renderAt('/settings');
  const name = screen.getByRole('textbox', { name: 'Display name (required)' });
  await user.clear(name);
  await user.type(name, 'Unsaved example');
  await user.click(screen.getByRole('button', { name: 'Reset changes' }));
  expect(name).toHaveValue('Demo user');
  expect(screen.getByRole('button', { name: 'Save demo preferences' })).toBeDisabled();
  expect(screen.getByRole('status')).toHaveTextContent('Unsaved demo changes discarded');
});
