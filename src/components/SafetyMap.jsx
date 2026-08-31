import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import L from 'leaflet';
import { 
  ShieldCheck, 
  Hospital, 
  Shield, 
  Phone, 
  Navigation, 
  MapPin, 
  ExternalLink,
  LocateFixed,
  Star
} from 'lucide-react';
import { safetyLocations } from '../data/safetyLocations';
import { getGoogleMapsUrl, calculateDistance } from '../utils/location';

// Helper component to re-center map when coordinates change
const MapRecenter = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, 14, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
};

// Create custom HTML markers
const createUserIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="position: relative; width: 30px; height: 30px;">
        <div style="position: absolute; inset: 0; border-radius: 50%; background: #6366f1; opacity: 0.45; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; width: 26px; height: 26px; margin: 2px; border-radius: 50%; background: #4f46e5; border: 3px solid #ffffff; box-shadow: 0 0 16px rgba(99, 102, 241, 0.9);"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

const createCategoryIcon = (category) => {
  let bg = '#4f46e5';
  let letter = '👮';
  if (category === 'police') {
    bg = '#2563eb';
    letter = '👮';
  } else if (category === 'hospital') {
    bg = '#e11d48';
    letter = '🏥';
  } else if (category === 'safehub') {
    bg = '#059669';
    letter = '🛡️';
  } else if (category === 'pharmacy') {
    bg = '#d97706';
    letter = '💊';
  }

  return L.divIcon({
    className: 'custom-category-marker',
    html: `
      <div style="
        width: 34px; 
        height: 34px; 
        background: ${bg}; 
        border-radius: 50% 50% 50% 0; 
        transform: rotate(-45deg); 
        border: 2px solid #ffffff; 
        box-shadow: 0 6px 14px rgba(0,0,0,0.45);
        display: flex; 
        align-items: center; 
        justify-content: center;
      ">
        <span style="transform: rotate(45deg); font-size: 15px;">${letter}</span>
      </div>
    `,
    iconSize: [34, 34],
    iconAnchor: [17, 34],
    popupAnchor: [0, -34]
  });
};

export const SafetyMap = ({ 
  userCoords, 
  filterCategory = 'all',
  selectedLocationId = null,
  height = '500px'
}) => {
  const [activeLocation, setActiveLocation] = useState(null);

  const centerCoords = [
    userCoords?.lat || 28.6139,
    userCoords?.lng || 77.2090
  ];

  const filteredLocations = safetyLocations.filter(loc => {
    if (filterCategory === 'all') return true;
    return loc.category === filterCategory;
  });

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/60 shadow-lg" style={{ height }}>
      <MapContainer
        center={centerCoords}
        zoom={13}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        <MapRecenter center={centerCoords} />

        {/* OpenStreetMap Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Location Marker & Safety Radius */}
        {userCoords && (
          <>
            <Marker position={[userCoords.lat, userCoords.lng]} icon={createUserIcon()}>
              <Popup>
                <div className="p-1 space-y-1 text-slate-900 font-sans">
                  <div className="flex items-center gap-1.5 font-extrabold text-indigo-700 text-sm">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>Your Current Location</span>
                  </div>
                  <p className="text-xs text-slate-800 font-mono font-bold">
                    {userCoords.lat.toFixed(5)}° N, {userCoords.lng.toFixed(5)}° E
                  </p>
                  <p className="text-[11px] text-slate-600 font-semibold">
                    SafeHer active sensor boundary
                  </p>
                </div>
              </Popup>
            </Marker>

            <Circle
              center={[userCoords.lat, userCoords.lng]}
              radius={800}
              pathOptions={{ color: '#6366f1', fillColor: '#6366f1', fillOpacity: 0.12 }}
            />
          </>
        )}

        {/* Verified Safety Location Markers */}
        {filteredLocations.map((loc) => {
          const dist = userCoords 
            ? calculateDistance(userCoords.lat, userCoords.lng, loc.lat, loc.lng) 
            : loc.distance;

          const routeUrl = getGoogleMapsUrl(loc.lat, loc.lng);

          return (
            <Marker
              key={loc.id}
              position={[loc.lat, loc.lng]}
              icon={createCategoryIcon(loc.category)}
              eventHandlers={{
                click: () => setActiveLocation(loc)
              }}
            >
              <Popup>
                <div className="p-1 max-w-xs space-y-2 text-slate-900 font-sans">
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-1.5">
                    <span className="font-extrabold text-sm text-slate-900 leading-tight">
                      {loc.name}
                    </span>
                    <span className="text-[10px] font-black uppercase bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-full shrink-0 border border-indigo-300">
                      {loc.categoryLabel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium leading-snug">
                    {loc.address}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-900 pt-1 font-bold">
                    <div className="flex items-center gap-1 text-emerald-800">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{dist} km away</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-600" />
                      <span>{loc.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1.5">
                    <a
                      href={`tel:${loc.phone}`}
                      className="flex-1 bg-slate-900 hover:bg-black text-white text-xs font-bold py-1.5 px-2 rounded-lg text-center flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Phone className="w-3 h-3 text-white" />
                      <span className="text-white">Call</span>
                    </a>
                    <a
                      href={routeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold py-1.5 px-2 rounded-lg text-center flex items-center justify-center gap-1 shadow-sm"
                    >
                      <ExternalLink className="w-3 h-3 text-white" />
                      <span className="text-white">Directions</span>
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
