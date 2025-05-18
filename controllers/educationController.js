const Education = require('../models/Education');

// Get all education records
exports.getAllEducation = async (req, res) => {
  try {
    const education = await Education.find();
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single education record
exports.getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new education record
exports.createEducation = async (req, res) => {
  const education = new Education({
    degree: req.body.degree,
    institution: req.body.institution,
    year: req.body.year,
  });

  try {
    const newEducation = await education.save();
    res.status(201).json(newEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update an education record
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });

    education.degree = req.body.degree || education.degree;
    education.institution = req.body.institution || education.institution;
    education.year = req.body.year || education.year;

    const updatedEducation = await education.save();
    res.status(200).json(updatedEducation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an education record
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return res.status(404).json({ message: 'Education not found' });

    await education.remove();
    res.status(200).json({ message: 'Education deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};