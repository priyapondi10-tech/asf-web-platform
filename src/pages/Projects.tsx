import { useSearchParams } from 'react-router-dom';
import { Page, EmptyState } from '../components/ui';
import { ProjectCards } from '../components/ProjectCards';
import { projects, statuses } from '../data/demo';

export function Projects() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const requestedStatus = params.get('status') ?? 'All';
  const status = statuses.some((value) => value === requestedStatus) ? requestedStatus : 'All';
  const filtered = projects.filter((project) =>
    `${project.name} ${project.description}`.toLowerCase().includes(query.trim().toLowerCase()) &&
    (status === 'All' || project.status === status));
  function update(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value && value !== 'All') next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  }
  const clear = () => setParams({}, { replace: true });

  return <Page title="Projects" description="Find a sample project by name, description, or status.">
    <div className="card toolbar">
      <div className="field grow"><label htmlFor="project-search">Search projects</label>
        <input id="project-search" type="search" value={query} onChange={(e) => update('q', e.target.value)} placeholder="Search sample projects" /></div>
      <div className="field"><label htmlFor="project-status">Status</label>
        <select id="project-status" value={status} onChange={(e) => update('status', e.target.value)}>
          <option>All</option>{statuses.map((value) => <option key={value}>{value}</option>)}
        </select></div>
      <button className="button secondary" type="button" onClick={clear}>Clear filters</button>
    </div>
    <p className="muted" role="status">{filtered.length} of {projects.length} sample projects</p>
    {filtered.length ? <section aria-labelledby="project-results"><h2 id="project-results" className="visually-hidden">Project results</h2><ProjectCards items={filtered} /></section> :
      <EmptyState title="No projects match" description="Try a different search or clear your filters."
        action={<button className="button" type="button" onClick={clear}>Show all projects</button>} />}
  </Page>;
}
