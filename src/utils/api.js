// SafeHer API Utility
// Centralized fetch wrapper with JWT injection and error handling

const API_BASE = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('safeher_token');

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `HTTP error ${response.status}`);
  }

  return data;
};

export const api = {
  // Auth
  login: (credentials) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getMe: () => apiRequest('/auth/me'),

  // Incidents
  getIncidents: () => apiRequest('/incidents'),
  createIncident: (data) => apiRequest('/incidents', { method: 'POST', body: JSON.stringify(data) }),
  deleteIncident: (id) => apiRequest(`/incidents/${id}`, { method: 'DELETE' }),

  // Alerts
  getAlerts: () => apiRequest('/alerts'),
  createAlert: (data) => apiRequest('/alerts', { method: 'POST', body: JSON.stringify(data) }),

  // Contacts
  getContacts: () => apiRequest('/contacts'),
  addContact: (data) => apiRequest('/contacts', { method: 'POST', body: JSON.stringify(data) }),
  updateContact: (id, data) => apiRequest(`/contacts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteContact: (id) => apiRequest(`/contacts/${id}`, { method: 'DELETE' }),

  // SOS
  triggerSOS: (data) => apiRequest('/sos/trigger', { method: 'POST', body: JSON.stringify(data) }),
  resolveSOS: (id) => apiRequest(`/sos/resolve/${id}`, { method: 'POST' }),
  getSOSLogs: () => apiRequest('/sos/logs'),

  // Health check
  health: () => apiRequest('/health'),
};

export default api;
