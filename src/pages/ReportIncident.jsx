import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  MapPin, 
  Upload, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Camera, 
  Sparkles, 
  X,
  Info
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const ReportIncident = () => {
  const { currentLocation, submitReport } = useSafety();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'Bristi Mahata',
    isAnonymous: false,
    incidentType: 'Unsafe Location',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    locationName: '',
    lat: currentLocation.lat,
    lng: currentLocation.lng,
    description: '',
    severity: 'Medium',
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submittedReport, setSubmittedReport] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes = [
    'Unsafe Location',
    'Poor Lighting / Dark Spot',
    'Harassment / Stalking',
    'Suspicious Activity',
    'Lack of Police Presence',
    'Verbal Abuse / Catcalling',
    'Overcrowded / Hostile Transit',
    'Other Safety Concern'
  ];

  const severities = ['Low', 'Medium', 'High'];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({ ...prev, image: null }));
  };

  const handleUseGPSLocation = () => {
    setFormData(prev => ({
      ...prev,
      lat: currentLocation.lat,
      lng: currentLocation.lng,
      locationName: prev.locationName || `Near ${currentLocation.lat.toFixed(4)}° N, ${currentLocation.lng.toFixed(4)}° E`
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const created = submitReport(formData);
      setSubmittedReport(created);
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="rounded-xl p-6 md:p-8 bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-amber-500/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wide">
            <FileText className="w-4 h-4" />
            <span>Community Safety Auditing & Reporting</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide leading-relaxed">
            Report an Incident or Unsafe Spot
          </h1>
          <p className="text-sm text-slate-300 max-w-xl font-medium leading-relaxed">
            Log lighting hazards, harassment, or unsafe transit areas. Reports are moderated and anonymized to notify citizens and municipal desks.
          </p>
        </div>

        <div className="bg-amber-500/15 border border-amber-500/40 rounded-xl px-4 py-2.5 text-amber-300 text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Encrypted & Privacy Guarded</span>
        </div>
      </div>

      {/* Success Confirmation Card */}
      {submittedReport ? (
        <div className="rounded-xl p-8 bg-slate-900/50 border border-emerald-500/60 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="badge badge-safe text-xs font-bold">Report Filed Successfully</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ticket ID: <span className="font-mono text-emerald-400">{submittedReport.id}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-medium">
              Thank you for contributing to collective women's safety. Your report has been submitted to the community audit board and is currently <strong className="text-white">Under Review</strong>.
            </p>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 max-w-md mx-auto text-left text-xs space-y-2 shadow-inner">
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Type:</span>
              <span className="text-white font-extrabold">{submittedReport.incidentType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Location:</span>
              <span className="text-white font-bold truncate max-w-[200px]">{submittedReport.locationName || "GPS Spot"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Date & Time:</span>
              <span className="text-white font-medium">{submittedReport.date} at {submittedReport.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-bold">Filed By:</span>
              <span className="text-indigo-400 font-bold">{submittedReport.isAnonymous ? "Anonymous Citizen" : submittedReport.fullName}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setSubmittedReport(null);
                setFormData({
                  fullName: user?.name || 'Bristi Mahata',
                  isAnonymous: false,
                  incidentType: 'Unsafe Location',
                  date: new Date().toISOString().split('T')[0],
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
                  locationName: '',
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                  description: '',
                  severity: 'Medium',
                  image: null
                });
                setImagePreview(null);
              }}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs sm:text-sm border border-slate-700 transition-colors"
            >
              Submit Another Report
            </button>

            <button
              onClick={() => navigate('/reports')}
              className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md transition-colors"
            >
              View My Reports Tracker →
            </button>
          </div>
        </div>
      ) : (
        /* Report Form Card */
        <form onSubmit={handleSubmit} className="rounded-xl p-6 sm:p-8 bg-slate-900/50 border border-slate-800 shadow-md space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <h3 className="text-lg font-extrabold text-white">Incident Details & Observations</h3>
            <span className="text-xs text-slate-400 font-semibold">* Required information</span>
          </div>

          {/* Anonymous Toggle Strip */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between shadow-inner">
            <div>
              <p className="text-sm font-extrabold text-white">Submit Anonymously</p>
              <p className="text-xs text-slate-400 font-medium">Hides your name ({user?.name || "Bristi Mahata"}) from the community public feed</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isAnonymous}
                onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          {/* Incident Type & Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Incident Category *</span>
              </label>
              <select
                value={formData.incidentType}
                onChange={(e) => setFormData({ ...formData, incidentType: e.target.value })}
                className="form-select font-bold"
                required
              >
                {incidentTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Severity Level</span>
              </label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                className="form-select font-bold"
              >
                {severities.map(s => (
                  <option key={s} value={s}>{s} Severity</option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Date of Incident</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="form-input font-medium"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>Approximate Time</span>
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="form-input font-medium"
                required
              />
            </div>
          </div>

          {/* Location Details with GPS Autofill */}
          <div className="form-group">
            <div className="flex items-center justify-between mb-1">
              <label className="form-label mb-0">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Location / Landmark / Street Name *</span>
              </label>
              <button
                type="button"
                onClick={handleUseGPSLocation}
                className="text-xs text-indigo-300 hover:text-white font-bold underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Use Current GPS</span>
              </button>
            </div>
            <input
              type="text"
              value={formData.locationName}
              onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
              placeholder="e.g. Near Rajiv Chowk Gate 3, underpass or bus stop"
              className="form-input font-medium"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span>Detailed Incident Description *</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the hazard, dark spot, lack of security, behavior, vehicle number if noted..."
              rows={4}
              className="form-textarea leading-relaxed"
              required
            />
          </div>

          {/* Image Upload Dropzone */}
          <div className="form-group">
            <label className="form-label">
              <Camera className="w-4 h-4 text-indigo-400" />
              <span>Optional Photo / Evidence (Broken light, blocked route, etc.)</span>
            </label>

            {imagePreview ? (
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-slate-700 shadow-md">
                <img src={imagePreview} alt="Evidence preview" className="w-full h-48 object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-950/80 text-rose-400 hover:text-rose-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50">
                <Upload className="w-8 h-8 text-slate-500 mb-2" />
                <span className="text-xs sm:text-sm font-bold text-slate-300">Click to upload photo evidence</span>
                <span className="text-[11px] text-slate-500 mt-1">Supports JPG, PNG (Max 5MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Disclaimer & Submission */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-400 shadow-inner">
            <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              <strong className="text-slate-300">Disclaimer:</strong> Submitting an incident report alerts the community and helps identify unsafe zones. For critical emergency situations, always dial <span className="text-rose-400 font-bold">112 ERSS</span> immediately.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs sm:text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "Submitting Ticket..." : "Submit Incident Report"}</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
