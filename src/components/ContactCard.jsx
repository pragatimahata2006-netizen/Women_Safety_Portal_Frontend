import React from 'react';
import { UserRound, Phone, Edit3, Trash2, Share2, Shield, MessageSquare } from 'lucide-react';
import { getWhatsAppDistressUrl } from '../utils/location';
import { useSafety } from '../context/SafetyContext';
import { useAuth } from '../context/AuthContext';

export const ContactCard = ({ contact, onEdit, onDelete }) => {
  const { currentLocation } = useSafety();
  const { user } = useAuth();

  const testAlertUrl = getWhatsAppDistressUrl(
    contact.phone,
    currentLocation.lat,
    currentLocation.lng,
    user?.name || "Bristi Mahata"
  );

  const getPriorityBadge = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'primary':
        return <span className="badge badge-emergency text-[10px] font-black">Primary</span>;
      case 'secondary':
        return <span className="badge badge-warning text-[10px] font-bold">Secondary</span>;
      default:
        return <span className="badge badge-info text-[10px] font-semibold">Standard</span>;
    }
  };

  return (
    <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md flex flex-col justify-between space-y-4 relative group hover:border-indigo-500/60 transition-all">
      
      {/* Top Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-sm">
            <UserRound className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-white text-base leading-tight tracking-wide">
              {contact.name}
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-bold">{contact.relationship}</span>
              <span className="text-slate-600">•</span>
              {getPriorityBadge(contact.priority)}
            </div>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          {onEdit && (
            <button
              onClick={() => onEdit(contact)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Edit Contact"
              aria-label="Edit Contact"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(contact.id)}
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Delete Contact"
              aria-label="Delete Contact"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Phone info */}
      <div className="bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 flex items-center justify-between shadow-inner">
        <div className="flex items-center gap-2.5 text-slate-200 font-mono font-bold text-xs sm:text-sm">
          <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>{contact.phone}</span>
        </div>
        <a
          href={`tel:${contact.phone}`}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-extrabold border border-slate-700 transition-colors"
        >
          Call
        </a>
      </div>

      {/* Test SOS Button */}
      <div className="pt-1">
        <a
          href={testAlertUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-extrabold text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Send Live GPS Test Alert</span>
        </a>
      </div>

    </div>
  );
};
