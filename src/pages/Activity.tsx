import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, EmptyState } from '../components/ui';
import { activity, formatUtc, projects } from '../data/demo';

export function Activity() {
  const [projectId, setProjectId] = useState('All');
  const events = activity.filter((event) => projectId === 'All' || event.projectId === projectId);
  return <Page title="Activity" description="Static sample changes, newest first. All times are shown in UTC.">
    <div className="card field"><label htmlFor="activity-project">Filter by project</label>
      <select id="activity-project" value={projectId} onChange={(e) => setProjectId(e.target.value)}>
        <option value="All">All projects</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
      </select></div>
    <p role="status" className="muted">{events.length} sample events</p>
    {events.length ? <ol className="item-list" aria-label="Activity events">{events.map((event) => (
      <li className="card" key={event.id}>
        <p>{event.text}</p>
        <div className="item-meta"><Link to={`/projects/${event.projectId}`}>{projects.find((project) => project.id === event.projectId)?.name}</Link>
          <time dateTime={event.at}>{formatUtc(event.at)}</time></div>
      </li>
    ))}</ol> : <EmptyState title="No activity to show" description="Choose another project or reset the filter."
      action={<button className="button" type="button" onClick={() => setProjectId('All')}>Show all activity</button>} />}
  </Page>;
}
