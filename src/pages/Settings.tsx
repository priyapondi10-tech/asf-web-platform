import { useRef, useState, type FormEvent } from 'react';
import { Page, Card } from '../components/ui';

const initial = { displayName: 'Demo user', digest: 'Weekly' };

export function Settings() {
  const [draft, setDraft] = useState({ ...initial });
  const [saved, setSaved] = useState({ ...initial });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);
  const dirty = draft.displayName !== saved.displayName || draft.digest !== saved.digest;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (draft.displayName.trim().length < 2) {
      setError('Enter a display name with at least 2 characters.');
      setMessage('');
      nameRef.current?.focus();
      return;
    }
    const next = { ...draft, displayName: draft.displayName.trim() };
    setError(''); setDraft(next); setSaved(next);
    setMessage('Demo preferences saved for this visit only. Nothing was sent to a server.');
  }

  function reset() {
    setDraft({ ...saved }); setError(''); setMessage('Unsaved demo changes discarded.');
  }

  return <Page title="Settings" description="Try a local preferences form. Values reset when you leave this screen or reload; do not enter sensitive information.">
    <Card title="Demo preferences">
      <form className="settings-form" noValidate onSubmit={submit}>
        <div className="field"><label htmlFor="display-name">Display name (required)</label>
          <input ref={nameRef} id="display-name" value={draft.displayName} required maxLength={80}
            aria-invalid={error ? true : undefined} aria-describedby={error ? 'name-error' : 'name-help'}
            onChange={(e) => { setDraft({ ...draft, displayName: e.target.value }); setMessage(''); }} />
          {error ? <p className="field-error" id="name-error" role="alert">{error}</p> :
            <p className="field-help" id="name-help">Use 2–80 characters. This is a demo value, not an account profile.</p>}
        </div>
        <div className="field"><label htmlFor="digest">Sample digest preference</label>
          <select id="digest" value={draft.digest} aria-describedby="digest-help" onChange={(e) => { setDraft({ ...draft, digest: e.target.value }); setMessage(''); }}>
            <option>Weekly</option><option>Daily</option><option>Off</option>
          </select><p className="field-help" id="digest-help">No email is sent. This only demonstrates preference selection.</p>
        </div>
        <div className="toolbar"><button className="button" type="submit" disabled={!dirty}>Save demo preferences</button>
          <button className="button secondary" type="button" disabled={!dirty} onClick={reset}>Reset changes</button></div>
        <p className="muted" role="status">{message || (dirty ? 'You have unsaved demo changes.' : 'No unsaved demo changes.')}</p>
      </form>
    </Card>
  </Page>;
}
