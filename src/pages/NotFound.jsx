import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, PhoneCall } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-rose-600/20 text-rose-400 border border-rose-500/30 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-9 h-9" />
      </div>
      <h1 className="text-3xl font-black text-white font-display">404 - Page Not Found</h1>
      <p className="text-xs text-gray-400 max-w-sm">
        The requested safety portal route does not exist or has been relocated. Return to the Command Center.
      </p>
      <div className="flex items-center gap-3 pt-2">
        <Link to="/" className="btn btn-primary text-xs py-2 px-5">
          <Home className="w-4 h-4" />
          <span>Go to Command Center</span>
        </Link>
        <Link to="/emergency" className="btn btn-emergency text-xs py-2 px-5">
          <PhoneCall className="w-4 h-4" />
          <span>Emergency Helplines</span>
        </Link>
      </div>
    </div>
  );
};
