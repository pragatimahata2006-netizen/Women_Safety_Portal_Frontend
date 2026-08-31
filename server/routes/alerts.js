const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// GET /api/alerts — list all alerts (public)
router.get('/', (req, res) => {
  const alerts = [...store.alerts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json({ success: true, alerts, total: alerts.length });
});

// POST /api/alerts — create new alert (protected)
router.post('/', authMiddleware, (req, res) => {
  try {
    const { title, description, category, area, severity } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    const alert = {
      id: uuidv4(),
      title,
      description,
      category: category || 'General',
      area: area || 'Kolkata',
      severity: severity || 'medium',
      timestamp: 'Just now',
      createdAt: new Date().toISOString()
    };

    store.alerts.unshift(alert);

    res.status(201).json({
      success: true,
      message: 'Alert created successfully',
      alert
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// DELETE /api/alerts/:id
router.delete('/:id', authMiddleware, (req, res) => {
  const idx = store.alerts.findIndex(a => a.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Alert not found' });
  }
  store.alerts.splice(idx, 1);
  res.json({ success: true, message: 'Alert deleted' });
});

module.exports = router;
