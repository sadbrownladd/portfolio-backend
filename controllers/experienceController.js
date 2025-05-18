const Experience = require('../models/Experience');
const Joi = require('joi');

// Validation schema
const experienceSchema = Joi.object({
  title: Joi.string().required(),
  company: Joi.string().required(),
  duration: Joi.string().required(),
  description: Joi.string().required(),
});

// Get all experiences
exports.getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single experience
exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new experience
exports.createExperience = async (req, res) => {
  const { error } = experienceSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const experience = new Experience({
    title: req.body.title,
    company: req.body.company,
    duration: req.body.duration,
    description: req.body.description,
  });

  try {
    const newExperience = await experience.save();
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an experience
exports.updateExperience = async (req, res) => {
  const { error } = experienceSchema.validate(req.body, { allowUnknown: true });
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    experience.title = req.body.title || experience.title;
    experience.company = req.body.company || experience.company;
    experience.duration = req.body.duration || experience.duration;
    experience.description = req.body.description || experience.description;

    const updatedExperience = await experience.save();
    res.status(200).json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an experience
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });

    await experience.remove();
    res.status(200).json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};