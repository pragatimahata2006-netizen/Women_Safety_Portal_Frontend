import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Heart, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const getPasswordStrength = (pw) => {
  if (!pw) return { score: 0, label: '', color: '' };
  let score = 0;
  if (pw.length >= 8)  score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = {
    0: { label: '', color: '' },
    1: { label: 'Weak', color: 'var(--emergency)' },
    2: { label: 'Fair', color: 'var(--warning)' },
    3: { label: 'Good', color: 'var(--info)' },
    4: { label: 'Strong', color: 'var(--safe)' },
  };
  return { score, ...map[score] };
};

export const Register = () => {
  const { register, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const pwStrength = getPasswordStrength(form.password);

  const handleChange = (e) => {
    setFormError('');
    setAuthError?.(null);
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }
    if (pwStrength.score < 2) {
      setFormError('Please choose a stronger password');
      return;
    }
    setLoading(true);
    const result = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    setLoading(false);
    if (result.success) navigate('/');
  };

  const error = formError || authError;

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div style={{ width: '100%', maxWidth: '960px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '0', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--border-glass)', boxShadow: 'var(--shadow-lg)' }}>

        {/* ── Left Panel ──────────────────────────────────────────── */}
        <div style={{ background: 'linear-gradient(160deg, #0a2010 0%, #061520 50%, #10063a 100%)', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-80px', right: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}>
              <div className="navbar-logo" style={{ width: '52px', height: '52px', borderRadius: '14px' }}>
                <Shield size={26} color="#fff" />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: '#fff' }}>SafeHer</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Women Safety Portal</div>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.7rem', color: '#fff', lineHeight: 1.3, marginBottom: '0.85rem' }}>
              Join the<br /><span className="gradient-text-safe">Safety Network</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Create your free account and get access to India's most comprehensive women safety platform.
            </p>

            {['Instant SOS alert to trusted contacts', 'GPS sharing with real-time tracking', 'Incident reporting & safety advisories', '24x7 emergency helpline directory'].map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.55rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <CheckCircle2 size={16} color="var(--safe)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel — Register Form ──────────────────────────── */}
        <div style={{ background: 'rgba(13,13,36,0.98)', padding: 'clamp(2rem, 5vw, 3rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.1rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.65rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              Create Account
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Free forever · No credit card needed</p>
          </div>

          {error && (
            <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', background: 'var(--emergency-soft)', border: '1px solid var(--emergency-border)', color: '#fda4af', fontSize: '0.85rem', fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label"><User size={13} /> Full Name</label>
                <input className="form-input" type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required />
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label"><Phone size={13} /> Phone</label>
                <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765..." />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label"><Mail size={13} /> Email Address</label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label"><Lock size={13} /> Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="min. 8 characters"
                  required
                  style={{ paddingRight: '3rem' }}
                />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Password strength bar */}
              {form.password && (
                <div style={{ marginTop: '0.4rem' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1,2,3,4].map(s => (
                      <div key={s} style={{ flex: 1, height: '3px', borderRadius: '2px', background: s <= pwStrength.score ? pwStrength.color : 'var(--border)', transition: 'background 0.3s' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: pwStrength.color }}>{pwStrength.label}</span>
                </div>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label"><Lock size={13} /> Confirm Password</label>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="re-enter password"
                required
                style={{ borderColor: form.confirmPassword && form.confirmPassword !== form.password ? 'var(--emergency)' : '' }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-safe btn-lg"
              disabled={loading}
              style={{ width: '100%', marginTop: '0.4rem' }}
            >
              {loading ? <div className="spinner" style={{ width: '18px', height: '18px' }} /> : <><Heart size={17} /> Create My Safety Profile</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-light)', fontWeight: 700, textDecoration: 'none' }}>
              Sign In →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
