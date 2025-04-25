import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// ==== Mongoose Models ====

// Doctor Model
const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  licenseNumber: String,
  uniqueCode: { type: String, default: uuidv4 },
  patients: [
    {
      username: String,
      password: String,
    }
  ],
});
const Doctor = mongoose.model('Doctor', doctorSchema);

// Patient Model
const patientSchema = new mongoose.Schema({
  doctorCode: String,
  username: String,
  password: String,
});
const Patient = mongoose.model('Patient', patientSchema);

// ==== Express App Setup ====

const app = express();
app.use(cors());
app.use(express.json());

// ==== MongoDB Connection ====

mongoose.connect('mongodb://localhost:27017/recoveryTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ==== Doctor Routes ====

app.post('/api/doctor/signup', async (req, res) => {
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

app.post('/api/doctor/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email, password });
    if (!doctor) return res.status(401).json({ msg: 'Invalid credentials' });

    res.json({ msg: 'Login successful', code: doctor.uniqueCode });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in' });
  }
});

app.post('/api/doctor/add-patient', async (req, res) => {
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

// ==== Patient Routes ====

app.post('/api/patient/login', async (req, res) => {
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


app.post('/api/doctor/add-patient', async (req, res) => {
    const { doctorCode, patientName, patientDetails } = req.body;
  
    // Check if doctor exists with the given code
    const doctor = await Doctor.findOne({ uniqueCode: doctorCode });
    
    if (!doctor) {
      return res.status(404).json({ msg: 'Doctor not found' });
    }
  
    // Add the patient to the doctor's patient list
    const newPatient = new Patient({ name: patientName, details: patientDetails });
    
    // Save patient to database
    await newPatient.save();
  
    doctor.patients.push(newPatient._id); // Add patient ID to doctor's patient list
    await doctor.save();
  
    res.status(200).json({ msg: 'Patient added successfully' });
  });
  
  
// ==== Server Start ====

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
