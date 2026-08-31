import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Siren, PhoneCall, Lock, HeartHandshake, ExternalLink, Sparkles, MapPin, Users, BookOpen } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-auto pt-10 pb-16 md:pb-8 text-slate-300 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Emergency ERSS Callout Box */}
        <div className="rounded-xl p-6 mb-8 border border-rose-500/30 bg-rose-950/20 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 shrink-0">
              <Siren className="w-8 h-8 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="font-extrabold text-white text-base sm:text-lg tracking-wide">In Immediate Physical Danger?</h4>
              <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                Dial <span className="text-rose-400 font-black text-sm sm:text-base">112</span> for pan-India Emergency Response Support System (ERSS) or <span className="text-rose-400 font-black text-sm sm:text-base">181</span> for Women Helpline.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-wrap w-full md:w-auto">
            <a 
              href="tel:112"
              className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md flex-1 md:flex-initial transition-all active:scale-95"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 112 ERSS</span>
            </a>
            <a 
              href="tel:181"
              className="px-5 py-3 rounded-xl bg-slate-900 border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 flex-1 md:flex-initial transition-all"
            >
              <span>Call 181</span>
            </a>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center text-white shadow-md">
                <Shield className="w-5 h-5" />
              </div>
              <span className="font-black text-xl text-white font-display">SafeHer</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              “Your Safety. Your Support. Your Voice.”
              A modern digital command center empowering women with rapid crisis response, location intelligence, and verified support networks.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider">Emergency Features</h5>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/emergency" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>Emergency SOS Center</span>
                </Link>
              </li>
              <li>
                <Link to="/safety-map" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Interactive Safety Map</span>
                </Link>
              </li>
              <li>
                <Link to="/location" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Live Location Sharing</span>
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Trusted Contacts (Mahata Family)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Reporting */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider">Resources & Incident</h5>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <Link to="/report" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>Report an Incident</span>
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>Track Incident Status</span>
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>Legal Rights & Zero FIR</span>
                </Link>
              </li>
              <li>
                <Link to="/alerts" className="text-slate-400 hover:text-indigo-400 transition-colors flex items-center gap-2">
                  <span>Verified Safety Alerts</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer & Privacy */}
          <div className="space-y-3">
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider">Safety & Privacy</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Location data is processed directly on-device and is never publicly indexed. Portal incident reports assist community awareness and do not replace official police FIR filings.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold pt-1">
              <Lock className="w-4 h-4 shrink-0" />
              <span>Encrypted Local Safety Session</span>
            </div>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} SafeHer Women Safety Portal • Bristi Mahata Command Shield.</p>
          <div className="flex gap-4 items-center flex-wrap">
            <Link to="/resources" className="hover:text-white transition-colors">Safety Guidelines</Link>
            <span className="text-slate-700">•</span>
            <Link to="/emergency" className="hover:text-white transition-colors">Helpline Directory</Link>
            <span className="text-slate-700">•</span>
            <Link to="/feedback" className="hover:text-white transition-colors">Community Feedback</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
