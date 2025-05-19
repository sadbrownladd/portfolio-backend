const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const Joi = require('joi');

const experienceSchema = Joi.object({
  title: Joi.string().allow('').optional(),
  company: Joi.string().required(),
  duration: Joi.string().required(),
  description: Joi.string().allow('').optional(),
});

const validateExperience = (data) => {
  const { error } = experienceSchema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
};

exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch experiences' });
  }
};

exports.createExperience = async (req, res) => {
  try {
    const validationErrors = validateExperience(req.body);
    if (validationErrors) {
      return res.status(400).json({ message: validationErrors });
    }

    const experience = new Experience({
      title: req.body.title || '',
      company: req.body.company,
      duration: req.body.duration,
      description: req.body.description,
    });
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create experience' });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch experience' });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    const validationErrors = validateExperience(req.body);
    if (validationErrors) {
      return res.status(400).json({ message: validationErrors });
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, company: req.body.company, duration: req.body.duration, description: req.body.description },
      { new: true }
    );
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json(experience);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update experience' });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete experience' });
  }
};