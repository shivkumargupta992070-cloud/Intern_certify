import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try { await register(form.name, form.email, form.password); navigate('/'); }
    catch (err) { setError(err.message); }
    setLoading(false);
  };

  return (
    <div className="card auth">
      <h2>Create account</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <label>Name</label>
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <label>Email</label>
        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label>Password (min 6 characters)</label>
        <input type="password" minLength={6} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="btn" disabled={loading}>{loading ? 'Please wait...' : 'Register'}</button>
      </form>
      <p className="muted">Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
