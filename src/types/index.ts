export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'caregiver';
  profilePicture?: string;
}

export interface Patient extends User {
  role: 'patient';
  doctorId?: string;
  dateOfBirth: string;
  diagnosis: string;
  dischargeDate: string;
  medications: Medication[];
  healthLogs: HealthLog[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialty: string;
  patients: string[]; // Patient IDs
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timeOfDay: string[];
  startDate: string;
  endDate?: string;
  instructions?: string;
  adherence?: number; // Percentage of adherence
}

export interface HealthLog {
  id: string;
  date: string;
  painLevel: number; // 0-10
  mood: 'excellent' | 'good' | 'fair' | 'poor';
  symptoms: Symptom[];
  notes?: string;
  vitals?: Vitals;
}

export interface Symptom {
  id: string;
  name: string;
  severity: number; // 0-10
  duration: string;
}

export interface Vitals {
  temperature?: number;
  bloodPressure?: {
    systolic: number;
    diastolic: number;
  };
  heartRate?: number;
  respiratoryRate?: number;
  oxygenSaturation?: number;
  weight?: number;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  type: 'check-up' | 'follow-up' | 'specialist' | 'test';
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface RecoveryAnalytics {
  overallStatus: 'improving' | 'stable' | 'concerning' | 'critical';
  score: number; // 0-100
  trends: {
    painLevel: number[];
    adherence: number;
    symptomsFrequency: number;
  };
  recommendations?: string[];
}