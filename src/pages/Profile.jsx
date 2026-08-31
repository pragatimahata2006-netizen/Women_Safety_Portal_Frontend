import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  ShieldCheck, 
  Edit3, 
  Save, 
  Printer, 
  LogOut, 
  Sparkles, 
  Lock, 
  Activity 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSafety } from '../context/SafetyContext';
import { Link } from 'react-router-dom';

export const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { contacts } = useSafety();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || 'Bristi Mahata',
    email: user?.email || 'bristi.mahata@safeher.org',
    phone: user?.phone || '+91 98765 43210',
    bloodGroup: user?.bloodGroup || 'O+',
    medicalNotes: user?.medicalNotes || 'Asthma inhaler in bag. No drug allergies.',
    address: user?.address || 'Connaught Place, New Delhi'
  });

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
  };

  const primaryContact = contacts[0] || { name: "Sasanka Mahata (Father)", phone: "+91 98765 44556" };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wide">
            <User className="w-4 h-4" />
            <span>Personal Safety Profile</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-wide leading-relaxed">
            {user?.name || "Bristi Mahata"}
          </h1>
          <p className="text-sm text-slate-300 font-medium leading-relaxed">
            Emergency medical information, personal contact details, and printable SafeHer ID card.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm flex items-center gap-2 font-bold border border-slate-700 shadow-sm"
          >
            <Printer className="w-4 h-4 text-indigo-400" />
            <span>Print Safety ID</span>
          </button>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm flex items-center gap-2 font-extrabold shadow-md"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? "Cancel Edit" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Col: Printable SafeHer Emergency ID Card */}
        <div className="md:col-span-1 space-y-4">
          <div className="p-6 bg-slate-900 rounded-xl border border-rose-500/40 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-600 text-[10px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-wide shadow-sm">
              SafeHer ID
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white font-black text-2xl shadow-lg border-2 border-white/20">
                {user?.name?.charAt(0) || "B"}
              </div>
              <div>
                <h4 className="font-extrabold text-lg leading-tight">{user?.name || "Bristi Mahata"}</h4>
                <span className="text-xs text-slate-400 font-mono font-bold">ID: {user?.id || "usr-safe-01"}</span>
              </div>
            </div>

            <div className="space-y-2.5 border-t border-slate-800 pt-3.5 text-xs font-semibold">
              <div className="flex justify-between">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-extrabold text-rose-400 text-sm">{user?.bloodGroup || "O+"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Primary Contact:</span>
                <span className="font-bold text-white truncate max-w-[140px]">{primaryContact?.name || "Sasanka Mahata (Father)"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">National Helpline:</span>
                <span className="font-mono text-indigo-300 font-extrabold">112 ERSS</span>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1 shadow-inner">
              <span className="text-slate-400 font-bold block">Medical / Allergy Alert:</span>
              <p className="text-slate-200 leading-relaxed font-medium">{user?.medicalNotes || "Asthma inhaler in bag. No drug allergies."}</p>
            </div>
          </div>

          <button
            onClick={logout}
            className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-rose-500/40 hover:bg-rose-500/10 text-rose-300 text-xs sm:text-sm flex items-center justify-center gap-2 font-extrabold shadow-sm transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of SafeHer</span>
          </button>
        </div>

        {/* Right Col: Details / Edit Form */}
        <div className="md:col-span-2">
          {isEditing ? (
            <form onSubmit={handleSave} className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md space-y-4">
              <h3 className="font-extrabold text-white text-lg border-b border-slate-800 pb-3">Update Profile & Medical Records</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Full Name & Surname</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input font-bold"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input font-medium"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input font-mono font-bold"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="form-select font-bold"
                  >
                    {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="form-input font-medium"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>Medical Notes / Allergies / Inhaler / Medications</span>
                </label>
                <textarea
                  value={formData.medicalNotes}
                  onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                  placeholder="Specify asthma, diabetes, allergies, etc..."
                  rows={3}
                  className="form-textarea leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
                <h3 className="font-extrabold text-white text-lg">Account & Safety Information</h3>
                <span className="badge badge-safe text-[10px]">Verified Member</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 shadow-inner">
                  <span className="text-slate-400 flex items-center gap-2 font-semibold">
                    <User className="w-4 h-4 text-indigo-400" />
                    <span>Full Name</span>
                  </span>
                  <p className="font-extrabold text-white text-base">{user?.name || "Bristi Mahata"}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 shadow-inner">
                  <span className="text-slate-400 flex items-center gap-2 font-semibold">
                    <Mail className="w-4 h-4 text-indigo-400" />
                    <span>Email Address</span>
                  </span>
                  <p className="font-extrabold text-white text-base">{user?.email || "bristi.mahata@safeher.org"}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 shadow-inner">
                  <span className="text-slate-400 flex items-center gap-2 font-semibold">
                    <Phone className="w-4 h-4 text-indigo-400" />
                    <span>Primary Phone</span>
                  </span>
                  <p className="font-extrabold text-white text-base font-mono">{user?.phone || "+91 98765 43210"}</p>
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 shadow-inner">
                  <span className="text-slate-400 flex items-center gap-2 font-semibold">
                    <Heart className="w-4 h-4 text-rose-400" />
                    <span>Blood Group</span>
                  </span>
                  <p className="font-black text-rose-400 text-lg">{user?.bloodGroup || "O+"}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm space-y-1 shadow-inner">
                <span className="text-slate-400 flex items-center gap-2 font-bold">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  <span>Primary Address:</span>
                </span>
                <p className="text-slate-200 font-medium">{user?.address || "Connaught Place, New Delhi"}</p>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs sm:text-sm space-y-1 shadow-inner">
                <span className="text-slate-400 flex items-center gap-2 font-bold">
                  <Activity className="w-4 h-4 text-rose-400" />
                  <span>Medical & Emergency Notes:</span>
                </span>
                <p className="text-slate-200 leading-relaxed font-medium">{user?.medicalNotes || "Asthma inhaler in bag. No drug allergies."}</p>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
                <span className="font-medium">Member since: {user?.joinDate || "August 2026"}</span>
                <Link to="/contacts" className="text-indigo-400 font-bold hover:underline">
                  Manage {contacts.length} Mahata Family Contacts →
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
