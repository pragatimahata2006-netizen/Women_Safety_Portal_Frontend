import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { getStorageItem, setStorageItem } from '../utils/storage';
import { getUserCoordinates, DEFAULT_COORDINATES } from '../utils/location';
import { soundManager } from '../utils/sound';
import { initialSafetyAlerts, initialCommunityRatings } from '../data/safetyAlerts';
import { api } from '../utils/api';

const SafetyContext = createContext();

const INITIAL_CONTACTS = [
  {
    id: "cnt-1",
    name: "Sasanka Mahata (Father)",
    relationship: "Father",
    phone: "+91 98765 44556",
    priority: "Primary",
    notifySms: true,
    notifyCall: true,
    notifyWhatsApp: true
  },
  {
    id: "cnt-2",
    name: "Sima Mahata (Mother)",
    relationship: "Mother",
    phone: "+91 98765 11223",
    priority: "Primary",
    notifySms: true,
    notifyCall: true,
    notifyWhatsApp: true
  },
  {
    id: "cnt-3",
    name: "Mrittika Mahata (Best Friend)",
    relationship: "Friend",
    phone: "+91 98112 33445",
    priority: "Secondary",
    notifySms: true,
    notifyCall: false,
    notifyWhatsApp: true
  }
];

const INITIAL_REPORTS = [
  {
    id: "WS-20260826-001",
    fullName: "Bristi Mahata",
    isAnonymous: false,
    incidentType: "Unsafe Location",
    date: "2026-08-26",
    time: "21:15",
    locationName: "South Extension Metro Underpass",
    lat: 28.5728,
    lng: 77.2223,
    description: "Broken municipal streetlights and inadequate patrolling along the pedestrian underpass. Groups loitering late evening.",
    image: null,
    severity: "Medium",
    status: "Under Review",
    statusNote: "Noted by local safety desk. Municipal lighting ticket created.",
    createdAt: "26 Aug 2026, 09:30 PM"
  },
  {
    id: "WS-20260824-002",
    fullName: "Anonymous Citizen",
    isAnonymous: true,
    incidentType: "Harassment",
    date: "2026-08-24",
    time: "19:40",
    locationName: "Connaught Place Radial Road 3",
    lat: 28.6328,
    lng: 77.2197,
    description: "Verbal catcalling by two individuals on a two-wheeler without helmet. Reported to station beat marshal.",
    image: null,
    severity: "High",
    status: "Action Taken",
    statusNote: "PCR patrol frequency increased in Outer Radial section.",
    createdAt: "24 Aug 2026, 08:00 PM"
  }
];

