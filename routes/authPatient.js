import express from 'express';
import Doctor from '../models/Doctor.js';

const router = express.Router();

// Patient Login
router.post('/login', async (req, res) => {
  const { doctorCode, username, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ uniqueCode: doctorCode });
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    const patient = doctor.patients.find(p => p.username === username && p.password === password);
    if (!patient) return res.status(401).json({ msg: 'Invalid credentials' });

    res.json({ msg: 'Patient login successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed' });
  }
});

export default router;
