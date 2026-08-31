import React, { useState } from 'react';
import { 
  PhoneCall, 
  Search, 
  Filter, 
  Siren, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  PhoneOutgoing, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Info 
} from 'lucide-react';
import { emergencyNumbers } from '../data/emergencyNumbers';
import { EmergencyCard } from '../components/EmergencyCard';
import { useSafety } from '../context/SafetyContext';

export const Emergency = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { isSirenPlaying, toggleSiren, startFakeCall } = useSafety();

  const categories = ['All', 'National', 'Police', 'Women', 'Medical', 'Cyber', 'Legal', 'Mental Health'];

  const filteredHelplines = emergencyNumbers.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="rounded-xl p-6 md:p-8 bg-gradient-to-r from-slate-900 via-rose-950/40 to-slate-900 border border-rose-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wide">
            <Siren className="w-4 h-4 animate-pulse" />
            <span>24/7 Verified Emergency Directory</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide leading-relaxed">
            Emergency Helplines & Crisis Response
          </h1>
          <p className="text-sm text-slate-300 max-w-xl font-medium leading-relaxed">
            Direct, toll-free access to national police, women in distress helplines, medical ambulances, cyber crime units, and legal aid desks.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:112"
            className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center gap-2 border border-rose-400/40 transition-all active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Direct Call 112 ERSS</span>
          </a>

          <a
            href="tel:181"
            className="px-5 py-3 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
          >
            <span>Call 181 Women Line</span>
          </a>
        </div>
      </div>

      {/* Quick Crisis Utility Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Siren Alarm Box */}
        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 border ${
              isSirenPlaying ? "bg-rose-600 text-white border-rose-400 animate-pulse" : "bg-slate-800 text-rose-400 border-slate-700"
            }`}>
              {isSirenPlaying ? <VolumeX className="w-7 h-7" /> : <Volume2 className="w-7 h-7" />}
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Emergency Audible Siren</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">Loud 1200Hz frequency synthesizer to attract immediate help</p>
            </div>
          </div>

          <button
            onClick={toggleSiren}
            className={`px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
              isSirenPlaying ? "bg-rose-600 text-white shadow-lg" : "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700"
            }`}
          >
            {isSirenPlaying ? "Stop Siren" : "Sound Siren"}
          </button>
        </div>

        {/* Discreet Fake Call Box */}
        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-sky-600/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
              <PhoneOutgoing className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Discreet Escape Fake Call</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">Simulates incoming call from Sima Mahata with speech prompt</p>
            </div>
          </div>

          <button
            onClick={() => startFakeCall("Sima Mahata (Mother)")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 text-xs font-extrabold shrink-0 transition-all"
          >
            Trigger Call
          </button>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search helpline name or number..."
            className="form-input pl-10 text-xs sm:text-sm py-2.5 font-medium"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs sm:text-sm px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-rose-600 text-white shadow-md"
                  : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Helplines Responsive 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHelplines.map((helpline) => (
          <EmergencyCard key={helpline.id} helpline={helpline} />
        ))}
      </div>

      {filteredHelplines.length === 0 && (
        <div className="rounded-xl p-12 bg-slate-900/50 border border-slate-800 text-center text-slate-400 space-y-3 shadow-md">
          <ShieldAlert className="w-12 h-12 text-slate-600 mx-auto" />
          <h4 className="text-lg font-extrabold text-white">No Helplines Found</h4>
          <p className="text-xs sm:text-sm max-w-sm mx-auto text-slate-400 font-medium">
            No helplines match your query "{searchTerm}". Try clearing your search or category filter.
          </p>
        </div>
      )}

      {/* Informative Guidance Box */}
      <div className="rounded-xl p-6 bg-slate-900/50 border border-indigo-500/30 shadow-md flex items-start gap-4 text-xs sm:text-sm text-slate-200">
        <Info className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h5 className="font-extrabold text-white">Pan-India ERSS 112 System Notes:</h5>
          <p className="leading-relaxed font-medium">
            112 is the single emergency response number across India for police, fire, and medical emergency. Calls to 112 are free of cost and function even on mobile phones without network balance or active SIM card carrier locks.
          </p>
        </div>
      </div>

    </div>
  );
};
