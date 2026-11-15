export const statuses = ['Planned', 'In progress', 'At risk'] as const;
export type ProjectStatus = typeof statuses[number];

export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  milestones: string[];
}

export const projects: Project[] = [
  {
    id: 'platform-foundation', name: 'Platform foundation',
    description: 'A shared structure for clear, consistent workspace experiences.',
    status: 'In progress', progress: 35,
    milestones: ['Agree information architecture', 'Validate responsive prototype', 'Connect approved services'],
  },
  {
    id: 'mobile-navigation', name: 'Mobile navigation',
    description: 'Simple wayfinding and useful touch interactions on compact screens.',
    status: 'Planned', progress: 10,
    milestones: ['Review top navigation tasks', 'Test the menu prototype', 'Record device findings'],
  },
  {
    id: 'ux-research', name: 'UX research',
    description: 'Validate assumptions with representative users before expanding scope.',
    status: 'At risk', progress: 20,
    milestones: ['Confirm research owner', 'Recruit participants', 'Review findings and priorities'],
  },
];

export const activity = [
  { id: 'event-3', projectId: 'platform-foundation', text: 'Sample milestone added: validate responsive prototype.', at: '2026-11-15T10:30:00Z' },
  { id: 'event-2', projectId: 'ux-research', text: 'Sample status changed to At risk: research owner needed.', at: '2026-11-14T15:00:00Z' },
  { id: 'event-1', projectId: 'mobile-navigation', text: 'Sample project added to the workspace.', at: '2026-11-13T09:00:00Z' },
];

export const notificationSeed = [
  { id: 'notice-1', title: 'Review the platform overview', description: 'A sample reminder to review the shared project structure.', projectId: 'platform-foundation', read: false },
  { id: 'notice-2', title: 'Research needs an owner', description: 'A sample attention-needed item for UX research.', projectId: 'ux-research', read: false },
  { id: 'notice-3', title: 'Mobile navigation is planned', description: 'A sample update about the compact-screen experience.', projectId: 'mobile-navigation', read: true },
];

export function formatUtc(value: string) {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium', timeStyle: 'short', timeZone: 'UTC',
  }).format(new Date(value)) + ' UTC';
}
