import React, { useState } from 'react';
import { 
  MapPin, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  MessageSquare, 
  Radio, 
  Navigation, 
  Sparkles,
  Users,
  Compass
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { useAuth } from '../context/AuthContext';
import { getGoogleMapsUrl, getWhatsAppDistressUrl, getSmsDistressUrl } from '../utils/location';
import { SafetyMap } from '../components/SafetyMap';

export const Location = () => {
  const { currentLocation, isLocating, refreshLocation, contacts } = useSafety();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const mapUrl = getGoogleMapsUrl(currentLocation.lat, currentLocation.lng);
  const primaryContact = contacts[0] || null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(mapUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppDistressUrl = getWhatsAppDistressUrl(
    primaryContact ? primaryContact.phone : '',
    currentLocation.lat,
    currentLocation.lng,
    user?.name || "Bristi Mahata"
  );

  const smsDistressUrl = getSmsDistressUrl(
    primaryContact ? primaryContact.phone : '',
    currentLocation.lat,
    currentLocation.lng,
    user?.name || "Bristi Mahata"
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="rounded-xl p-6 md:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wide">
            <Radio className="w-4 h-4 animate-pulse" />
            <span>GPS Satellite Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide leading-relaxed">
            Live Location Radar & Sharing
          </h1>
          <p className="text-sm text-slate-300 max-w-xl font-medium leading-relaxed">
            Acquire real-time high-precision coordinates to share with your trusted Mahata family contacts, guardians, or first responders.
          </p>
        </div>

        <button
          onClick={refreshLocation}
          disabled={isLocating}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all active:scale-95 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
          <span>{isLocating ? "Acquiring Coordinates..." : "Refresh GPS Fix"}</span>
        </button>
      </div>

      {/* Structured Telemetry Grid (Cards/Boxes format: rounded-xl p-6 bg-slate-900/50 border border-slate-800) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <span>Latitude</span>
          </span>
          <p className="text-2xl font-black text-white font-mono">{currentLocation.lat.toFixed(6)}° N</p>
          <span className="text-[11px] text-slate-400 block font-medium">WGS84 Reference Coordinate</span>
        </div>

        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Longitude</span>
          </span>
          <p className="text-2xl font-black text-white font-mono">{currentLocation.lng.toFixed(6)}° E</p>
          <span className="text-[11px] text-slate-400 block font-medium">Eastern Hemisphere Meridian</span>
        </div>

        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-emerald-400" />
            <span>Fix Precision</span>
          </span>
          <p className="text-2xl font-black text-emerald-400 font-mono">±{currentLocation.accuracy}m</p>
          <span className="text-[11px] text-emerald-400/80 block font-bold">
            {currentLocation.isDefault ? "Default Reference Pin" : "Live Sensor Fix"}
          </span>
        </div>

        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md space-y-1">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-rose-400" />
            <span>Telemetry Privacy</span>
          </span>
          <p className="text-2xl font-black text-white">Client Side</p>
          <span className="text-[11px] text-slate-400 block font-medium">Zero Server Trace Log</span>
        </div>

      </div>

      {/* Main Map Container */}
      <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <span>Live Interactive GPS Pinpoint</span>
          </h3>
          <span className="badge badge-safe text-[10px]">Realtime View</span>
        </div>

        <div className="h-96 rounded-xl overflow-hidden border border-slate-800 shadow-inner">
          <SafetyMap center={[currentLocation.lat, currentLocation.lng]} />
        </div>
      </div>

      {/* Broadcast Sharing Action Cards (Responsive 3-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* WhatsApp Broadcast */}
        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
              <Share2 className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-white text-base">WhatsApp Distress Broadcast</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Send immediate formatted SOS distress alert with Google Maps pinpoint to your primary contact ({primaryContact?.name || "Sasanka Mahata"}).
            </p>
          </div>

          <a
            href={whatsAppDistressUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>Broadcast via WhatsApp</span>
          </a>
        </div>

        {/* SMS Broadcast */}
        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-white text-base">Direct SMS Alert</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Compose an instant cellular text message containing GPS coordinates without requiring internet data access.
            </p>
          </div>

          <a
            href={smsDistressUrl}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span>Send Cellular SMS</span>
          </a>
        </div>

        {/* Copy Share Link */}
        <div className="rounded-xl p-6 bg-slate-900/50 border border-slate-800 shadow-md flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center">
              <ExternalLink className="w-6 h-6" />
            </div>
            <h4 className="font-extrabold text-white text-base">Share Google Maps Pin</h4>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Copy live coordinates URL to paste into any messenger, emergency portal, or police dispatch desk.
            </p>
          </div>

          <button
            onClick={handleCopyLink}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-extrabold text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-2 shadow-md transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied to Clipboard!" : "Copy Map Link"}</span>
          </button>
        </div>

      </div>

    </div>
  );
};
