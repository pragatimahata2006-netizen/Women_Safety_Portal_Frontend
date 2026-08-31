import React, { useState, useEffect } from 'react';
import { Siren, AlertTriangle, X } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const SOSButton = () => {
  const { triggerSos, isSosActive, cancelSos } = useSafety();
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    let timer;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (countdown === 0) {
      setCountdown(null);
      triggerSos();
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleClick = () => {
    if (isSosActive) { cancelSos(); return; }
    setCountdown(3);
  };

  const handleAbort = (e) => { e.stopPropagation(); setCountdown(null); };
  const handleNow   = (e) => { e.stopPropagation(); setCountdown(null); triggerSos(); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', padding: '1rem' }}>
      <button
        onClick={handleClick}
        className="sos-trigger-btn"
        aria-label="Emergency SOS"
        style={{ position: 'relative' }}
      >
        {countdown !== null ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff', lineHeight: 1 }}>
              {countdown}
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fecaca', marginTop: '4px' }}>
              Triggering...
            </span>
          </div>
        ) : isSosActive ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Siren size={48} color="#fff" style={{ animation: 'logoFloat 0.6s ease-in-out infinite' }} />
            <span style={{ fontSize: '1.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff', letterSpacing: '0.08em', marginTop: '4px' }}>ACTIVE</span>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', color: '#fecaca', marginTop: '2px' }}>Tap to Cancel</span>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Siren size={52} color="#fff" style={{ filter: 'drop-shadow(0 4px 12px rgba(255,255,255,0.3))' }} />
            <span style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontFamily: 'var(--font-display)', fontWeight: 900, color: '#fff', letterSpacing: '0.12em', marginTop: '6px' }}>SOS</span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#fecaca', marginTop: '2px' }}>Emergency Help</span>
          </div>
        )}
      </button>

      {/* Countdown abort controls */}
      {countdown !== null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', animation: 'fadeInUp 0.3s ease' }}>
          <button onClick={handleAbort} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <X size={14} color="var(--emergency)" /> Abort ({countdown}s)
          </button>
          <button onClick={handleNow} className="btn btn-emergency btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertTriangle size={14} /> Trigger Now
          </button>
        </div>
      )}

      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '320px', lineHeight: 1.6 }}>
        {isSosActive
          ? '🚨 Emergency alert active — contacts and 112 ERSS notified.'
          : 'Press to start 3s countdown broadcast to your trusted contacts & 112 ERSS'}
      </p>
    </div>
  );
};
