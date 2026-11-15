import { Link } from 'react-router-dom';
import { Page, Card } from '../components/ui';
import { ProjectCards } from '../components/ProjectCards';
import { projects } from '../data/demo';

export function Dashboard() {
  return <Page title="Dashboard" description="A simple overview of your sample workspace."
    action={<Link className="button" to="/projects">Explore projects</Link>}>
    <div className="summary-grid">
      <Card title="Sample projects"><p className="metric">{projects.length}</p><p className="muted">Projects in this demo</p></Card>
      <Card title="In progress"><p className="metric">{projects.filter((p) => p.status === 'In progress').length}</p><p className="muted">Sample work underway</p></Card>
      <Card title="Needs attention"><p className="metric">{projects.filter((p) => p.status === 'At risk').length}</p><Link to="/projects?status=At%20risk">View at-risk projects</Link></Card>
    </div>
    <section aria-labelledby="dashboard-projects">
      <div className="section-heading"><h2 id="dashboard-projects">Your projects</h2><Link to="/projects">View all projects</Link></div>
      <ProjectCards items={projects} />
    </section>
  </Page>;
}
