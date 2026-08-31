import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { login, loginAsDemo, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleChange = (e) => {
    setAuthError?.(null);
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return;
    setLoading(true);
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate('/');
  };

  const handleDemo = async () => {
    setDemoLoading(true);
    const result = await loginAsDemo();
    setDemoLoading(false);
    if (result.success) navigate('/');
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '960px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-lg)' }}>

        {/* ── Left Panel — Brand / Visual ───────────────────────── */}
        <div style={{
          background: 'linear-gradient(160deg, #1a0533 0%, #0d0730 40%, #0a1a40 100%)',
          padding: '3rem 2.5rem',
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem',
          position: 'relative', overflow: 'hidden'
        }}>
          {/* Decorative blobs */}
          <div style={{ position: 'absolute', top: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(244,63,94,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
              <div className="navbar-logo" style={{ width: '52px', height: '52px', borderRadius: '14px' }}>
                <Shield size={26} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: '#fff', lineHeight: 1 }}>SafeHer</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>Women Safety Portal</div>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.7rem', color: '#fff', lineHeight: 1.3, marginBottom: '1rem' }}>
              Your Safety,<br />
              <span className="gradient-text">Our Priority</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Access emergency SOS, real-time GPS tracking, trusted contacts and safety alerts — all in one secure platform.
            </p>

            {/* Feature bullets */}
            {[
              { icon: ShieldCheck, text: '24x7 Emergency SOS Broadcast', color: 'var(--emergency)' },
              { icon: Sparkles,    text: 'Real-time GPS Location Sharing', color: 'var(--primary-light)' },
              { icon: Phone,       text: 'Instant Helpline Connectivity', color: 'var(--safe)' },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={f.color} />
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{f.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right Panel — Login Form ──────────────────────────── */}
        <div style={{ background: 'rgba(13,13,36,0.98)', padding: 'clamp(2rem, 5vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Sign in to your safety profile
            </p>
          </div>

          {/* Error message */}
          {authError && (
            <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', background: 'var(--emergency-soft)', border: '1px solid var(--emergency-border)', color: '#fda4af', fontSize: '0.85rem', fontWeight: 600 }}>
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">
                <Mail size={14} /> Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">
                <Lock size={14} /> Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
                >
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: '0.25rem' }}
            >
              {loading ? <div className="spinner" style={{ width: '18px', height: '18px' }} /> : <><ArrowRight size={17} /> Sign In to SafeHer</>}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-faint)', fontWeight: 600 }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          </div>

          {/* Demo login */}
          <button
            onClick={handleDemo}
            className="btn btn-ghost"
            disabled={demoLoading}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {demoLoading ? <div className="spinner" style={{ width: '16px', height: '16px' }} /> : <><Sparkles size={15} color="var(--primary-light)" /> Try Demo Account</>}
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            New to SafeHer?{' '}
            <Link to="/register" style={{ color: 'var(--primary-light)', fontWeight: 700, textDecoration: 'none' }}>
              Create Account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
