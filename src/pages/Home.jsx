import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield, Siren, MapPin, Users, FileText, PhoneCall,
  PhoneOutgoing, Volume2, VolumeX, Navigation, ShieldCheck,
  Bell, ArrowRight, Sparkles, Timer, Phone, ExternalLink,
  Activity, Lock, Star, TrendingUp, Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSafety } from '../context/SafetyContext';
import { SOSButton } from '../components/SOSButton';
import { EmergencyCard } from '../components/EmergencyCard';
import { emergencyNumbers } from '../data/emergencyNumbers';
import { safetyLocations } from '../data/safetyLocations';
import { SafetyTimerModal } from '../components/SafetyTimerModal';
import { calculateDistance, getGoogleMapsUrl } from '../utils/location';

const STATS = [
  { value: '2.4M+', label: 'Women Protected', icon: Shield, color: 'var(--primary)' },
  { value: '18K+', label: 'SOS Alerts Sent', icon: Activity, color: 'var(--emergency)' },
  { value: '99.9%', label: 'Uptime', icon: TrendingUp, color: 'var(--safe)' },
  { value: '24/7', label: 'Active Support', icon: Heart, color: 'var(--warning)' },
];

const QUICK_ACTIONS = [
  {
    to: '/location', label: 'Share Location', desc: 'Broadcast real-time GPS to trusted people',
    icon: MapPin, color: 'var(--primary)', bg: 'var(--primary-soft)', border: 'var(--primary-border)',
    action: 'Open GPS Radar', type: 'link', cardClass: ''
  },
  {
    to: '/contacts', label: 'Trusted Contacts', desc: 'Manage family & test emergency alerts',
    icon: Users, color: 'var(--emergency)', bg: 'var(--emergency-soft)', border: 'var(--emergency-border)',
    action: 'View Network', type: 'link', cardClass: 'emergency'
  },
  {
    to: '/safety-map', label: 'Safety Map', desc: 'Find police posts, hospitals & safe hubs',
    icon: Navigation, color: 'var(--safe)', bg: 'var(--safe-soft)', border: 'var(--safe-border)',
    action: 'Explore Map', type: 'link', cardClass: 'safe'
  },
  {
    to: '/report', label: 'Report Incident', desc: 'Submit hazard, dark spot or harassment log',
    icon: FileText, color: 'var(--warning)', bg: 'var(--warning-soft)', border: 'var(--warning-border)',
    action: 'File Report', type: 'link', cardClass: ''
  },
  {
    label: 'Fake Call', desc: 'Simulate incoming call from family to exit danger',
    icon: PhoneOutgoing, color: 'var(--info)', bg: 'var(--info-soft)', border: 'var(--info-border)',
    action: 'Trigger Ringtone', type: 'action', key: 'fakeCall', cardClass: ''
  },
  {
    label: 'Alarm Siren', desc: 'Sound high-pitch 1200Hz deterrent tone loudly',
    icon: Volume2, color: 'var(--primary-light)', bg: 'var(--primary-soft)', border: 'var(--primary-border)',
    action: 'Activate Alarm', type: 'action', key: 'siren', cardClass: ''
  },
];

