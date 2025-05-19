const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Joi = require('joi');

const projectSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'Title is required',
    'any.required': 'Title is required',
  }),
  description: Joi.string().allow('').optional().messages({
    'string.base': 'Description must be a string',
  }),
  link: Joi.string().uri().allow('').optional().messages({
    'string.uri': 'Link must be a valid URL',
  }),
});

const validateProject = (data) => {
  const { error } = projectSchema.validate(data, { abortEarly: false });
  if (error) {
    console.error('Validation Error:', error.details);
    return error.details.map((detail) => detail.message);
  }
  return null;
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    console.error('Get Projects Error:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const validationErrors = validateProject(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const project = new Project({
      title: req.body.title,
      description: req.body.description || '',
      link: req.body.link || '',
    });
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Create Project Error:', err);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Get Project Error:', err);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const validationErrors = validateProject(req.body);
    if (validationErrors) {
      return res.status(400).json({ errors: validationErrors });
    }

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description, link: req.body.link },
      { new: true, runValidators: true }
    );
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error('Update Project Error:', err);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Delete Project Error:', err);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};