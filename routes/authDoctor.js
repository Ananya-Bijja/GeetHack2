import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Doctor Signup
router.post('/signup', async (req, res) => {
  const { name, email, password, specialization, licenseNumber } = req.body;

  try {
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email already in use' });

    const doctor = new Doctor({ name, email, password, specialization, licenseNumber });
    await doctor.save();

    res.status(201).json({ msg: 'Doctor registered', code: doctor.uniqueCode });
  } catch (err) {
    res.status(500).json({ msg: 'Error registering doctor' });
  }
});

// Doctor Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email, password });
    if (!doctor) return res.status(401).json({ msg: 'Invalid credentials' });

    res.json({ msg: 'Login successful', code: doctor.uniqueCode });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in' });
  }
});

// Add Patient
router.post('/add-patient', async (req, res) => {
  const { doctorCode, username, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ uniqueCode: doctorCode });
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    const exists = doctor.patients.find(p => p.username === username);
    if (exists) return res.status(400).json({ msg: 'Patient already exists' });

    doctor.patients.push({ username, password });
    await doctor.save();

    res.status(201).json({ msg: 'Patient added successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error adding patient' });
  }
});

export default router;
