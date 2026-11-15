import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Page, EmptyState } from '../components/ui';
import { notificationSeed } from '../data/demo';

export function Notifications() {
  const [items, setItems] = useState(() => notificationSeed.map((item) => ({ ...item })));
  const [unreadOnly, setUnreadOnly] = useState(false);
  const unread = items.filter((item) => !item.read).length;
  const visible = items.filter((item) => !unreadOnly || !item.read);
  const markRead = (id?: string) => setItems((current) => current.map((item) => !id || item.id === id ? { ...item, read: true } : item));

  return <Page title="Notifications" description="Try sample notification triage. Read status resets when you leave this screen or reload.">
    <div className="card toolbar">
      <label className="check-label"><input type="checkbox" checked={unreadOnly} onChange={(e) => setUnreadOnly(e.target.checked)} />Unread only</label>
      <button className="button secondary" type="button" disabled={!unread} onClick={() => markRead()}>Mark all as read</button>
    </div>
    <p className="muted" role="status">{unread} unread sample notifications. Changes are in memory only.</p>
    {visible.length ? <ul className="item-list" aria-label="Notification list">{visible.map((item) => (
      <li className="card notification-item" key={item.id}>
        <div><span className="badge neutral">{item.read ? 'Read' : 'Unread'}</span>
          <h2><Link to={`/projects/${item.projectId}`}>{item.title}</Link></h2><p className="muted">{item.description}</p></div>
        {!item.read && <button className="button secondary" type="button" aria-label={`Mark "${item.title}" as read`} onClick={() => markRead(item.id)}>Mark as read</button>}
      </li>
    ))}</ul> : <EmptyState title="You're all caught up" description="There are no unread sample notifications."
      action={<button className="button" type="button" onClick={() => setUnreadOnly(false)}>Show all notifications</button>} />}
  </Page>;
}
