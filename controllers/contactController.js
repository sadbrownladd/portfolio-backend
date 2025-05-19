const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().allow('').optional(),
});

const validateContact = (data) => {
  const { error } = contactSchema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contacts' });
  }
};

exports.createContact = async (req, res) => {
  try {
    const validationErrors = validateContact(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const contact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    const savedContact = await contact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create contact' });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch contact' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const validationErrors = validateContact(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email, message: req.body.message },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update contact' });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete contact' });
  }
};