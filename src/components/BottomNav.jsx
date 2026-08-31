import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MapPin, Siren, Users, BookOpen } from 'lucide-react';
import { useSafety } from '../context/SafetyContext';

export const BottomNav = () => {
  const { triggerSos, isSosActive } = useSafety();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-gray-950/90 backdrop-blur-xl border-t border-gray-800/80 px-2 py-1.5">
      <div className="flex items-center justify-around relative">
        
        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        {/* Map */}
        <NavLink
          to="/safety-map"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <MapPin className="w-5 h-5 mb-0.5" />
          <span>Safety Map</span>
        </NavLink>

        {/* Center Floating SOS Trigger */}
        <div className="relative -top-5 flex flex-col items-center">
          <button
            onClick={triggerSos}
            className={`w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 to-rose-500 text-white flex items-center justify-center shadow-lg border-4 border-gray-950 transition-transform active:scale-95 ${
              isSosActive ? "animate-pulse ring-4 ring-rose-500/50" : ""
            }`}
            aria-label="Emergency SOS"
          >
            <Siren className="w-7 h-7 animate-bounce" />
          </button>
          <span className="text-[10px] font-black text-rose-500 mt-0.5 tracking-wider">SOS</span>
        </div>

        {/* Contacts */}
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <Users className="w-5 h-5 mb-0.5" />
          <span>Contacts</span>
        </NavLink>

        {/* Resources */}
        <NavLink
          to="/resources"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
              isActive ? "text-indigo-400 font-bold" : "text-gray-400 hover:text-gray-200"
            }`
          }
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Guides</span>
        </NavLink>

      </div>
    </div>
  );
};
