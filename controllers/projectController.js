const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Joi = require('joi');
const { validateSchema } = require('../utils/validation'); // Import shared utility

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
  image: Joi.string().allow('').optional().messages({
    'string.base': 'Image must be a string',
  }),
});

exports.getAllProjects = async (req, res) => {
  try {
    console.log('Fetching all projects from MongoDB');
    const projects = await Project.find();
    console.log('Projects fetched:', projects);
    res.json(projects);
  } catch (err) {
    console.error('Get Projects Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const validationErrors = validateSchema(projectSchema, req.body); // Use shared utility
    if (validationErrors) {
      console.log('Validation failed, sending 400 response');
      return res.status(400).json({ errors: validationErrors });
    }

    console.log('Creating new project with data:', req.body);
    const project = new Project({
      title: req.body.title,
      description: req.body.description || '',
      link: req.body.link || '',
      image: req.body.image || '',
    });
    const savedProject = await project.save();
    console.log('Project saved successfully:', savedProject);
    res.status(201).json(savedProject);
  } catch (err) {
    console.error('Create Project Error:', err.message);
    res.status(500).json({ message: 'Failed to create project', error: err.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    console.log('Fetching project by ID:', req.params.id);
    const project = await Project.findById(req.params.id);
    if (!project) {
      console.log('Project not found');
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (err) {
    console.error('Get Project Error:', err.message);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const validationErrors = validateSchema(projectSchema, req.body); // Use shared utility
    if (validationErrors) {
      console.log('Validation failed for update, sending 400 response');
      return res.status(400).json({ errors: validationErrors });
    }

    console.log('Updating project with ID:', req.params.id);
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, description: req.body.description, link: req.body.link, image: req.body.image },
      { new: true, runValidators: true }
    );
    if (!project) {
      console.log('Project not found for update');
      return res.status(404).json({ message: 'Project not found' });
    }
    console.log('Project updated:', project);
    res.json(project);
  } catch (err) {
    console.error('Update Project Error:', err.message);
    res.status(500).json({ message: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    console.log('Deleting project with ID:', req.params.id);
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      console.log('Project not found for deletion');
      return res.status(404).json({ message: 'Project not found' });
    }
    console.log('Project deleted');
    res.json({ message: 'Project deleted' });
  } catch (err) {
    console.error('Delete Project Error:', err.message);
    res.status(500).json({ message: 'Failed to delete project' });
  }
};