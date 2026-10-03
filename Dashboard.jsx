import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import TaskForm from '../components/TaskForm.jsx';

export default function Dashboard() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');

  const load = async () => {
    try { setTasks(await api('/tasks', { token })); }
    catch (err) { setError(err.message); }
  };
  useEffect(() => { load(); }, []);

  // CREATE or UPDATE
  const save = async (form) => {
    setError('');
    try {
      if (editing) await api('/tasks/' + editing._id, { method: 'PUT', body: form, token });
      else await api('/tasks', { method: 'POST', body: form, token });
      setEditing(null);
      load();
    } catch (err) { setError(err.message); }
  };

  // DELETE
  const remove = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try { await api('/tasks/' + id, { method: 'DELETE', token }); load(); }
    catch (err) { setError(err.message); }
  };

  const markDone = async (t) => {
    try { await api('/tasks/' + t._id, { method: 'PUT', body: { ...t, status: 'Completed' }, token }); load(); }
    catch (err) { setError(err.message); }
  };

  const count = (s) => tasks.filter((t) => t.status === s).length;
  const shown = filter === 'All' ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <>
      <h2>Dashboard</h2>
      {error && <p className="error">{error}</p>}
      <section className="stats">
        <div className="stat"><b>{tasks.length}</b><span>Total</span></div>
        <div className="stat"><b>{count('Pending')}</b><span>Pending</span></div>
        <div className="stat"><b>{count('In Progress')}</b><span>In Progress</span></div>
        <div className="stat"><b>{count('Completed')}</b><span>Completed</span></div>
      </section>

      <TaskForm editing={editing} onSave={save} onCancel={() => setEditing(null)} />

      <div className="filters">
        {['All', 'Pending', 'In Progress', 'Completed'].map((f) => (
          <button key={f} className={'chip' + (filter === f ? ' active' : '')} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {shown.length === 0 && <p className="muted">No tasks to show. Add your first task above.</p>}
      <section className="list">
        {shown.map((t) => (
          <article key={t._id} className="card task">
            <div>
              <h4 className={t.status === 'Completed' ? 'done' : ''}>{t.title}</h4>
              {t.description && <p>{t.description}</p>}
              <p className="meta">
                <span className={'tag ' + t.priority.toLowerCase()}>{t.priority}</span>
                <span className="tag status">{t.status}</span>
                {t.dueDate && <span>Due: {new Date(t.dueDate).toLocaleDateString()}</span>}
              </p>
            </div>
            <div className="actions">
              {t.status !== 'Completed' && <button className="btn small" onClick={() => markDone(t)}>Done</button>}
              <button className="btn small ghost" onClick={() => { setEditing(t); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button>
              <button className="btn small danger" onClick={() => remove(t._id)}>Delete</button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
