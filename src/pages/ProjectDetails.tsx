import { Link, useLocation, useParams } from 'react-router-dom';
import { Page, Card, EmptyState, StatusBadge } from '../components/ui';
import { projects } from '../data/demo';
import { paths, projectsReturnPath } from '../navigation';

export function ProjectDetails() {
  const { projectId } = useParams();
  const location = useLocation();
  const project = projects.find((item) => item.id === projectId);
  const backTo = projectsReturnPath(location.state?.from);

  if (!project) return <Page title="Project not found" description="This sample project does not exist.">
    <EmptyState title="Choose another project" description="Use the sample project list to continue."
      action={<Link className="button" to={backTo}>Browse projects</Link>} />
  </Page>;

  return <Page title={project.name} description={project.description}
    action={<Link className="button secondary" to={backTo}>Back to projects</Link>}>
    <div className="two-column">
      <Card title="Overview">
        <StatusBadge status={project.status} />
        <p className="muted">This is a read-only sample project. Progress is demonstration data.</p>
        <div className="progress-label"><span>Sample progress</span><strong>{project.progress}%</strong></div>
        <progress max={100} value={project.progress} aria-label={`${project.name} sample progress`} />
      </Card>
      <Card title="Sample milestones">
        <ol className="milestone-list">{project.milestones.map((item) => <li key={item}>{item}</li>)}</ol>
      </Card>
    </div>
    <Card title="What comes next?">
      <p>Editing, members, files, and real project data require approved product, API, and permission contracts. They are intentionally not wired into this starter.</p>
      <Link to={paths.help}>Understand the demo limits</Link>
    </Card>
  </Page>;
}
