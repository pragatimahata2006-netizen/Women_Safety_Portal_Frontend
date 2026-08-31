import React, { useState, useEffect } from 'react';
import { Plus, Trash2, User, Phone, Mail, Star, Shield, UserPlus, Loader2, CheckCircle2 } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { api } from '../utils/api';

const AVATAR_COLORS = [
  ['#7c3aed', '#4c1d95'], ['#db2777', '#9d174d'], ['#059669', '#065f46'],
  ['#d97706', '#92400e'], ['#0284c7', '#075985'], ['#dc2626', '#991b1b'],
];

const getAvatarColor = (name) => {
  const idx = (name?.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
};

export const Contacts = () => {
  const { contacts: localContacts, addContact, deleteContact } = useSafety();
  const [apiContacts, setApiContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', relationship: '', phone: '', email: '', isPrimary: false });
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [success, setSuccess] = useState('');

  useEffect(() => { loadContacts(); }, []);

  const loadContacts = async () => {
    setLoading(true);
    try {
      const data = await api.getContacts();
      setApiContacts(data.contacts || []);
    } catch {
      setApiContacts([]);
    }
    setLoading(false);
  };

  const allContacts = [
    ...apiContacts,
    ...localContacts.filter(lc => !apiContacts.find(ac => ac.phone === lc.phone))
  ];

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await api.addContact(form);
      setApiContacts(prev => [...prev, data.contact]);
      setSuccess('Contact added successfully!');
    } catch {
      // Backend offline: add locally
      addContact({ ...form, id: 'cnt-' + Date.now() });
      setSuccess('Contact added (offline mode)!');
    }
    setForm({ name: '', relationship: '', phone: '', email: '', isPrimary: false });
    setShowForm(false);
    setSaving(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = async (id, isApi) => {
    if (!window.confirm('Remove this contact?')) return;
    setDeletingId(id);
    if (isApi) {
      try { await api.deleteContact(id); } catch {}
      setApiContacts(prev => prev.filter(c => c.id !== id));
    } else {
      deleteContact(id);
    }
    setDeletingId(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

      {/* Header */}
      <div className="hero-gradient animate-fade-in-up" style={{ padding: '2rem 2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'var(--emergency-soft)', border: '1px solid var(--emergency-border)', marginBottom: '0.75rem' }}>
              <Shield size={12} color="var(--emergency)" />
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#fda4af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Trusted Safety Network</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--text-primary)' }}>
              Trusted Contacts
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.3rem' }}>
              {allContacts.length} contact{allContacts.length !== 1 ? 's' : ''} in your safety network
            </p>
          </div>
          <button
            onClick={() => setShowForm(s => !s)}
            className="btn btn-primary btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <UserPlus size={15} /> Add Contact
          </button>
        </div>
      </div>

      {/* Success message */}
      {success && (
        <div style={{ padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', background: 'var(--safe-soft)', border: '1px solid var(--safe-border)', color: '#6ee7b7', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={16} /> {success}
        </div>
      )}

      {/* Add contact form */}
      {showForm && (
        <div className="glass-card-static animate-fade-in-up" style={{ padding: '1.75rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserPlus size={18} color="var(--primary-light)" /> Add Trusted Contact
          </h3>
          <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.9rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label"><User size={13} /> Full Name *</label>
              <input className="form-input" type="text" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} placeholder="Contact Name" required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Relationship</label>
              <input className="form-input" type="text" value={form.relationship} onChange={e => setForm(p => ({...p, relationship: e.target.value}))} placeholder="Father, Sister, Friend..." />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label"><Phone size={13} /> Phone *</label>
              <input className="form-input" type="tel" value={form.phone} onChange={e => setForm(p => ({...p, phone: e.target.value}))} placeholder="+91 98765..." required />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label"><Mail size={13} /> Email</label>
              <input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({...p, email: e.target.value}))} placeholder="contact@email.com" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', gridColumn: '1 / -1' }}>
              <input
                type="checkbox"
                id="isPrimary"
                checked={form.isPrimary}
                onChange={e => setForm(p => ({...p, isPrimary: e.target.checked}))}
                style={{ width: '16px', height: '16px', accentColor: 'var(--warning)' }}
              />
              <label htmlFor="isPrimary" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer' }}>
                <Star size={13} color="var(--warning)" style={{ display: 'inline', marginRight: '0.3rem' }} />
                Mark as Primary Emergency Contact
              </label>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', gridColumn: '1 / -1' }}>
              <button type="submit" className="btn btn-primary" disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                {saving ? <div className="spinner" style={{ width: '16px', height: '16px' }} /> : <><Plus size={15} /> Save Contact</>}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
          <Loader2 size={28} style={{ animation: 'spin 0.8s linear infinite', display: 'block', margin: '0 auto 0.75rem' }} />
          Loading contacts...
        </div>
      )}

      {/* Contacts grid */}
      {!loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
          {allContacts.map((contact, i) => {
            const isApi = apiContacts.some(c => c.id === contact.id);
            const [from, to] = getAvatarColor(contact.name);
            const initials = (contact.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
            const isPrimary = contact.isPrimary || contact.priority === 'Primary';

            return (
              <div
                key={contact.id}
                className="glass-card animate-fade-in-up"
                style={{ padding: '1.5rem', animationDelay: `${i * 0.06}s`, cursor: 'default' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  {/* Avatar */}
                  <div
                    className={`contact-avatar ${isPrimary ? 'primary' : ''}`}
                    style={{ background: `linear-gradient(135deg, ${from}, ${to})`, color: '#fff', boxShadow: `0 4px 16px ${from}55` }}
                  >
                    {initials}
                  </div>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '1rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {contact.name}
                      </div>
                      {isPrimary && <Star size={13} color="var(--warning)" fill="var(--warning)" />}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>
                      {contact.relationship || 'Contact'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      <Phone size={12} color="var(--primary-light)" /> {contact.phone}
                    </div>
                    {contact.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        <Mail size={12} color="var(--text-faint)" /> {contact.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <a href={`tel:${contact.phone}`} className="btn btn-emergency btn-sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    <Phone size={13} /> Call
                  </a>
                  <a href={`https://wa.me/${contact.phone?.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-safe btn-sm" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                    WhatsApp
                  </a>
                  <button
                    onClick={() => handleDelete(contact.id, isApi)}
                    disabled={deletingId === contact.id}
                    className="btn btn-ghost btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add new contact card */}
          <button
            onClick={() => setShowForm(true)}
            style={{
              background: 'var(--bg-glass)', border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)',
              padding: '2rem', cursor: 'pointer', color: 'var(--text-muted)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem',
              transition: 'all var(--transition-base)', minHeight: '160px', justifyContent: 'center'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-border)'; e.currentTarget.style.color = 'var(--primary-light)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px dashed currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={22} />
            </div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Add Trusted Contact</div>
          </button>
        </div>
      )}
    </div>
  );
};
