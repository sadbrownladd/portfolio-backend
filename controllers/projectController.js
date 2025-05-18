const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single project
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  const project = new Project({
    title: req.body.title,
    description: req.body.description,
    image: req.body.image,
    link: req.body.link,
  });

  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    project.image = req.body.image || project.image;
    project.link = req.body.link || project.link;

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.remove();
    res.status(200).json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};