export const Home = () => {
  const { user } = useAuth();
  const { currentLocation, isLocating, contacts, alerts, startFakeCall, toggleSiren, isSirenPlaying, isSafetyTimerActive } = useSafety();
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const navigate = useNavigate();

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 5)  return 'Good Night';
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const nearbyPlaces = safetyLocations.slice(0, 3);
  const primaryHelplines = emergencyNumbers.slice(0, 3);
  const name = user?.name?.split(' ')[0] || 'there';

  const handleAction = (key) => {
    if (key === 'fakeCall') startFakeCall('Sima Mahata (Mother)');
    if (key === 'siren') toggleSiren();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <div className="hero-gradient animate-fade-in-up" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)' }}>
        {/* Aurora mesh overlay */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          background: 'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(244,63,94,0.08) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem' }}>
            {/* Left — greeting */}
            <div style={{ flex: '1', minWidth: '260px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.85rem', borderRadius: 'var(--radius-full)', background: 'var(--primary-soft)', border: '1px solid var(--primary-border)', marginBottom: '0.85rem' }}>
                <Sparkles size={13} color="var(--primary-light)" />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary-light)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  Safety Command Center · Shield Active
                </span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: '0.75rem' }}>
                {getGreeting()},{' '}
                <span className="gradient-text">{name}</span> 👋
              </h1>

              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.875rem, 2vw, 1.05rem)', lineHeight: 1.65, maxWidth: '520px', marginBottom: '1.25rem' }}>
                Your safety shield is <strong style={{ color: 'var(--safe)' }}>active</strong>. You have{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{contacts.length} trusted contacts</strong> and{' '}
                <strong style={{ color: 'var(--text-primary)' }}>{alerts.length} live alerts</strong> in your area.
              </p>

              {/* GPS Capsule */}
              <div className="gps-capsule">
                <div className="gps-dot" />
                <div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--safe)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '2px' }}>GPS Live</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {isLocating ? 'Acquiring...' : `${currentLocation.lat.toFixed(4)}° N  ${currentLocation.lng.toFixed(4)}° E`}
                  </div>
                </div>
              </div>
            </div>

            {/* Right — stats + timer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', minWidth: '200px' }}>
              <button
                onClick={() => setIsTimerModalOpen(true)}
                style={{
                  padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer',
                  background: isSafetyTimerActive
                    ? 'linear-gradient(135deg, var(--emergency), #9f1239)'
                    : 'linear-gradient(135deg, var(--primary), var(--primary-deep))',
                  color: '#fff', fontWeight: 700, fontSize: '0.875rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: isSafetyTimerActive ? '0 4px 20px rgba(244,63,94,0.5)' : '0 4px 20px rgba(139,92,246,0.4)',
                  animation: isSafetyTimerActive ? 'sosRing1 1.5s ease-out infinite' : 'none'
                }}
              >
                <Timer size={16} />
                {isSafetyTimerActive ? '🚨 Journey Timer Active' : '🚶 Walk With Me'}
              </button>

              {/* Quick call buttons */}
              <a href="tel:112" style={{
                padding: '0.7rem 1.1rem', borderRadius: 'var(--radius-md)',
                background: 'var(--emergency-soft)', border: '1px solid var(--emergency-border)',
                color: '#fda4af', fontWeight: 700, fontSize: '0.82rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none', transition: 'all var(--transition-fast)'
              }}>
                <Siren size={15} style={{ animation: 'gpsPing 2s infinite' }} />
                Quick Dial 112 — ERSS
              </a>
              <a href="tel:181" style={{
                padding: '0.7rem 1.1rem', borderRadius: 'var(--radius-md)',
                background: 'var(--primary-soft)', border: '1px solid var(--primary-border)',
                color: 'var(--primary-light)', fontWeight: 700, fontSize: '0.82rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                textDecoration: 'none'
              }}>
                <ShieldCheck size={15} />
                181 Women Helpline
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── STAT COUNTERS ────────────────────────────────────────── */}
      <div className="animate-fade-in-up animate-fade-in-up-delay-1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="stat-card">
              <Icon size={20} style={{ color: s.color, marginBottom: '0.5rem' }} />
              <div className="stat-number">{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.25rem' }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* ── SOS SECTION ──────────────────────────────────────────── */}
      <div className="glass-card-static animate-fade-in-up animate-fade-in-up-delay-2" style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
          width: '500px', height: '400px',
          background: 'radial-gradient(ellipse, rgba(244,63,94,0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.3rem 1rem', borderRadius: 'var(--radius-full)',
            background: 'var(--emergency-soft)', border: '1px solid var(--emergency-border)',
            marginBottom: '1.25rem'
          }}>
            <Siren size={14} color="var(--emergency)" style={{ animation: 'logoFloat 1s ease-in-out infinite' }} />
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              High Priority Emergency SOS Broadcast
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Need Immediate Emergency Help?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.65, maxWidth: '500px', margin: '0 auto 2rem' }}>
            Press SOS to instantly broadcast your GPS location, notify{' '}
            <strong style={{ color: 'var(--text-primary)' }}>{contacts.length} trusted contacts</strong> and connect with national emergency services.
          </p>

          {/* SOS Button with 3 rings */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ position: 'relative' }}>
              <div className="sos-ring sos-ring-1" />
              <div className="sos-ring sos-ring-2" />
              <div className="sos-ring sos-ring-3" />
              <SOSButton />
            </div>
          </div>

          {/* Dual emergency hotlines */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '420px', margin: '0 auto' }}>
            <a href="tel:112" className="btn btn-emergency">
              <PhoneCall size={16} />
              Call 112 ERSS (Pan-India)
            </a>
            <a href="tel:181" className="btn btn-primary">
              <ShieldCheck size={16} />
              Call 181 Women Helpline
            </a>
          </div>
        </div>
      </div>

      {/* ── QUICK ACTIONS ─────────────────────────────────────────── */}
      <section className="animate-fade-in-up animate-fade-in-up-delay-3">
        <div className="section-header">
          <h3 className="section-title">
            <Sparkles size={20} color="var(--primary)" />
            Quick Safety Actions
          </h3>
          <span className="badge badge-primary">All Tools Active</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.1rem' }}>
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.isSirenPlaying && action.key === 'siren' ? VolumeX : action.icon;
            const ActualIcon = action.key === 'siren' ? (isSirenPlaying ? VolumeX : Volume2) : action.icon;
            const label = action.key === 'siren' ? (isSirenPlaying ? 'Stop Siren' : 'Alarm Siren') : action.label;
            const desc = action.key === 'siren'
              ? (isSirenPlaying ? 'Siren active — tap to disable' : action.desc)
              : action.desc;

            const Card = action.type === 'link' ? Link : 'div';
            const cardProps = action.type === 'link'
              ? { to: action.to }
              : { onClick: () => handleAction(action.key), style: { cursor: 'pointer' } };

            return (
              <Card
                key={i}
                {...cardProps}
                className={`feature-card ${action.cardClass}`}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  ...(action.key === 'siren' && isSirenPlaying ? { borderColor: 'var(--emergency-border)', background: 'rgba(244,63,94,0.05)' } : {})
                }}
              >
                <div
                  className="feature-icon"
                  style={{ background: action.bg, border: `1px solid ${action.border}` }}
                >
                  <ActualIcon size={22} color={action.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.6rem' }}>{desc}</div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: action.color, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {action.action} <ArrowRight size={12} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── NEARBY SAFE HUBS ──────────────────────────────────────── */}
      <section className="animate-fade-in-up animate-fade-in-up-delay-4">
        <div className="section-header">
          <h3 className="section-title">
            <ShieldCheck size={20} color="var(--safe)" />
            Nearby Safe Hubs
          </h3>
          <Link to="/safety-map" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            Open Map <ArrowRight size={13} />
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {nearbyPlaces.map((place) => {
            const dist = calculateDistance(currentLocation.lat, currentLocation.lng, place.lat, place.lng);
            const mapUrl = getGoogleMapsUrl(place.lat, place.lng);
            return (
              <div key={place.id} className="glass-card-static" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.68rem' }}>{place.categoryLabel}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--safe)', background: 'var(--safe-soft)', border: '1px solid var(--safe-border)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                    <Navigation size={11} /> {dist} km
                  </span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '0.3rem' }}>{place.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{place.address}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
                  <a href={`tel:${place.phone}`} className="btn btn-ghost btn-sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <Phone size={13} /> Call Desk
                  </a>
                  <a href={mapUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <ExternalLink size={13} /> Directions
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ALERTS + HELPLINES ────────────────────────────────────── */}
      <div className="animate-fade-in-up animate-fade-in-up-delay-5" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,2fr) minmax(0,1fr)', gap: '1.5rem' }}>

        {/* Alerts */}
        <section>
          <div className="section-header">
            <h3 className="section-title">
              <Bell size={20} color="var(--warning)" />
              Safety Advisories
            </h3>
            <Link to="/alerts" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-light)', textDecoration: 'none' }}>
              View All ({alerts.length})
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {alerts.slice(0, 2).map((alert) => (
              <div key={alert.id} className={`alert-card severity-${alert.severity || 'medium'}`}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'var(--warning-soft)', border: '1px solid var(--warning-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Bell size={18} color="var(--warning)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--warning)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {alert.category} · {alert.area}
                      </span>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{alert.timestamp}</span>
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{alert.title}</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{alert.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Key helplines */}
        <section>
          <div className="section-header">
            <h3 className="section-title" style={{ fontSize: '1rem' }}>
              <PhoneCall size={18} color="var(--emergency)" />
              Key Helplines
            </h3>
            <Link to="/emergency" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-light)', textDecoration: 'none' }}>
              Full Directory
            </Link>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            {primaryHelplines.map((item) => (
              <div key={item.id} className="emergency-card">
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{item.number}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: '0.2rem' }}>{item.title}</div>
                </div>
                <a href={`tel:${item.number}`} className="btn btn-emergency btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <PhoneCall size={13} /> Dial
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>

      <SafetyTimerModal isOpen={isTimerModalOpen} onClose={() => setIsTimerModalOpen(false)} />
    </div>
  );
};
