import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import {
  Shield, Siren, MapPin, Users, FileText, Bell,
  BookOpen, User, Menu, X, PhoneCall, LogOut,
  Settings, ShieldCheck, Radio, Star, Home
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSafety } from '../context/SafetyContext';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { isSosActive, triggerSos, alerts } = useSafety();
  const navigate = useNavigate();

  const navLinks = [
    { to: '/',            label: 'Home',          icon: Home },
    { to: '/emergency',   label: 'Helplines',     icon: PhoneCall },
    { to: '/safety-map',  label: 'Safety Map',    icon: MapPin },
    { to: '/contacts',    label: 'Contacts',      icon: Users },
    { to: '/report',      label: 'Report',        icon: FileText },
    { to: '/resources',   label: 'Resources',     icon: BookOpen },
    { to: '/alerts',      label: 'Alerts',        icon: Bell, badge: alerts.length },
    { to: '/feedback',    label: 'Community',     icon: Star },
  ];

  return (
    <header className="navbar">
      {/* SOS Active Banner */}
      {isSosActive && (
        <div className="sos-active-banner" style={{ color: '#fff', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 700, fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Radio size={16} style={{ animation: 'gpsPing 1s infinite' }} />
            🚨 EMERGENCY SOS BROADCAST IS CURRENTLY ACTIVE!
          </div>
          <button
            onClick={() => navigate('/location')}
            style={{ padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-sm)', background: '#fff', color: '#0f172a', fontWeight: 800, fontSize: '0.75rem', border: 'none', cursor: 'pointer' }}
          >
            View Live Tracking
          </button>
        </div>
      )}

      {/* Main bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.5rem', gap: '1rem', flexWrap: 'nowrap' }}>

        {/* Brand */}
        <Link to="/" className="navbar-brand" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <div className="navbar-logo">
            <Shield size={22} color="#fff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--text-primary)', lineHeight: 1 }}>SafeHer</span>
              <span className="badge badge-emergency" style={{ fontSize: '0.62rem', padding: '0.15rem 0.5rem' }}>24x7</span>
            </div>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-faint)', fontWeight: 500 }}>Women Safety Portal</span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.15rem', flex: 1, justifyContent: 'center' }} className="desktop-nav">
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={14} />
                <span>{link.label}</span>
                {link.badge ? (
                  <span style={{ minWidth: '18px', height: '18px', borderRadius: '9px', background: 'var(--emergency)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px' }}>
                    {link.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}
        </nav>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
          {/* ERSS quick call */}
          <a href="tel:112" style={{
            display: 'none', alignItems: 'center', gap: '0.4rem',
            padding: '0.45rem 0.9rem', borderRadius: 'var(--radius-sm)',
            background: 'var(--emergency-soft)', border: '1px solid var(--emergency-border)',
            color: '#fda4af', fontWeight: 700, fontSize: '0.78rem',
            textDecoration: 'none'
          }} className="erss-btn">
            <Siren size={13} style={{ animation: 'logoFloat 1.5s ease-in-out infinite' }} />
            ERSS 112
          </a>

          {/* SOS button */}
          <button
            onClick={triggerSos}
            className="btn btn-emergency btn-sm"
            style={{ fontWeight: 800, letterSpacing: '0.04em', gap: '0.4rem' }}
          >
            <Siren size={14} /> SOS
          </button>

          {/* Profile */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(p => !p)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.75rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all var(--transition-fast)' }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--primary-deep))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <span style={{ display: 'none', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} className="username-span">
                  {user?.name?.split(' ')[0]}
                </span>
              </button>

              {profileOpen && (
                <div
                  onClick={() => setProfileOpen(false)}
                  style={{ position: 'absolute', right: 0, top: 'calc(100% + 8px)', width: '220px', background: 'rgba(13,13,36,0.98)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', padding: '0.75rem', boxShadow: 'var(--shadow-lg)', zIndex: 200, backdropFilter: 'blur(20px)', animation: 'modalScaleUp 0.2s ease' }}
                >
                  <div style={{ padding: '0.5rem 0.6rem 0.75rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
                  </div>

                  {[
                    { to: '/profile',  icon: User,     label: 'My Profile',   color: 'var(--primary-light)' },
                    { to: '/reports',  icon: FileText,  label: 'My Reports',  color: 'var(--safe)' },
                    { to: '/settings', icon: Settings,  label: 'Settings',    color: 'var(--text-muted)' },
                  ].map(item => (
                    <Link key={item.to} to={item.to} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.6rem', borderRadius: 'var(--radius-xs)', color: 'var(--text-secondary)', fontSize: '0.83rem', fontWeight: 600, textDecoration: 'none', transition: 'all var(--transition-fast)' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-glass-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                    >
                      <item.icon size={15} color={item.color} /> {item.label}
                    </Link>
                  ))}

                  <div style={{ borderTop: '1px solid var(--border)', marginTop: '0.5rem', paddingTop: '0.5rem' }}>
                    <button
                      onClick={logout}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.55rem 0.6rem', borderRadius: 'var(--radius-xs)', color: 'var(--emergency)', fontSize: '0.83rem', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'all var(--transition-fast)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'var(--emergency-soft)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={14} /> Login
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(m => !m)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', background: 'var(--bg-glass)', border: '1px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)' }}
            className="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div style={{ background: 'rgba(7,7,26,0.98)', borderTop: '1px solid var(--border)', padding: '1rem 1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', backdropFilter: 'blur(20px)', animation: 'modalFadeIn 0.15s ease' }}>
          {navLinks.map(link => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                style={{ padding: '0.65rem 0.85rem', fontSize: '0.9rem' }}
              >
                <Icon size={16} />
                <span style={{ flex: 1 }}>{link.label}</span>
                {link.badge ? (
                  <span style={{ minWidth: '20px', height: '20px', borderRadius: '10px', background: 'var(--emergency)', color: '#fff', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 5px' }}>
                    {link.badge}
                  </span>
                ) : null}
              </NavLink>
            );
          })}

          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', marginTop: '0.5rem' }}>
            <a href="tel:112" className="btn btn-emergency btn-sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              <PhoneCall size={14} /> Call 112
            </a>
            <a href="tel:181" className="btn btn-ghost btn-sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', textDecoration: 'none' }}>
              Call 181
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
          .erss-btn { display: flex !important; }
          .username-span { display: block !important; }
        }
      `}</style>
    </header>
  );
};
