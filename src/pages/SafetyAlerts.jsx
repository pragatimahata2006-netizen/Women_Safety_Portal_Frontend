import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter, 
  Info,
  ThumbsUp,
  MapPin,
  Clock,
  Sparkles
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { AlertCard } from '../components/AlertCard';

export const SafetyAlerts = () => {
  const { alerts } = useSafety();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const levels = ['All', 'Danger', 'Warning', 'Info'];

  const filteredAlerts = alerts.filter((alert) => {
    const matchesLevel = selectedLevel === 'All' || alert.level.toLowerCase() === selectedLevel.toLowerCase();
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 border border-amber-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider mb-1.5">
            <Bell className="w-4 h-4" />
            <span>Community Warning Feed</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Verified Safety Alerts & Advisories
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl font-medium">
            Live notices regarding lighting faults, enhanced police patrols, public transport updates, and verified civic safety warnings.
          </p>
        </div>

        <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl px-5 py-3 text-amber-300 text-xs sm:text-sm flex items-center gap-2.5 font-extrabold shadow-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Authority & Moderated Source</span>
        </div>
      </div>

      {/* Moderation Policy Callout */}
      <div className="glass-panel p-6 border border-indigo-500/30 bg-indigo-950/20 shadow-md flex items-start gap-4 text-xs sm:text-sm text-slate-200">
        <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-medium">
          <strong className="text-white font-extrabold">Strict Verification Protocol:</strong> In alignment with responsible safety standards, SafeHer only displays notices verified by municipal authorities, law enforcement, or moderated community audits. Unverified rumors are filtered out to prevent public panic.
        </p>
      </div>

      {/* Search & Level Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by area, street, or keyword..."
            className="form-input pl-10 text-xs sm:text-sm py-2.5 font-medium"
          />
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedLevel === lvl
                  ? "bg-amber-600 text-white shadow-md"
                  : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80"
              }`}
            >
              {lvl === 'All' ? 'All Alerts' : lvl}
            </button>
          ))}
        </div>

      </div>

      {/* Alerts Feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>

      {filteredAlerts.length === 0 && (
        <div className="glass-panel p-12 text-center text-slate-400 space-y-3.5 border border-slate-700 shadow-md">
          <Bell className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="font-extrabold text-white text-lg">No active alerts matching "{searchTerm}"</p>
          <p className="text-xs sm:text-sm text-slate-400">Your area currently has no active high-risk safety warnings.</p>
        </div>
      )}

    </div>
  );
};
