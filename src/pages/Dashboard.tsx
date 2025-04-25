import React from 'react';
import PatientOverview from '../components/dashboard/PatientOverview';
import HealthMetricsChart from '../components/dashboard/HealthMetricsChart';
import TodaysMedications from '../components/dashboard/TodaysMedications';
import RecentSymptoms from '../components/dashboard/RecentSymptoms';
import RecoveryTrendChart from '../components/analytics/RecoveryTrendChart';
import { Medication, Symptom } from '../types';

// Mock data - in a real app this would come from an API
const patientData = {
  name: 'John Doe',
  diagnosis: 'Post-Cardiac Surgery Recovery',
  status: 'improving' as const,
  dischargeDate: '2025-05-01',
  nextAppointment: {
    date: 'May 21, 2025',
    doctor: 'Dr. Sarah Smith',
    type: 'Follow-up',
  },
  medicationAdherence: 92,
  vitalsSummary: {
    status: 'normal' as const,
    lastUpdated: '2 hours ago',
  },
};

const mockMedications: Array<{
  medication: Medication;
  status: 'taken' | 'scheduled' | 'missed';
  time: string;
}> = [
  {
    medication: {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      timeOfDay: ['Morning'],
      startDate: '2025-05-01',
    },
    status: 'taken',
    time: '8:00 AM',
  },
  {
    medication: {
      id: '2',
      name: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      timeOfDay: ['Morning', 'Evening'],
      startDate: '2025-05-01',
    },
    status: 'scheduled',
    time: '8:00 PM',
  },
  {
    medication: {
      id: '3',
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      timeOfDay: ['Morning'],
      startDate: '2025-05-01',
    },
    status: 'taken',
    time: '8:00 AM',
  },
  {
    medication: {
      id: '4',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      timeOfDay: ['Evening'],
      startDate: '2025-05-01',
    },
    status: 'scheduled',
    time: '8:00 PM',
  },
];

const mockSymptoms: Symptom[] = [
  {
    id: '1',
    name: 'Chest Pain',
    severity: 2,
    duration: '10 minutes',
  },
  {
    id: '2',
    name: 'Shortness of Breath',
    severity: 4,
    duration: '5 minutes after activity',
  },
  {
    id: '3',
    name: 'Fatigue',
    severity: 6,
    duration: 'All day',
  },
];

const mockHealthMetricsData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Pain Level',
      data: [7, 6, 5, 6, 4, 3, 2],
      color: '#3B82F6',
    },
  ],
};

const mockRecoveryTrendData = {
  dates: [
    '2025-05-02',
    '2025-05-03',
    '2025-05-04',
    '2025-05-05',
    '2025-05-06',
    '2025-05-07',
    '2025-05-08',
  ],
  painLevels: [8, 7, 6, 5, 5, 4, 3],
  medicationAdherence: [100, 75, 100, 75, 100, 100, 100],
  symptomsCount: [5, 4, 4, 3, 2, 2, 1],
  overallStatus: 'improving' as const,
  score: 78,
};

const Dashboard: React.FC = () => {
  const handleAddSymptom = () => {
    alert('Add symptom functionality would open a form here');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PatientOverview {...patientData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        <div className="lg:col-span-2">
          <HealthMetricsChart 
            title="Pain Level Trend (Last 7 Days)"
            data={mockHealthMetricsData}
          />
        </div>
        <div>
          <TodaysMedications medications={mockMedications} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        <div>
          <RecentSymptoms 
            symptoms={mockSymptoms} 
            onAddSymptom={handleAddSymptom} 
          />
        </div>
        <div className="lg:col-span-2">
          <RecoveryTrendChart data={mockRecoveryTrendData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;