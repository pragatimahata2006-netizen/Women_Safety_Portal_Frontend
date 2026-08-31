// SafeHer In-Memory Data Store
// Acts as a lightweight database for the backend API

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

// Pre-seed some demo data
const defaultAlerts = [
  {
    id: uuidv4(),
    title: 'Increased Police Patrolling in Park Street Area',
    description: 'Kolkata Police has increased night patrolling in response to multiple harassment reports. Citizens advised to stay alert.',
    category: 'Police Advisory',
    area: 'Park Street, Kolkata',
    severity: 'medium',
    timestamp: '2 hours ago',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Safe Zone Designated: Howrah Station Exit Gate 3',
    description: 'Women\'s helpdesk now operational at Howrah Station Gate 3, staffed 24x7. Emergency phone available.',
    category: 'Safe Zone',
    area: 'Howrah Station',
    severity: 'info',
    timestamp: '5 hours ago',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Warning: Unlit Stretch on EM Bypass Near Bypass Connector',
    description: 'Multiple complaints of poor lighting reported. Municipality repair crew dispatched. Avoid area after dark.',
    category: 'Hazard Warning',
    area: 'EM Bypass, Kolkata',
    severity: 'high',
    timestamp: '1 day ago',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Women\'s Safety Drive: Free Self-Defense Workshop',
    description: 'Kolkata Municipal Corporation organizing free self-defense workshop for women. Registration open.',
    category: 'Community Event',
    area: 'Salt Lake, Kolkata',
    severity: 'info',
    timestamp: '2 days ago',
    createdAt: new Date().toISOString()
  }
];

// Create a default demo user
const demoUserPassword = bcrypt.hashSync('safeher123', 10);

const store = {
  users: [
    {
      id: uuidv4(),
      name: 'Bristi Mahata',
      email: 'bristi.mahata@safeher.org',
      password: demoUserPassword,
      phone: '+91 98765 43210',
      bloodGroup: 'O+',
      address: 'Salt Lake, Kolkata',
      createdAt: new Date().toISOString()
    }
  ],
  incidents: [
    {
      id: uuidv4(),
      userId: null, // will be replaced with actual user id
      title: 'Suspicious Activity Near Market',
      description: 'Observed suspicious individuals following women near the local market area.',
      type: 'Suspicious Activity',
      location: 'Salt Lake Sector V, Kolkata',
      lat: 22.5726,
      lng: 88.3639,
      status: 'Under Review',
      severity: 'medium',
      anonymous: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    }
  ],
  alerts: defaultAlerts,
  contacts: [
    {
      id: uuidv4(),
      userId: null,
      name: 'Sasanka Mahata',
      relationship: 'Father',
      phone: '+91 99999 11111',
      email: 'sasanka@example.com',
      isPrimary: true
    },
    {
      id: uuidv4(),
      userId: null,
      name: 'Sima Mahata',
      relationship: 'Mother',
      phone: '+91 99999 22222',
      email: 'sima@example.com',
      isPrimary: false
    },
    {
      id: uuidv4(),
      userId: null,
      name: 'Mrittika Mahata',
      relationship: 'Sister',
      phone: '+91 99999 33333',
      email: 'mrittika@example.com',
      isPrimary: false
    }
  ],
  sosLogs: []
};

// Link demo incidents/contacts to demo user
const demoUser = store.users[0];
store.incidents.forEach(i => { if (!i.userId) i.userId = demoUser.id; });
store.contacts.forEach(c => { if (!c.userId) c.userId = demoUser.id; });

module.exports = store;
