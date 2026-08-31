import React, { useState } from 'react';
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  X, 
  ShieldAlert,
  Printer
} from 'lucide-react';

export const ReportCard = ({ report }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'submitted':
        return <span className="badge badge-info text-[10px]">Submitted</span>;
      case 'under review':
        return <span className="badge badge-warning text-[10px]">Under Review</span>;
      case 'action taken':
        return <span className="badge badge-safe text-[10px]">Action Taken</span>;
      case 'resolved':
      case 'closed':
        return <span className="badge badge-safe text-[10px]">Resolved</span>;
      default:
        return <span className="badge badge-info text-[10px]">{status}</span>;
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
      case 'critical':
        return <span className="badge badge-emergency text-[10px]">High Severity</span>;
      case 'medium':
        return <span className="badge badge-warning text-[10px]">Medium Severity</span>;
      default:
        return <span className="badge badge-info text-[10px]">Low Severity</span>;
    }
  };

  return (
    <>
      <div 
        onClick={() => setModalOpen(true)}
        className="glass-panel p-6 border border-slate-700/60 shadow-md cursor-pointer hover:border-indigo-500/60 transition-all flex flex-col justify-between space-y-4"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400 shrink-0 shadow-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono font-black text-indigo-300 block">
                {report.id}
              </span>
              <h4 className="font-extrabold text-white text-base leading-snug">
                {report.incidentType}
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            {getStatusBadge(report.status)}
            {getSeverityBadge(report.severity)}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-normal">
          {report.description}
        </p>

        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5 text-slate-300 truncate max-w-[220px] font-semibold">
            <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="truncate">{report.locationName || "Area Pinpoint"}</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">{report.date}</span>
        </div>
      </div>

      {/* Detail Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content max-w-lg p-6 space-y-4 border border-slate-700/80 shadow-2xl">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-800 pb-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-extrabold text-indigo-300 bg-indigo-950/80 px-2.5 py-0.5 rounded-full border border-indigo-500/40">
                    ID: {report.id}
                  </span>
                  {getStatusBadge(report.status)}
                </div>
                <h3 className="text-xl font-extrabold text-white mt-1.5 font-display">
                  {report.incidentType}
                </h3>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content info grid */}
            <div className="grid grid-cols-2 gap-3.5 text-xs bg-slate-950/90 p-4 rounded-2xl border border-slate-800 shadow-inner">
              <div>
                <span className="text-slate-400 block font-semibold">Complainant:</span>
                <span className="font-extrabold text-white text-sm">
                  {report.isAnonymous ? "🔒 Anonymous Citizen" : report.fullName}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Severity Level:</span>
                <span className="font-extrabold text-white text-sm">{report.severity}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Incident Date & Time:</span>
                <span className="font-bold text-slate-200">{report.date} at {report.time}</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Logged Timestamp:</span>
                <span className="font-bold text-slate-200">{report.createdAt}</span>
              </div>
            </div>

            {/* Location */}
            <div className="text-xs space-y-1">
              <span className="text-slate-400 block font-bold">Incident Location:</span>
              <div className="flex items-center gap-2 text-white font-medium bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{report.locationName || `${report.lat}, ${report.lng}`}</span>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs space-y-1">
              <span className="text-slate-400 block font-bold">Incident Description:</span>
              <p className="text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 whitespace-pre-wrap font-normal">
                {report.description}
              </p>
            </div>

            {/* Attached Photo Preview if any */}
            {report.image && (
              <div className="text-xs space-y-1">
                <span className="text-slate-400 block font-bold">Attached Evidence Image:</span>
                <img 
                  src={report.image} 
                  alt="Incident evidence" 
                  className="w-full max-h-48 object-cover rounded-xl border border-slate-800 shadow-md"
                />
              </div>
            )}

            {/* Resolution/Status Note */}
            <div className="bg-indigo-950/40 border border-indigo-500/40 rounded-xl p-3.5 text-xs space-y-1 shadow-sm">
              <span className="text-indigo-300 font-extrabold block flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                <span>Desk Tracking Status</span>
              </span>
              <p className="text-slate-200 leading-relaxed font-medium">
                {report.statusNote || "Report has been archived in community records and safety intelligence map."}
              </p>
            </div>

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-400 leading-tight font-medium">
              *SafeHer incident records serve community safety intelligence and do not replace official police First Information Reports (FIR). For immediate criminal inquiry, contact local station or call 112.
            </p>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="btn btn-outline btn-sm text-xs flex items-center gap-1.5 border-slate-700"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Summary</span>
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="btn btn-primary btn-sm text-xs font-bold"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
