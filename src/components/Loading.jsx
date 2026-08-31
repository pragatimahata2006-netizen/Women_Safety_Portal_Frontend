import React from 'react';
import { Shield, Loader2 } from 'lucide-react';

export const Loading = ({ message = "Loading SafeHer Portal..." }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 animate-pulse">
          <Shield className="w-8 h-8" />
        </div>
        <Loader2 className="w-20 h-20 text-rose-500 animate-spin absolute" />
      </div>
      <p className="text-sm font-semibold text-gray-400 tracking-wide">{message}</p>
    </div>
  );
};
