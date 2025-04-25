import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
  doctorCode: String,
  username: String,
  password: String,
});

const Patient = mongoose.model('Patient', patientSchema);
export default Patient;
