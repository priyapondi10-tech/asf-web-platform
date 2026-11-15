import { useState } from 'react';
import { Page, Card, EmptyState } from '../components/ui';

const questions = [
  { id: 'run', title: 'How do I run the app?', answer: 'Use Node.js 22.12 or later, run npm install, then npm run dev. Run npm run check for automated validation.' },
  { id: 'navigate', title: 'How do I find a screen?', answer: 'Use the desktop sidebar or the Menu button on a compact screen. Project details are reached from a project card. The skip link moves keyboard focus to main content.' },
  { id: 'data', title: 'Is my data saved?', answer: 'No server, account, or storage is connected. Settings and notification read state are held only while their screen is open and reset on navigation or reload. All other data is static sample content.' },
  { id: 'roadmap', title: 'Where are the UX improvements tracked?', answer: 'The repository contains nine detailed GitHub issues and docs/UX_ROADMAP.md with per-screen priorities, dependencies, acceptance criteria, and proposed usability targets.' },
];

export function Help() {
  const [query, setQuery] = useState('');
  const matches = questions.filter((item) => `${item.title} ${item.answer}`.toLowerCase().includes(query.trim().toLowerCase()));
  return <Page title="Help" description="Find a quick answer about this frontend starter and its limits.">
    <div className="card field"><label htmlFor="help-search">Search help</label>
      <input id="help-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search questions and answers" /></div>
    <p className="muted" role="status">{matches.length} help answers</p>
    {matches.length ? <section className="faq-list" aria-label="Help answers">{matches.map((item) => (
      <details className="card" key={item.id} id={`answer-${item.id}`}><summary>{item.title}</summary><p>{item.answer}</p></details>
    ))}</section> : <EmptyState title="No answers match" description="Try a simpler term or clear your search."
      action={<button className="button" type="button" onClick={() => setQuery('')}>Clear search</button>} />}
    <Card title="Project documentation"><ul className="link-list">
      <li><a href="https://github.com/priyapondi10-tech/asf-web-platform#getting-started">Setup documentation</a></li>
      <li><a href="https://github.com/priyapondi10-tech/asf-web-platform/blob/main/docs/UX_ROADMAP.md">View UX roadmap</a></li>
    </ul></Card>
  </Page>;
}
