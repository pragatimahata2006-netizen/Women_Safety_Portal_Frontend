import React from 'react';
import { Bell, AlertTriangle, ShieldCheck, ThumbsUp, MapPin, Clock } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const AlertCard = ({ alert }) => {
  const { markAlertHelpful } = useSafety();

  const getLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'danger':
        return <span className="badge badge-emergency text-[10px]">High Alert</span>;
      case 'warning':
        return <span className="badge badge-warning text-[10px]">Caution</span>;
      default:
        return <span className="badge badge-info text-[10px]">Advisory</span>;
    }
  };

  return (
    <div className="glass-panel p-6 border border-slate-700/60 shadow-md flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all">
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
              alert.level === 'warning' 
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' 
                : 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider block">
                {alert.category}
              </span>
              <h4 className="font-extrabold text-white text-base leading-snug">
                {alert.title}
              </h4>
            </div>
          </div>
          {getLevelBadge(alert.level)}
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mt-2">
          {alert.description}
        </p>
      </div>

      <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>{alert.area}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{alert.timestamp} • Verified by {alert.verifiedBy}</span>
          </div>
        </div>

        <button
          onClick={() => markAlertHelpful(alert.id)}
          className="btn btn-sm btn-outline border-slate-700 hover:border-indigo-500/60 text-slate-200 hover:text-white flex items-center gap-2 text-xs py-1.5 px-3 font-bold"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-indigo-400" />
          <span>Helpful ({alert.helpfulCount})</span>
        </button>
      </div>
    </div>
  );
};
