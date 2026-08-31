import React, { useState } from 'react';
import { Timer, MapPin, ShieldCheck, X, AlertTriangle, Play, CheckCircle } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const SafetyTimerModal = ({ isOpen, onClose }) => {
  const { 
    isSafetyTimerActive, 
    safetyTimerSeconds, 
    safetyTimerDestination, 
    startSafetyTimer, 
    cancelSafetyTimer, 
    checkInSafetyTimer 
  } = useSafety();

  const [selectedMinutes, setSelectedMinutes] = useState(15);
  const [destination, setDestination] = useState("Home");

  if (!isOpen && !isSafetyTimerActive) return null;

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const handleStart = (e) => {
    e.preventDefault();
    startSafetyTimer(selectedMinutes, destination);
    if (onClose) onClose();
  };

  const durationOptions = [5, 10, 15, 20, 30, 45];

  return (
    <div className="modal-overlay">
      <div className="modal-content max-w-md p-6 space-y-5 border border-slate-700 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Timer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg font-display">
                {isSafetyTimerActive ? "Active Journey Timer" : "Walk With Me — Safety Timer"}
              </h3>
              <p className="text-xs text-slate-400 font-medium">Automated check-in protection</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSafetyTimerActive ? (
          /* Active Countdown State */
          <div className="flex flex-col items-center justify-center py-4 space-y-4 text-center">
            <div className="w-40 h-40 rounded-full bg-slate-950 border-4 border-indigo-500/50 flex flex-col items-center justify-center shadow-2xl relative">
              <span className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight">
                {formatTime(safetyTimerSeconds)}
              </span>
              <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider mt-1">Remaining</span>
            </div>

            <div className="text-sm">
              <span className="text-slate-400 font-medium">Heading towards: </span>
              <span className="font-extrabold text-white text-base">{safetyTimerDestination}</span>
            </div>

            <div className="bg-amber-500/15 border border-amber-500/40 rounded-2xl p-3.5 text-xs text-amber-200 text-left flex items-start gap-3 shadow-sm font-medium">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                If you do not check in before timer reaches 00:00, SafeHer will automatically trigger emergency SOS and broadcast your coordinates.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full pt-2">
              <button
                onClick={checkInSafetyTimer}
                className="btn btn-safe flex-1 py-3.5 font-extrabold text-sm shadow-xl"
              >
                <CheckCircle className="w-4 h-4" />
                <span>I Have Arrived Safely</span>
              </button>
              <button
                onClick={cancelSafetyTimer}
                className="btn btn-outline border-slate-700 text-slate-400 hover:text-white text-xs font-bold"
              >
                Cancel Timer
              </button>
            </div>
          </div>
        ) : (
          /* Timer Setup Form */
          <form onSubmit={handleStart} className="space-y-4 text-xs sm:text-sm">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              Traveling alone late at night or taking a cab? Set an estimated journey duration. If you don't check in before it expires, emergency contacts will be notified with your location.
            </p>

            <div className="form-group">
              <label className="form-label">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Destination / Trip Note</span>
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Home, College Hostel, Metro Station"
                className="form-input font-medium"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Timer className="w-4 h-4 text-indigo-400" />
                <span>Estimated Journey Duration</span>
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {durationOptions.map((mins) => (
                  <button
                    type="button"
                    key={mins}
                    onClick={() => setSelectedMinutes(mins)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold border transition-all ${
                      selectedMinutes === mins
                        ? "bg-indigo-600 border-indigo-500 text-white shadow-md"
                        : "bg-slate-900/90 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1 text-xs sm:text-sm font-extrabold shadow-md py-3"
              >
                <Play className="w-4 h-4" />
                <span>Start {selectedMinutes} Min Journey Timer</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
