
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// ==== Mongoose Models ====

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  licenseNumber: String,
  uniqueCode: { type: String, default: uuidv4 },
});
const Doctor = mongoose.model('Doctor', doctorSchema);
const SymptomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  severity: { type: String, required: true }, // example field
  note: { type: String, required: false }      // optional additional note
});

const patientSchema = new mongoose.Schema({
  doctorCode: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  diseaseName: {
    type: String,
    required: true
  },
  expectedRecoveryTime: {
    type: String,
    required: true
  },
  dischargeDate: {
    type: String,
    required: false, // Optional
    default: ''
  },
  followUpDate: {
    type: String,
    required: true
  },
  medications: [
    {
      name: {
        type: String,
        required: true
      },
      time: {
        type: String,
        required: true
      }
    }
  ],
  // MongoDB patient schema (example)
symptoms: [
  {
    date: String, // ISO format
    entries: [SymptomSchema]
  }
],
recoveryScores: [
  {
    date: String,
    score: Number
  }
],
  healthMetricsData: {
    // Define the structure of health metrics data (example for pain level trend)
    type: Array,
    required: false
  },
  symptoms: [
    {
      date: String, // ISO format date
      entries: [SymptomSchema]
    }
  ],
  recoveryTrendData: {
    // Define the structure of recovery trend data (could be an array, object, or whatever format your charting expects)
    type: Array,
    required: false
  },
  vitalsSummary: {
    status: {
      type: String,
      default: 'normal'
    },
    lastUpdated: {
      type: String,
      required: false, // ← make optional
      default: ''
    }
  },
  nextAppointment: {
    type: {
      type: String,
      required: false, // ← make optional
      default: ''
    },
    doctor: {
      type: String,
      required: false,
      default: ''
    },
    date: {
      type: String,
      required: false,
      default: ''
    }
  },
 
  
  medicationAdherence: {
    type: Number,  // A value between 0 and 100
    required: false
  }
});
const Patient = mongoose.model('Patient', patientSchema);

// ==== Express Setup ====

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
// In your Express server
app.get('/patient/:username', async (req, res) => {
  const { username } = req.params;
  
  try {
    const patient = await Patient.findOne({ username: username }); // Assuming you're using MongoDB
    if (!patient) {
      return res.status(404).json({ msg: 'Patient not found' });
    }

    res.json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// POST /patient/:username/symptoms
app.post('/patient/:username/symptoms', async (req, res) => {
  const { symptom } = req.body;
  const today = new Date().toISOString().split('T')[0];

  const patient = await Patient.findOne({ username: req.params.username });
  if (!patient) return res.status(404).send('Patient not found');

  let todaySymptoms = patient.symptoms.find(s => s.date === today);
  if (!todaySymptoms) {
    todaySymptoms = { date: today, entries: [] };
    patient.symptoms.push(todaySymptoms);
  }

  todaySymptoms.entries.push(symptom);

  // Calculate a recovery score (placeholder logic: lower symptom count = better score)
  const score = 100 - todaySymptoms.entries.length * 10;
  const existingScore = patient.recoveryScores.find(s => s.date === today);
  if (existingScore) {
    existingScore.score = score;
  } else {
    patient.recoveryScores.push({ date: today, score });
  }

  await patient.save();
  res.send(patient);
});


app.post('/api/doctor/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email, password });
    if (!doctor) return res.status(401).json({ msg: 'Invalid credentials' });

    // Save doctorCode in localStorage on frontend using res.json
    res.json({ msg: 'Login successful', code: doctor.uniqueCode });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging in' });
  }
});

// ==== Add Patient ====


app.post('/api/doctor/add-patient', async (req, res) => {
  const {
    username,
    password,
    diseaseName,
    expectedRecoveryTime,
    followUpDate,
    medications,
    healthMetricsData,
    symptoms,
    recoveryTrendData,
    vitalsSummary,
    nextAppointment,
    medicationAdherence
  } = req.body;

  const doctorCode = req.body.doctorCode || req.headers['doctor-code'];

  if (!doctorCode) {
    return res.status(403).json({ msg: 'Doctor not authenticated' });
  }

  try {
    const doctor = await Doctor.findOne({ uniqueCode: doctorCode });
    if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

    const existingPatient = await Patient.findOne({ doctorCode, username });
    if (existingPatient) {
      return res.status(400).json({ msg: 'Patient already exists' });
    }

    const newPatient = new Patient({
      doctorCode,
      username: username || '',
      password: password || '',
      diseaseName: diseaseName || '',
      expectedRecoveryTime: expectedRecoveryTime || '',
      followUpDate: followUpDate || '',
      medications: medications || [],
      healthMetricsData: healthMetricsData || [],
      symptoms: symptoms || [],
      recoveryTrendData: recoveryTrendData || [],
      vitalsSummary: vitalsSummary || {
        status: 'normal',
        lastUpdated: ''
      },
      nextAppointment: nextAppointment || {
        date: '',
        doctor: '',
        type: ''
      },
      medicationAdherence: medicationAdherence || 0,
      dischargeDate: new Date().toISOString() // ← set current date automatically
    });

    await newPatient.save();
    res.status(201).json({ msg: 'Patient added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error adding patient' });
  }
});

// ==== Patient Login ====

app.post('/api/patient/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const patient = await Patient.findOne({ username, password });
    if (!patient) return res.status(401).json({ msg: 'Invalid credentials' });

    res.json({ msg: 'Patient login successful', patient });
  } catch (err) {
    res.status(500).json({ msg: 'Login failed' });
  }
});
// ==== Get Patients for a Doctor ====
// app.get('/api/doctor/patients', async (req, res) => {
//   const doctorCode = req.headers['doctor-code'];

//   if (!doctorCode) {
//     return res.status(403).json({ msg: 'Doctor code missing' });
//   }

//   try {
//     const patients = await Patient.find({ doctorCode });
//     res.json(patients);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Failed to fetch patients' });
//   }
// });
app.get('/api/doctor/patients', async (req, res) => {
  const doctorCode = req.headers['doctor-code'];

  if (!doctorCode) {
    console.log('❌ Missing doctor-code in headers');
    return res.status(403).json({ msg: 'Doctor code missing' });
  }

  try {
    const patients = await Patient.find({ doctorCode });
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to fetch patients' });
  }
});

// ==== Start Server ====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
