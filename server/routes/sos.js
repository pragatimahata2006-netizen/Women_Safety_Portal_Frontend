const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// POST /api/sos/trigger — log an SOS event
router.post('/trigger', authMiddleware, (req, res) => {
  try {
    const { lat, lng, message, contacts } = req.body;

    const sosLog = {
      id: uuidv4(),
      userId: req.user.id,
      userName: req.user.name,
      lat: lat || null,
      lng: lng || null,
      message: message || 'SOS Emergency Triggered',
      contactsNotified: contacts || [],
      status: 'Active',
      triggeredAt: new Date().toISOString(),
      resolvedAt: null
    };

    store.sosLogs.unshift(sosLog);

    res.status(201).json({
      success: true,
      message: 'SOS broadcast logged successfully',
      sosLog,
      broadcastId: sosLog.id
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// POST /api/sos/resolve/:id — mark SOS as resolved
router.post('/resolve/:id', authMiddleware, (req, res) => {
  const log = store.sosLogs.find(s => s.id === req.params.id && s.userId === req.user.id);
  if (!log) {
    return res.status(404).json({ success: false, message: 'SOS log not found' });
  }
  log.status = 'Resolved';
  log.resolvedAt = new Date().toISOString();
  res.json({ success: true, message: 'SOS marked as resolved', sosLog: log });
});

// GET /api/sos/logs — get user's SOS history
router.get('/logs', authMiddleware, (req, res) => {
  const userLogs = store.sosLogs.filter(s => s.userId === req.user.id);
  res.json({ success: true, logs: userLogs, total: userLogs.length });
});

module.exports = router;
