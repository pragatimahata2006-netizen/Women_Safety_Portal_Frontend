import React, { useState } from 'react';
import { 
  Siren, 
  PhoneCall, 
  MapPin, 
  Volume2, 
  VolumeX, 
  Share2, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  ExternalLink, 
  MessageSquare, 
  AlertTriangle 
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { useAuth } from '../context/AuthContext';
import { getWhatsAppDistressUrl, getSmsDistressUrl, getGoogleMapsUrl } from '../utils/location';

export const SOSModal = () => {
  const { 
    isSosActive, 
    sosModalOpen, 
    setSosModalOpen, 
    cancelSos, 
    currentLocation, 
    refreshLocation, 
    isLocating,
    contacts, 
    isSirenPlaying, 
    toggleSiren,
    sosTriggeredTime 
  } = useSafety();

  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!sosModalOpen && !isSosActive) return null;

  const mapUrl = getGoogleMapsUrl(currentLocation.lat, currentLocation.lng);
  const primaryContact = contacts[0] || null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`🚨 EMERGENCY SOS! Location: ${mapUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppUrl = getWhatsAppDistressUrl(
    primaryContact ? primaryContact.phone : '',
    currentLocation.lat,
    currentLocation.lng,
    user?.name || "Bristi Mahata"
  );

  const smsUrl = getSmsDistressUrl(
    primaryContact ? primaryContact.phone : '',
    currentLocation.lat,
    currentLocation.lng,
    user?.name || "Bristi Mahata"
  );

  return (
    <div className="modal-overlay">
      <div className="modal-content bg-slate-900 border-2 border-rose-500 max-w-lg p-0 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Header Alert Strip */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-rose-800 p-5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center animate-bounce border border-white/30 shrink-0">
              <Siren className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-wide font-display text-white">EMERGENCY SOS ACTIVE</h3>
              <p className="text-xs text-rose-100 font-semibold mt-0.5">
                Triggered for <strong className="underline">{user?.name || "Bristi Mahata"}</strong> at {sosTriggeredTime || "Just now"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setSosModalOpen(false)}
            className="p-2 rounded-xl bg-black/20 hover:bg-black/40 text-white transition-colors"
            aria-label="Minimize Modal"
            title="Minimize Overlay"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Direct Emergency 112 & 181 Hotlines */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wide text-rose-400 block">
              1. Direct Emergency Helpline Call
            </label>
            <div className="grid grid-cols-2 gap-3.5">
              <a
                href="tel:112"
                className="px-4 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm flex flex-col items-center justify-center text-center shadow-xl border border-rose-400/40 transition-all active:scale-95"
              >
                <div className="flex items-center gap-2 font-black text-lg text-white">
                  <PhoneCall className="w-5 h-5 animate-pulse shrink-0" />
                  <span>Call 112</span>
                </div>
                <span className="text-[11px] text-rose-100 font-medium mt-0.5">National ERSS (Police/ER)</span>
              </a>

              <a
                href="tel:181"
                className="px-4 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm flex flex-col items-center justify-center text-center shadow-xl border border-indigo-400/40 transition-all active:scale-95"
              >
                <div className="flex items-center gap-2 font-black text-lg text-white">
                  <ShieldCheck className="w-5 h-5 shrink-0" />
                  <span>Call 181</span>
                </div>
                <span className="text-[11px] text-indigo-100 font-medium mt-0.5">Women Helpline (24x7)</span>
              </a>
            </div>
          </div>

          {/* Quick Siren Alarm Toggle */}
          <div className="p-4 bg-slate-950 rounded-xl flex items-center justify-between border border-rose-500/40 shadow-md">
            <div className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                isSirenPlaying 
                  ? "bg-rose-600 text-white border-rose-400 animate-pulse" 
                  : "bg-slate-800 text-slate-400 border-slate-700"
              }`}>
                {isSirenPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-extrabold text-white">Audible Siren Alarm</p>
                <p className="text-xs text-slate-300 font-medium">
                  {isSirenPlaying ? "Siren is sounding loudly to deter threats" : "Loud high-frequency audio alert"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleSiren}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                isSirenPlaying ? "bg-rose-600 text-white shadow-md" : "bg-slate-800 text-slate-200 border border-slate-700"
              }`}
            >
              {isSirenPlaying ? "Stop Siren" : "Sound Siren"}
            </button>
          </div>

          {/* Live Location Coordinates & Broadcast */}
          <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-wide">
                <MapPin className="w-4 h-4" />
                <span>Live Location Pin</span>
              </div>
              <button 
                onClick={refreshLocation}
                disabled={isLocating}
                className="text-xs text-indigo-300 hover:text-white underline font-bold flex items-center gap-1"
              >
                {isLocating ? "Updating..." : "Refresh GPS"}
              </button>
            </div>

            <div className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-xs flex items-center justify-between shadow-inner">
              <div>
                <p className="text-white font-mono font-extrabold text-xs sm:text-sm">
                  {currentLocation.lat.toFixed(6)}° N, {currentLocation.lng.toFixed(6)}° E
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                  Accuracy: ±{currentLocation.accuracy}m {currentLocation.isDefault ? "(Reference location)" : "(Live GPS)"}
                </p>
              </div>
              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 flex items-center gap-1 text-xs font-bold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Map</span>
              </a>
            </div>

            {/* Broadcast links */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 font-extrabold text-xs shadow-md"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp SOS</span>
              </a>

              <a
                href={smsUrl}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 font-extrabold text-xs shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-indigo-400" />
                <span>SMS Alert</span>
              </a>
            </div>

            <button
              onClick={handleCopyLink}
              className="w-full text-center text-xs text-slate-400 hover:text-white py-1 block font-semibold"
            >
              {copied ? "✓ Copied Distress Link to Clipboard" : "Copy Live Distress Link"}
            </button>
          </div>

          {/* Trusted Contacts Alert Notification List */}
          <div className="space-y-2">
            <p className="text-xs font-black text-slate-400 uppercase tracking-wide">
              Mahata Family Alert Status ({contacts.length})
            </p>
            <div className="space-y-2 max-h-36 overflow-y-auto">
              {contacts.map(c => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-extrabold text-white">{c.name}</span>
                      <span className="text-slate-400 ml-1.5 font-medium">({c.relationship})</span>
                    </div>
                  </div>
                  <a href={`tel:${c.phone}`} className="text-indigo-300 hover:underline font-mono font-bold">
                    {c.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Action Advice */}
          <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl p-4 text-xs sm:text-sm text-amber-200 flex items-start gap-3 shadow-sm font-medium leading-relaxed">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p>
              Stay in a well-lit area near open stores or security personnel. Keep your phone in hand and head towards the nearest safe hub on the map.
            </p>
          </div>

        </div>

        {/* Footer Abort / Dismiss */}
        <div className="p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <button
            onClick={() => setSosModalOpen(false)}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold border border-slate-700 text-xs sm:text-sm"
          >
            Hide Overlay
          </button>

          <button
            onClick={cancelSos}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex-1 shadow-md flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>I Am Safe — Deactivate Emergency</span>
          </button>
        </div>

      </div>
    </div>
  );
};
