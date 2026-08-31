import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, User, Mic, Volume2, Shield } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const FakeCallModal = () => {
  const { isFakeCallOpen, fakeCallerName, stopFakeCall } = useSafety();
  const [callState, setCallState] = useState('incoming'); // 'incoming', 'active'
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    if (isFakeCallOpen) {
      setCallState('incoming');
      setCallDuration(0);
    }
  }, [isFakeCallOpen]);

  useEffect(() => {
    let interval;
    if (isFakeCallOpen && callState === 'active') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isFakeCallOpen, callState]);

  if (!isFakeCallOpen) return null;

  const callerDisplayName = fakeCallerName || "Sima Mahata (Mother)";

  const handleAccept = () => {
    setCallState('active');
    stopFakeCall(); // Stops ringtone sound
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          "Hey Bristi! Where are you right now? Sasanka and I are standing right outside with the security guard by the car. Let us know the moment you step out."
        );
        utterance.rate = 1.0;
        utterance.pitch = 1.1;
        window.speechSynthesis.speak(utterance);
      }
    } catch (e) {}
  };

  const handleDecline = () => {
    try {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {}
    stopFakeCall();
  };

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  return (
    <div className="modal-overlay z-50">
      <div className="modal-content max-w-sm bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white p-8 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center justify-between min-h-[520px]">
        
        {/* Top Status */}
        <div className="w-full flex items-center justify-between text-xs text-slate-400 font-bold">
          <div className="flex items-center gap-2 text-rose-400">
            <Shield className="w-4 h-4" />
            <span>SafeHer Discreet Exit</span>
          </div>
          <span className="font-mono">{callState === 'incoming' ? 'Incoming Call...' : formatTime(callDuration)}</span>
        </div>

        {/* Caller Avatar & Name */}
        <div className="flex flex-col items-center my-auto text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-rose-600 flex items-center justify-center shadow-2xl border-4 border-slate-800 p-5">
            <User className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-white font-display">{callerDisplayName}</h2>
            <p className="text-xs text-slate-400 font-mono font-bold">Family Mobile • +91 98765 11223</p>
          </div>

          {callState === 'active' && (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-indigo-200 max-w-xs mt-4 shadow-inner">
              <p className="italic font-semibold leading-relaxed">
                "Hey Bristi! Where are you? Sasanka and I are standing right outside with the security guard by the car. Come over!"
              </p>
              <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-slate-400 font-bold">
                <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Audio Prompt Playing (Speaker Active)</span>
              </div>
            </div>
          )}
        </div>

        {/* Call Action Controls */}
        <div className="w-full">
          {callState === 'incoming' ? (
            <div className="flex items-center justify-around w-full pt-4">
              {/* Decline Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleDecline}
                  className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center shadow-xl transition-transform active:scale-95 border-2 border-white/20"
                  aria-label="Decline Call"
                >
                  <PhoneOff className="w-8 h-8 text-white" />
                </button>
                <span className="text-xs text-slate-300 font-bold">Decline</span>
              </div>

              {/* Accept Button */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={handleAccept}
                  className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center shadow-xl transition-transform active:scale-95 animate-bounce border-2 border-white/20"
                  aria-label="Accept Call"
                >
                  <Phone className="w-8 h-8 text-white" />
                </button>
                <span className="text-xs text-slate-300 font-bold">Accept</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="flex items-center justify-center gap-8 text-slate-300 text-xs font-bold">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Mic className="w-5 h-5 text-slate-300" />
                  </div>
                  <span>Mute</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Volume2 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <span>Speaker</span>
                </div>
              </div>

              {/* End Call Button */}
              <button
                onClick={handleDecline}
                className="w-16 h-16 rounded-full bg-rose-600 hover:bg-rose-700 flex items-center justify-center shadow-xl transition-transform active:scale-95 border-2 border-white/20"
                aria-label="End Call"
              >
                <PhoneOff className="w-8 h-8 text-white" />
              </button>
              <span className="text-xs text-slate-300 font-bold">End Fake Call</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
