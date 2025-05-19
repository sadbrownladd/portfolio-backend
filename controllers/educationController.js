const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const Joi = require('joi');

const educationSchema = Joi.object({
  degree: Joi.string().required(),
  institution: Joi.string().required(),
  year: Joi.string().required(),
});

const validateEducation = (data) => {
  const { error } = educationSchema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
};

exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch education' });
  }
};

exports.createEducation = async (req, res) => {
  try {
    const validationErrors = validateEducation(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const education = new Education({
      degree: req.body.degree,
      institution: req.body.institution,
      year: req.body.year,
    });
    const savedEducation = await education.save();
    res.status(201).json(savedEducation);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create education' });
  }
};

exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch education' });
  }
};

exports.updateEducation = async (req, res) => {
  try {
    const validationErrors = validateEducation(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const education = await Education.findByIdAndUpdate(
      req.params.id,
      { degree: req.body.degree, institution: req.body.institution, year: req.body.year },
      { new: true }
    );
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json(education);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update education' });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete education' });
  }
};