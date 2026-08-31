const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const store = require('../data/store');
const { authMiddleware } = require('../middleware/auth');

// GET /api/contacts — list user's contacts
router.get('/', authMiddleware, (req, res) => {
  const userContacts = store.contacts.filter(c => c.userId === req.user.id);
  res.json({ success: true, contacts: userContacts, total: userContacts.length });
});

// POST /api/contacts — add a new contact
router.post('/', authMiddleware, (req, res) => {
  try {
    const { name, relationship, phone, email, isPrimary } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ success: false, message: 'Name and phone are required' });
    }

    const contact = {
      id: uuidv4(),
      userId: req.user.id,
      name,
      relationship: relationship || 'Friend',
      phone,
      email: email || '',
      isPrimary: isPrimary || false,
      createdAt: new Date().toISOString()
    };

    store.contacts.push(contact);

    res.status(201).json({
      success: true,
      message: 'Contact added successfully',
      contact
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// PUT /api/contacts/:id — update contact
router.put('/:id', authMiddleware, (req, res) => {
  const contact = store.contacts.find(c => c.id === req.params.id && c.userId === req.user.id);
  if (!contact) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }

  const { name, relationship, phone, email, isPrimary } = req.body;
  if (name) contact.name = name;
  if (relationship) contact.relationship = relationship;
  if (phone) contact.phone = phone;
  if (email !== undefined) contact.email = email;
  if (isPrimary !== undefined) contact.isPrimary = isPrimary;

  res.json({ success: true, message: 'Contact updated', contact });
});

// DELETE /api/contacts/:id — remove contact
router.delete('/:id', authMiddleware, (req, res) => {
  const idx = store.contacts.findIndex(c => c.id === req.params.id && c.userId === req.user.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'Contact not found' });
  }
  store.contacts.splice(idx, 1);
  res.json({ success: true, message: 'Contact removed' });
});

module.exports = router;
