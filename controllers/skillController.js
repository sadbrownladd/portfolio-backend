const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const Joi = require('joi');

const skillSchema = Joi.object({
  name: Joi.string().required(),
  progress: Joi.number().min(0).max(100).required(),
});

const validateSkill = (data) => {
  const { error } = skillSchema.validate(data, { abortEarly: false });
  if (error) {
    return error.details.map((detail) => detail.message);
  }
  return null;
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills' });
  }
};

exports.createSkill = async (req, res) => {
  try {
    const validationErrors = validateSkill(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const skill = new Skill({
      name: req.body.name,
      progress: req.body.progress,
    });
    const savedSkill = await skill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create skill' });
  }
};

exports.getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skill' });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const validationErrors = validateSkill(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, progress: req.body.progress },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update skill' });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete skill' });
  }
};