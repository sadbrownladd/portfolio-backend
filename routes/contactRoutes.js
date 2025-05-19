const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Joi = require('joi');

// Validation schema for contact submission
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});

// Create a new contact submission
router.post('/', async (req, res) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;