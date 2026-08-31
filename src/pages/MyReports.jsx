import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Plus, Trash2, MapPin, Clock, AlertTriangle,
  CheckCircle2, Loader2, RefreshCw, ShieldCheck, Filter
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { api } from '../utils/api';

const STATUS_COLORS = {
  'Submitted':    { bg: 'var(--info-soft)',     border: 'var(--info-border)',     color: '#7dd3fc' },
  'Under Review': { bg: 'var(--warning-soft)',  border: 'var(--warning-border)',  color: 'var(--warning)' },
  'Action Taken': { bg: 'var(--safe-soft)',     border: 'var(--safe-border)',     color: 'var(--safe)' },
  'Resolved':     { bg: 'var(--primary-soft)',  border: 'var(--primary-border)',  color: 'var(--primary-light)' },
  'Closed':       { bg: 'rgba(255,255,255,0.04)', border: 'var(--border)',        color: 'var(--text-muted)' },
};

const SEVERITY_COLORS = {
  High:    'var(--emergency)',
  Medium:  'var(--warning)',
  Low:     'var(--safe)',
  medium:  'var(--warning)',
  high:    'var(--emergency)',
  low:     'var(--safe)',
};

export const MyReports = () => {
  const { reports: localReports, submitReport } = useSafety();
  const [apiReports, setApiReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [deletingId, setDeletingId] = useState(null);

  const FILTERS = ['All', 'Submitted', 'Under Review', 'Action Taken', 'Resolved'];

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    setLoading(true);
    try {
      const data = await api.getIncidents();
      setApiReports(data.incidents || []);
    } catch {
      // Backend offline — use local reports from context
      setApiReports([]);
    }
    setLoading(false);
  };

  const handleDelete = async (id, isApi) => {
    if (!window.confirm('Delete this report?')) return;
    setDeletingId(id);
    if (isApi) {
      try { await api.deleteIncident(id); } catch {}
      setApiReports(prev => prev.filter(r => r.id !== id));
    }
    setDeletingId(null);
  };

  // Merge API + local reports, prefer API
  const allReports = [...apiReports, ...localReports.filter(lr => !apiReports.find(ar => ar.id === lr.id))];
  const filtered = filter === 'All' ? allReports : allReports.filter(r => r.status === filter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header */}
      <div className="hero-gradient animate-fade-in-up" style={{ padding: '2rem 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'var(--warning-soft)', border: '1px solid var(--warning-border)', marginBottom: '0.75rem' }}>
              <FileText size={12} color="var(--warning)" />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fde68a', textTransform: 'uppercase', letterSpacing: '0.07em' }}>My Incident Reports</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--text-primary)' }}>
              Report History
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.3rem' }}>
              {allReports.length} total report{allReports.length !== 1 ? 's' : ''} filed
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button onClick={loadReports} className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <RefreshCw size={14} /> Refresh
            </button>
            <Link to="/report" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Plus size={14} /> New Report
            </Link>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Filter size={16} color="var(--text-muted)" style={{ alignSelf: 'center', flexShrink: 0 }} />
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '0.35rem 0.9rem', borderRadius: 'var(--radius-full)',
              border: `1px solid ${filter === f ? 'var(--primary-border)' : 'var(--border)'}`,
              background: filter === f ? 'var(--primary-soft)' : 'transparent',
              color: filter === f ? 'var(--primary-light)' : 'var(--text-muted)',
              fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Loader2 size={32} className="spinner" style={{ border: '3px solid rgba(139,92,246,0.2)', borderTopColor: 'var(--primary)', animation: 'spin 0.8s linear infinite' }} />
          <span>Loading your reports...</span>
        </div>
      )}

      {/* Empty state */}
      {!loading && filtered.length === 0 && (
        <div className="glass-card-static animate-fade-in-up" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <ShieldCheck size={36} color="var(--primary-light)" />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {filter === 'All' ? 'No Reports Filed Yet' : `No ${filter} Reports`}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Help make your community safer by reporting incidents or hazardous areas.
          </p>
          <Link to="/report" className="btn btn-primary">
            <Plus size={16} /> File Your First Report
          </Link>
        </div>
      )}

      {/* Reports list */}
      {!loading && filtered.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filtered.map((report, i) => {
            const isApi = apiReports.some(r => r.id === report.id);
            const statusStyle = STATUS_COLORS[report.status] || STATUS_COLORS['Submitted'];
            const sevColor = SEVERITY_COLORS[report.severity] || 'var(--text-muted)';

            return (
              <div
                key={report.id}
                className="glass-card-static animate-fade-in-up"
                style={{ padding: '1.5rem', animationDelay: `${i * 0.05}s`, borderLeft: `3px solid ${sevColor}` }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Status badge */}
                    <span style={{ padding: '0.25rem 0.7rem', borderRadius: 'var(--radius-full)', background: statusStyle.bg, border: `1px solid ${statusStyle.border}`, color: statusStyle.color, fontSize: '0.72rem', fontWeight: 700 }}>
                      {report.status}
                    </span>
                    {/* Type badge */}
                    <span style={{ padding: '0.25rem 0.7rem', borderRadius: 'var(--radius-full)', background: 'var(--bg-glass)', border: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 600 }}>
                      {report.type || report.incidentType || 'Report'}
                    </span>
                    {/* Severity */}
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: sevColor }}>
                      ● {report.severity || 'Medium'} Severity
                    </span>
                  </div>

                  <button
                    onClick={() => handleDelete(report.id, isApi)}
                    disabled={deletingId === report.id}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-faint)', padding: '0.25rem', borderRadius: 'var(--radius-xs)', transition: 'color var(--transition-fast)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--emergency)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-faint)'}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.05rem', marginBottom: '0.4rem' }}>
                  {report.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '0.85rem' }}>
                  {report.description}
                </p>

                <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                  {(report.location || report.locationName) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      <MapPin size={13} color="var(--primary-light)" /> {report.location || report.locationName}
                    </span>
                  )}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <Clock size={13} color="var(--text-faint)" />
                    {report.createdAt ? new Date(report.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recently'}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    ID: <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>{report.id?.slice(0, 12)}...</span>
                  </span>
                </div>

                {/* Status note */}
                {report.statusNote && (
                  <div style={{ marginTop: '0.75rem', padding: '0.65rem 0.9rem', borderRadius: 'var(--radius-sm)', background: 'var(--safe-soft)', border: '1px solid var(--safe-border)', fontSize: '0.8rem', color: '#6ee7b7', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
                    {report.statusNote}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