export const SafetyProvider = ({ children }) => {
  // Contacts
  const [contacts, setContacts] = useState(() => {
    const stored = getStorageItem('safeher_contacts', null);
    // Check if contacts have old names or empty, use Mahata family default
    if (!stored || !stored.some(c => c.name.includes("Mahata"))) {
      return INITIAL_CONTACTS;
    }
    return stored;
  });

  // Location
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_COORDINATES);
  const [isLocating, setIsLocating] = useState(false);

  // SOS State
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const [sosTriggeredTime, setSosTriggeredTime] = useState(null);

  // Siren State
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);

  // Fake Call State
  const [isFakeCallOpen, setIsFakeCallOpen] = useState(false);
  const [fakeCallerName, setFakeCallerName] = useState("Sima Mahata (Mother)");

  // Safety Timer ("Walk With Me")
  const [isSafetyTimerActive, setIsSafetyTimerActive] = useState(false);
  const [safetyTimerSeconds, setSafetyTimerSeconds] = useState(0);
  const [safetyTimerDestination, setSafetyTimerDestination] = useState("");
  const timerIntervalRef = useRef(null);

  // Incident Reports
  const [reports, setReports] = useState(() => {
    return getStorageItem('safeher_reports', INITIAL_REPORTS);
  });

  // Alerts
  const [alerts, setAlerts] = useState(() => {
    return getStorageItem('safeher_alerts', initialSafetyAlerts);
  });

  // Community Ratings
  const [ratings, setRatings] = useState(() => {
    return getStorageItem('safeher_ratings', initialCommunityRatings);
  });

  // Save to storage
  useEffect(() => {
    setStorageItem('safeher_contacts', contacts);
  }, [contacts]);

  useEffect(() => {
    setStorageItem('safeher_reports', reports);
  }, [reports]);

  useEffect(() => {
    setStorageItem('safeher_alerts', alerts);
  }, [alerts]);

  useEffect(() => {
    setStorageItem('safeher_ratings', ratings);
  }, [ratings]);

  // Initial Location Fetch
  const refreshLocation = async () => {
    setIsLocating(true);
    try {
      const coords = await getUserCoordinates();
      setCurrentLocation(coords);
      return coords;
    } finally {
      setIsLocating(false);
    }
  };

  useEffect(() => {
    refreshLocation();
  }, []);

  // SOS Methods
  const triggerSos = async () => {
    const coords = await refreshLocation();
    setIsSosActive(true);
    setSosModalOpen(true);
    setSosTriggeredTime(new Date().toLocaleTimeString());
    soundManager.startEmergencySiren();
    setIsSirenPlaying(true);
    // Log SOS to backend (non-blocking)
    try {
      await api.triggerSOS({
        lat: coords?.lat,
        lng: coords?.lng,
        message: 'Emergency SOS triggered'
      });
    } catch (_) {
      // Backend may be offline; SOS still works client-side
    }
  };

  const cancelSos = () => {
    setIsSosActive(false);
    setSosModalOpen(false);
    soundManager.stopEmergencySiren();
    setIsSirenPlaying(false);
  };

  const toggleSiren = () => {
    if (isSirenPlaying) {
      soundManager.stopEmergencySiren();
      setIsSirenPlaying(false);
    } else {
      soundManager.startEmergencySiren();
      setIsSirenPlaying(true);
    }
  };

  // Fake Call
  const startFakeCall = (callerName = "Sima Mahata (Mother)") => {
    setFakeCallerName(callerName);
    setIsFakeCallOpen(true);
    soundManager.startPhoneRingtone();
  };

  const stopFakeCall = () => {
    setIsFakeCallOpen(false);
    soundManager.stopPhoneRingtone();
  };

  // Safety Timer ("Walk With Me")
  const startSafetyTimer = (minutes, destination = "Home") => {
    const totalSeconds = minutes * 60;
    setSafetyTimerSeconds(totalSeconds);
    setSafetyTimerDestination(destination);
    setIsSafetyTimerActive(true);

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setSafetyTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          soundManager.playBeep(880, 0.4);
          triggerSos();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSafetyTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsSafetyTimerActive(false);
    setSafetyTimerSeconds(0);
  };

  const checkInSafetyTimer = () => {
    cancelSafetyTimer();
    soundManager.playBeep(520, 0.2);
  };

  // Contacts CRUD
  const addContact = (newContact) => {
    const contact = {
      ...newContact,
      id: "cnt-" + Date.now()
    };
    setContacts(prev => [contact, ...prev]);
  };

  const updateContact = (id, updatedFields) => {
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, ...updatedFields } : c))
    );
  };

  const deleteContact = (id) => {
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  // Reports Management
  const submitReport = (reportData) => {
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    const randomSeq = String(Math.floor(100 + Math.random() * 900));
    const newId = `WS-${dateStr}-${randomSeq}`;

    const newReport = {
      ...reportData,
      id: newId,
      status: "Submitted",
      statusNote: "Received by SafeHer moderation desk. Awaiting community verification.",
      createdAt: today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ", " + today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setReports(prev => [newReport, ...prev]);
    return newReport;
  };

  // Alerts Helpful
  const markAlertHelpful = (alertId) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === alertId ? { ...alert, helpfulCount: alert.helpfulCount + 1 } : alert
      )
    );
  };

  // Community Ratings
  const submitRating = (newRatingData) => {
    const ratingItem = {
      ...newRatingData,
      id: "cr-" + Date.now(),
      date: "Just now",
      verifiedVisit: true
    };
    setRatings(prev => [ratingItem, ...prev]);
  };

  return (
    <SafetyContext.Provider
      value={{
        contacts,
        addContact,
        updateContact,
        deleteContact,
        currentLocation,
        isLocating,
        refreshLocation,
        isSosActive,
        sosModalOpen,
        setSosModalOpen,
        sosTriggeredTime,
        triggerSos,
        cancelSos,
        isSirenPlaying,
        toggleSiren,
        isFakeCallOpen,
        fakeCallerName,
        startFakeCall,
        stopFakeCall,
        isSafetyTimerActive,
        safetyTimerSeconds,
        safetyTimerDestination,
        startSafetyTimer,
        cancelSafetyTimer,
        checkInSafetyTimer,
        reports,
        submitReport,
        alerts,
        markAlertHelpful,
        ratings,
        submitRating
      }}
    >
      {children}
    </SafetyContext.Provider>
  );
};

export const useSafety = () => {
  const context = useContext(SafetyContext);
  if (!context) {
    throw new Error('useSafety must be used within a SafetyProvider');
  }
  return context;
};
