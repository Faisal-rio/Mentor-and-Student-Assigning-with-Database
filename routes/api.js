const express = require('express');
const Mentor = require('../models/Mentor');
const Student = require('../models/Student');
const router = express.Router();

// Create a new mentor
router.post('/mentors', async (req, res) => {
  const mentor = new Mentor(req.body);
  try {
    await mentor.save();
    res.status(201).send(mentor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a new student
router.post('/students', async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Assign multiple students to a mentor
router.post('/mentors/:mentorId/students', async (req, res) => {
  const { mentorId } = req.params;
  const { studentIds } = req.body;

  try {
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).send('Mentor not found');

    await Student.updateMany({ _id: { $in: studentIds } }, { mentor: mentorId });
    mentor.students.push(...studentIds);
    await mentor.save();

    res.send(mentor);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get list of students without a mentor
router.get('/students/no-mentor', async (req, res) => {
  try {
    const students = await Student.find({ mentor: null });
    res.send(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Assign or change mentor for a particular student
router.put('/students/:studentId/mentor', async (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;

  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(404).send('Student not found');

    student.mentor = mentorId;
    await student.save();
    
    res.send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all students assigned to a mentor
router.get('/mentors/:mentorId/students', async (req, res) => {
  const { mentorId } = req.params;

  try {
    const mentor = await Mentor.findById(mentorId).populate('students');
    if (!mentor) return res.status(404).send('Mentor not found');

    res.send(mentor.students);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get the current mentor of a student
router.get('/students/:studentId/mentor', async (req, res) => {
  const { studentId } = req.params;

  try {
    const student = await Student.findById(studentId).populate('mentor');
    if (!student) return res.status(404).send('Student not found');

    res.send(student.mentor);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
