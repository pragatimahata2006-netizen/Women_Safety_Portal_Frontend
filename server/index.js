const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const incidentRoutes = require('./routes/incidents');
const alertRoutes = require('./routes/alerts');
const contactRoutes = require('./routes/contacts');
const sosRoutes = require('./routes/sos');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Request Logger ────────────────────────────────────────
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ── Health Check ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'SafeHer Backend is running',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    endpoints: ['/api/auth', '/api/incidents', '/api/alerts', '/api/contacts', '/api/sos']
  });
});

// ── Routes ────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/sos', sosRoutes);

// ── 404 Handler ───────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.path} not found` });
});

// ── Error Handler ─────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[ERROR]', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start Server ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n');
  console.log('╔══════════════════════════════════════════════╗');
  console.log('║   🛡️  SafeHer Backend Server — v2.0.0        ║');
  console.log(`║   🚀  Running at http://localhost:${PORT}       ║`);
  console.log('║   📡  API Base: http://localhost:' + PORT + '/api    ║');
  console.log('╚══════════════════════════════════════════════╝');
  console.log('\n[INFO] Demo user: bristi.mahata@safeher.org / safeher123');
  console.log('[INFO] Health check: GET /api/health\n');
});

module.exports = app;
