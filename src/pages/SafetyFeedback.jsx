import React, { useState } from 'react';
import { 
  Star, 
  MapPin, 
  PlusCircle, 
  ShieldCheck, 
  Lightbulb, 
  Users, 
  CheckCircle2, 
  X,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useSafety } from '../context/SafetyContext';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';

export const SafetyFeedback = () => {
  const { ratings, submitRating } = useSafety();
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    placeName: '',
    area: 'Central Delhi',
    category: 'Transit Station',
    rating: 5,
    lightingScore: 5,
    crowdScore: 4,
    policeScore: 4,
    comment: '',
    author: user?.name || 'Concerned Citizen'
  });

  const categories = ['Transit Station', 'Commercial Market', 'Public Plaza', 'University Campus', 'Bus Stand', 'Residential Street', 'Underpass'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.placeName || !formData.comment) return;

    submitRating({
      ...formData,
      author: user?.name || 'Citizen'
    });

    setModalOpen(false);
    setFormData({
      placeName: '',
      area: 'Central Delhi',
      category: 'Transit Station',
      rating: 5,
      lightingScore: 5,
      crowdScore: 4,
      policeScore: 4,
      comment: '',
      author: user?.name || 'Citizen'
    });

    try {
      confetti({ particleCount: 50, spread: 50 });
    } catch (e) {}
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="glass-panel p-6 border border-indigo-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider mb-1.5">
            <Star className="w-4 h-4 text-amber-400" />
            <span>Crowdsourced Safety Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Community Safety Audits & Spot Ratings
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl font-medium">
            Evaluate and review public locations, transit stations, and streets for lighting quality, crowd activity, and security presence.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="btn btn-primary shadow-lg flex items-center gap-2 text-xs sm:text-sm py-3 px-5 font-extrabold"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Audit a Public Spot</span>
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ratings.map((item) => (
          <div key={item.id} className="glass-panel p-6 border border-slate-700/60 shadow-md flex flex-col justify-between space-y-4 hover:border-indigo-500/50 transition-all">
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                    {item.category}
                  </span>
                  <h4 className="font-extrabold text-white text-base mt-2 leading-snug">
                    {item.placeName}
                  </h4>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{item.area}</span>
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-amber-500/15 border border-amber-500/40 px-2.5 py-1 rounded-xl text-amber-300 font-extrabold text-xs shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{item.rating}.0</span>
                </div>
              </div>

              {/* Safety Score Indicators */}
              <div className="grid grid-cols-3 gap-2 my-3.5 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs shadow-inner">
                <div>
                  <span className="text-slate-400 block font-semibold">Lighting</span>
                  <span className="font-extrabold text-emerald-400 text-sm">{item.lightingScore}/5</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Crowd</span>
                  <span className="font-extrabold text-indigo-400 text-sm">{item.crowdScore}/5</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Police</span>
                  <span className="font-extrabold text-amber-400 text-sm">{item.policeScore}/5</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-normal">
                "{item.comment}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold text-slate-200">By {item.author}</span>
              <span className="text-emerald-400 font-extrabold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Audit</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Audit Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content max-w-md p-6 space-y-4 border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div className="flex items-center gap-2 font-extrabold text-white text-lg">
                <Star className="w-5 h-5 text-amber-400" />
                <span>Submit Safety Spot Audit</span>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="form-group">
                <label className="form-label">Place or Spot Name</label>
                <input
                  type="text"
                  value={formData.placeName}
                  onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                  placeholder="e.g. Rajiv Chowk Gate 5, City Library Lane"
                  className="form-input"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Area / Locality</label>
                  <input
                    type="text"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    placeholder="e.g. South Delhi"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-select"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Sliders for Safety Parameters */}
              <div className="space-y-3 p-4 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-slate-300">Street Lighting (1=Dark, 5=Bright):</span>
                  <span className="font-extrabold text-amber-400">{formData.lightingScore}/5</span>
                </div>
                <input 
                  type="range" min="1" max="5" 
                  value={formData.lightingScore}
                  onChange={(e) => setFormData({ ...formData, lightingScore: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />

                <div className="flex items-center justify-between font-bold pt-1">
                  <span className="text-slate-300">Public Activity / Crowd Density:</span>
                  <span className="font-extrabold text-indigo-400">{formData.crowdScore}/5</span>
                </div>
                <input 
                  type="range" min="1" max="5" 
                  value={formData.crowdScore}
                  onChange={(e) => setFormData({ ...formData, crowdScore: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />

                <div className="flex items-center justify-between font-bold pt-1">
                  <span className="text-slate-300">Police / Guard Presence:</span>
                  <span className="font-extrabold text-emerald-400">{formData.policeScore}/5</span>
                </div>
                <input 
                  type="range" min="1" max="5" 
                  value={formData.policeScore}
                  onChange={(e) => setFormData({ ...formData, policeScore: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Review / Safety Feedback</label>
                <textarea
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  placeholder="Describe your safety experience, recommended hours to visit or avoid, presence of safe transit..."
                  rows={3}
                  className="form-textarea"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-ghost text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary text-xs sm:text-sm font-extrabold shadow-md">
                  Submit Spot Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
