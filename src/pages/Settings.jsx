import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Volume2, 
  Trash2, 
  RotateCcw, 
  Bell, 
  ShieldCheck, 
  Moon, 
  Sun, 
  CheckCircle2, 
  HardDrive 
} from 'lucide-react';
import { soundManager } from '../utils/sound';

export const Settings = () => {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');
  const [soundFeedback, setSoundFeedback] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleTestSiren = () => {
    soundManager.startEmergencySiren();
    setSoundFeedback(true);
    setTimeout(() => {
      soundManager.stopEmergencySiren();
      setSoundFeedback(false);
    }, 2000);
  };

  const handleTestBeep = () => {
    soundManager.playBeep(600, 0.2);
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset demo data back to default factory settings?")) {
      localStorage.clear();
      setResetSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 border border-indigo-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 shadow-md">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider mb-1.5">
          <SettingsIcon className="w-4 h-4" />
          <span>System & Preferences</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
          Portal Settings & Local Storage
        </h1>
        <p className="text-sm text-slate-300 mt-1 font-medium">
          Configure interface theme, sound test audio synth, and manage local data persistence.
        </p>
      </div>

      <div className="space-y-4">
        
        {/* Appearance Mode */}
        <div className="glass-panel p-6 border border-slate-700/60 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              {theme === 'dark' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Theme Appearance</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">High-contrast Dark Command Center & Clean Light mode</p>
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="btn btn-outline text-xs sm:text-sm flex items-center gap-2 font-bold border-slate-700 shadow-sm"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span>{theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
          </button>
        </div>

        {/* Audio Synthesizer Diagnostics */}
        <div className="glass-panel p-6 border border-slate-700/60 shadow-md space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Web Audio Synthesizer & Alarm Diagnostics</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">Test speaker output and loud frequency siren synthesis</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handleTestSiren}
              className={`btn btn-sm ${soundFeedback ? "btn-emergency animate-pulse" : "btn-outline border-rose-500/40 text-rose-300"} font-extrabold shadow-sm`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{soundFeedback ? "Playing 2s Alarm..." : "Test 2s Emergency Siren"}</span>
            </button>

            <button
              onClick={handleTestBeep}
              className="btn btn-sm btn-outline text-xs sm:text-sm text-slate-200 border-slate-700 font-bold"
            >
              Test Alert Beep
            </button>
          </div>
        </div>

        {/* Local Storage & Cache Reset */}
        <div className="glass-panel p-6 border border-rose-500/30 shadow-md space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 border border-slate-700 flex items-center justify-center shrink-0">
              <HardDrive className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-base">Local Storage & Session Reset</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">Clear custom added contacts and reports to restore initial demo data</p>
            </div>
          </div>

          {resetSuccess && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-xs sm:text-sm text-emerald-300 flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Storage reset successfully! Reloading...</span>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={handleResetData}
              className="btn btn-sm bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-700/80 text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset to Default Demo State</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
