const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// GET /api/incidents — list all incidents for user
router.get('/', authMiddleware, (req, res) => {
  const userIncidents = store.incidents
    .filter(i => i.userId === req.user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, incidents: userIncidents, total: userIncidents.length });
});

// GET /api/incidents/all — list all incidents (public, no auth needed)
router.get('/all', (req, res) => {
  const publicIncidents = store.incidents
    .filter(i => !i.anonymous)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, incidents: publicIncidents, total: publicIncidents.length });
});

// POST /api/incidents — create new incident
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, description, type, location, lat, lng, severity, anonymous, witnessCount } = req.body;

    if (!title || !description || !type) {
      return res.status(400).json({ success: false, message: 'Title, description and type are required' });
    }

    const incident = {
      id: uuidv4(),
      userId: req.user.id,
      title,
      description,
      type,
      location: location || 'Location not provided',
      lat: lat || null,
      lng: lng || null,
      severity: severity || 'medium',
      status: 'Submitted',
      anonymous: anonymous || false,
      witnessCount: witnessCount || 0,
      reportedBy: anonymous ? 'Anonymous' : req.user.name,
      createdAt: new Date().toISOString()
    };

    store.incidents.push(incident);

    res.status(201).json({
      success: true,
      message: 'Incident reported successfully',
      incident
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// PUT /api/incidents/:id/status — update status
router.put('/:id/status', authMiddleware, (req, res) => {
  const incident = store.incidents.find(i => i.id === req.params.id && i.userId === req.user.id);
  if (!incident) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }
  incident.status = req.body.status || incident.status;
  incident.updatedAt = new Date().toISOString();
  res.json({ success: true, message: 'Status updated', incident });
});

// DELETE /api/incidents/:id — delete incident
router.delete('/:id', authMiddleware, (req, res) => {
  const idx = store.incidents.findIndex(i => i.id === req.params.id && i.userId === req.user.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Incident not found' });
  }
  store.incidents.splice(idx, 1);
  res.json({ success: true, message: 'Incident deleted' });
});

module.exports = router;
