import type { ReactNode } from 'react';
import type { ProjectStatus } from '../data/demo';

export function Page({ title, description, action, children }: {
  title: string; description: string; action?: ReactNode; children: ReactNode;
}) {
  return <>
    <header className="page-heading">
      <div><h1 tabIndex={-1}>{title}</h1><p className="muted">{description}</p></div>
      {action && <div className="page-action">{action}</div>}
    </header>
    <div className="page-stack">{children}</div>
  </>;
}

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return <section className="card">{title && <h2>{title}</h2>}{children}</section>;
}

export function EmptyState({ title, description, action }: {
  title: string; description: string; action?: ReactNode;
}) {
  return <section className="card empty-state"><h2>{title}</h2><p className="muted">{description}</p>{action}</section>;
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const tone = status === 'At risk' ? 'warning' : status === 'In progress' ? 'info' : 'neutral';
  return <span className={`badge ${tone}`}>{status}</span>;
}
