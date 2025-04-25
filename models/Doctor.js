import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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
export default Doctor;
