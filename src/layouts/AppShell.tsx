import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRouteInfo, navigation, paths } from '../navigation';

function SiteLogo({ compact = false }: { compact?: boolean }) {
  return <Link className={`brand${compact ? ' brand-compact mobile-only' : ''}`} to={paths.home} aria-label="ASF home">
    ASF{!compact && <span>Web platform</span>}
  </Link>;
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const { activePath } = getRouteInfo(useLocation().pathname);
  return <ul className="nav-list">{navigation.map((item) => (
    <li key={item.to}>
      <Link to={item.to} onClick={onNavigate} aria-current={item.to === activePath ? 'page' : undefined}
        className={`nav-link${item.to === activePath ? ' is-active' : ''}`}>
        <span className="nav-mark" aria-hidden="true">{item.mark}</span>{item.label}
      </Link>
    </li>
  ))}</ul>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const { label, breadcrumbs } = getRouteInfo(location.pathname, location.state?.from);

  function closeMenu() { dialogRef.current?.close(); }
  function openMenu() {
    dialogRef.current?.showModal();
    setMenuOpen(true);
  }

  useEffect(() => {
    const heading = mainRef.current?.querySelector<HTMLHeadingElement>('h1');
    document.title = `${heading?.textContent ?? label} | ASF Platform`;
    heading?.focus();
    setAnnouncement(heading?.textContent ?? label);
  }, [location.pathname, label]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onResize = () => { if (window.innerWidth >= 1024) closeMenu(); };
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('resize', onResize);
    };
  }, [menuOpen]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        mainRef.current?.focus();
      }}>Skip to main content</a>
      <aside className="sidebar" aria-label="Workspace sidebar">
        <SiteLogo />
        <nav aria-label="Primary"><Navigation /></nav>
        <p className="sidebar-note">A clearer place to move work forward.<br />Frontend starter · v0.1</p>
      </aside>
      <div className="workspace">
        <header className="topbar" aria-label="Workspace header">
          <SiteLogo compact />
          <button className="button secondary mobile-only" type="button" onClick={openMenu}
            aria-label="Open navigation" aria-controls="mobile-navigation" aria-expanded={menuOpen}>Menu</button>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumbs">
              {breadcrumbs.map((item) => (
                <li key={item.to ?? 'current'} aria-current={item.to ? undefined : 'page'}>
                  {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                </li>
              ))}
            </ol>
          </nav>
          <span className="workspace-label">Demo workspace</span>
        </header>
        <main id="main-content" className="main-content" tabIndex={-1} ref={mainRef}>
          <p className="demo-banner">Sample data only. No account or server storage is connected.</p>
          {children}
          <footer className="page-footer">ASF frontend starter · <Link to={paths.help}>Help and demo limits</Link></footer>
        </main>
      </div>
      <dialog id="mobile-navigation" className="mobile-menu" ref={dialogRef}
        aria-labelledby="menu-title" onClose={() => setMenuOpen(false)}
        onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="menu-panel">
          <div className="section-heading">
            <h2 id="menu-title">Navigation</h2>
            <button className="button secondary" type="button" onClick={closeMenu}>Close menu</button>
          </div>
          <nav aria-label="Mobile primary"><Navigation onNavigate={closeMenu} /></nav>
        </div>
      </dialog>
      <p className="visually-hidden" aria-live="polite" aria-atomic="true">{announcement}</p>
    </div>
  );
}
