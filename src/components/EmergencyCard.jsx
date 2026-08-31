import React, { useState } from 'react';
import { 
  PhoneCall, 
  Copy, 
  Check, 
  Siren, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  HeartHandshake, 
  Ambulance, 
  Navigation, 
  SmilePlus 
} from 'lucide-react';

const iconMap = {
  Siren,
  ShieldAlert,
  ShieldCheck,
  Lock,
  HeartHandshake,
  Ambulance,
  Navigation,
  SmilePlus
};

export const EmergencyCard = ({ helpline }) => {
  const [copied, setCopied] = useState(false);
  const Icon = iconMap[helpline.icon] || Siren;

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(helpline.number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md relative overflow-hidden transition-all hover:border-indigo-500/60 flex flex-col justify-between space-y-4 ${
      helpline.featured ? "border-rose-500/40 bg-gradient-to-br from-rose-950/20 via-slate-900 to-slate-900" : ""
    }`}>
      {helpline.featured && (
        <div className="absolute top-0 right-0 bg-rose-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wide shadow-sm">
          Primary
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-3.5">
          <div 
            className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-md border"
            style={{ 
              backgroundColor: `${helpline.color}25`, 
              color: helpline.color,
              borderColor: `${helpline.color}50`
            }}
          >
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-black text-white tracking-wide font-mono">
                {helpline.number}
              </span>
              <span className="badge badge-info text-[10px]">
                {helpline.category}
              </span>
            </div>
            <h4 className="font-extrabold text-white text-base leading-tight mt-1">
              {helpline.title}
            </h4>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
          {helpline.description}
        </p>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
        <a
          href={`tel:${helpline.number}`}
          className={`flex-1 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 ${
            helpline.featured 
              ? "bg-rose-600 hover:bg-rose-700 text-white" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <PhoneCall className="w-4 h-4 shrink-0" />
          <span>{helpline.actionText || `Call ${helpline.number}`}</span>
        </a>

        <button
          onClick={handleCopy}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          title="Copy Number"
          aria-label="Copy helpline number"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
