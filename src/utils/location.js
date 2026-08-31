/**
 * Default fallback coordinates: Central New Delhi (28.6139, 77.2090)
 */
export const DEFAULT_COORDINATES = {
  lat: 28.6139,
  lng: 77.2090,
  accuracy: 15,
  isDefault: true,
  address: "Connaught Place, New Delhi, India"
};

/**
 * Get current browser geolocation with promise and fallback
 */
export const getUserCoordinates = () => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ ...DEFAULT_COORDINATES, error: "Geolocation is not supported by your browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
          isDefault: false,
          timestamp: new Date(position.timestamp).toLocaleTimeString()
        });
      },
      (error) => {
        let errorMsg = "Unable to retrieve real-time location. Using reference point.";
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = "Location permission denied. You can enable GPS in browser settings.";
        }
        resolve({
          ...DEFAULT_COORDINATES,
          error: errorMsg
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  });
};

/**
 * Calculate distance between two coordinates in kilometers using Haversine formula
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return "0.0";
  const R = 6371; // Radius of Earth in KM
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d.toFixed(1);
};

/**
 * Generate Google Maps live route/pin URL
 */
export const getGoogleMapsUrl = (lat, lng) => {
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

/**
 * Generate WhatsApp emergency distress message with live location
 */
export const getWhatsAppDistressUrl = (phone, lat, lng, userName = "I") => {
  const mapUrl = getGoogleMapsUrl(lat, lng);
  const text = encodeURIComponent(
    `🚨 EMERGENCY SOS ALERT!\n\n${userName} triggered an Emergency SOS from the SafeHer Portal.\n\n📍 Live Location: ${mapUrl}\n\nCoordinates: ${lat.toFixed(5)}, ${lng.toFixed(5)}\n\nPlease contact me or send assistance immediately!`
  );
  
  if (phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${text}`;
  }
  return `https://api.whatsapp.com/send?text=${text}`;
};

/**
 * Generate SMS distress link
 */
export const getSmsDistressUrl = (phone, lat, lng, userName = "I") => {
  const mapUrl = getGoogleMapsUrl(lat, lng);
  const body = encodeURIComponent(
    `EMERGENCY SOS: ${userName} needs immediate assistance! Location: ${mapUrl}`
  );
  return `sms:${phone || ''}?body=${body}`;
};
