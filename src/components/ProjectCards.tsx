import { Link, useLocation } from 'react-router-dom';
import type { Project } from '../data/demo';
import { StatusBadge } from './ui';

export function ProjectCards({ items }: { items: Project[] }) {
  const location = useLocation();
  const from = location.pathname === '/projects' ? `/projects${location.search}` : '/projects';
  return <ul className="project-grid">{items.map((project) => (
    <li className="card project-card" key={project.id}>
      <StatusBadge status={project.status} />
      <h3><Link to={`/projects/${project.id}`} state={{ from }}>{project.name}</Link></h3>
      <p className="muted">{project.description}</p>
      <div className="progress-label"><span>Sample progress</span><strong>{project.progress}%</strong></div>
      <progress max={100} value={project.progress} aria-label={`${project.name} sample progress`} />
    </li>
  ))}</ul>;
}
