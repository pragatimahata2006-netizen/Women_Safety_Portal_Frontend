import React, { useState } from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  Hospital, 
  Shield, 
  Ambulance, 
  Search, 
  Navigation, 
  Phone, 
  ExternalLink, 
  Star,
  CheckCircle2,
  LocateFixed,
  Sparkles
} from 'lucide-react';
import { safetyLocations } from '../data/safetyLocations';
import { SafetyMap } from '../components/SafetyMap';
import { useSafety } from '../context/SafetyContext';
import { calculateDistance, getGoogleMapsUrl } from '../utils/location';

export const SafetyMapPage = () => {
  const { currentLocation, refreshLocation, isLocating } = useSafety();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);

  const categories = [
    { id: 'all', label: 'All Safe Hubs', icon: MapPin },
    { id: 'police', label: 'Police Stations', icon: ShieldCheck },
    { id: 'hospital', label: 'Hospitals & ER', icon: Hospital },
    { id: 'safehub', label: 'Transit Safe Hubs', icon: Shield },
    { id: 'pharmacy', label: '24/7 Pharmacies', icon: Ambulance }
  ];

  const filteredLocations = safetyLocations.filter((place) => {
    const matchesCat = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = 
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 border border-indigo-500/25 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950/40 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-wider mb-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verified Safety Infrastructure</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-display tracking-tight">
            Interactive Safety Map
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl font-medium">
            Locate verified police desks, emergency hospitals, round-the-clock pharmacies, and monitored transit safe hubs in your vicinity.
          </p>
        </div>

        <button
          onClick={refreshLocation}
          disabled={isLocating}
          className="btn btn-outline text-xs sm:text-sm flex items-center gap-2 font-bold border-slate-700 shadow-sm"
        >
          <LocateFixed className={`w-4 h-4 text-indigo-400 ${isLocating ? "animate-spin" : ""}`} />
          <span>{isLocating ? "Calibrating GPS..." : "Re-center On My Location"}</span>
        </button>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3.5">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search safe place, hospital, area..."
            className="form-input pl-10 text-xs sm:text-sm py-2.5 font-medium"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 text-xs sm:text-sm px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Layout: Map & Side List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Map (2 cols on large) */}
        <div className="lg:col-span-2">
          <SafetyMap
            userCoords={currentLocation}
            filterCategory={selectedCategory}
            selectedLocationId={selectedPlace?.id}
            height="580px"
          />
        </div>

        {/* Safe Places List (1 col) */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-white text-base">
              Nearby Places ({filteredLocations.length})
            </h3>
            <span className="text-xs text-slate-400 font-medium">Sorted by proximity</span>
          </div>

          <div className="space-y-3 max-h-[530px] overflow-y-auto pr-1">
            {filteredLocations.map((place) => {
              const dist = calculateDistance(currentLocation.lat, currentLocation.lng, place.lat, place.lng);
              const mapRouteUrl = getGoogleMapsUrl(place.lat, place.lng);

              return (
                <div 
                  key={place.id}
                  onClick={() => setSelectedPlace(place)}
                  className={`glass-panel p-5 border border-slate-700/60 shadow-md cursor-pointer transition-all space-y-3 hover:border-indigo-500/60 ${
                    selectedPlace?.id === place.id ? "border-indigo-500 bg-indigo-950/30" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                      {place.categoryLabel}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400 flex items-center gap-1 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{dist} km</span>
                    </span>
                  </div>

                  <div>
                    <h4 className="font-extrabold text-white text-base leading-tight">{place.name}</h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">{place.address}</p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span className="text-emerald-400 font-bold">{place.operatingHours}</span>
                    <div className="flex items-center gap-1 text-amber-400 font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{place.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <a
                      href={`tel:${place.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-sm btn-outline flex-1 text-xs py-1.5 font-bold"
                    >
                      <Phone className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Call</span>
                    </a>
                    <a
                      href={mapRouteUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn btn-sm btn-primary flex-1 text-xs py-1.5 font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Directions</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};
