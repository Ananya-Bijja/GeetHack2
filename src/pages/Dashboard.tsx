import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PatientOverview from '../components/dashboard/PatientOverview';
import TodaysMedications from '../components/dashboard/TodaysMedications';
import RecentSymptoms from '../components/dashboard/RecentSymptoms';
import { Medication, Symptom } from '../types';
import RecoveryGraph from '../components/analytics/RecoveryGraph';
// Define types for patient data
interface PatientData {
  name: string;
  diagnosis: string;
  status: 'improving' | 'stable' | 'critical';
  dischargeDate: string;
  nextAppointment: {
    date: string;
    doctor: string;
    type: string;
  };
  medicationAdherence: number;
  vitalsSummary: {
    status: 'normal' | 'critical';
    lastUpdated: string;
  };
  medications: Medication[];
  symptoms: Symptom[];
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const username = location.state?.username; // Accessing the username from location state

  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch patient data based on username
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/patient/${username}`);
        const data: PatientData = await response.json();  // Type the response data

        if (response.ok) {
          setPatientData(data); // Assuming the data contains the necessary patient details
          setLoading(false);
        } else {
          setErrorMessage('Failed to fetch patient data');
          setLoading(false);
        }
      } catch (error) {
        setErrorMessage('Error fetching data');
        setLoading(false);
      }
    };

    if (username) {
      fetchPatientData();
    }
  }, [username]);

  const handleAddSymptom = async (newSymptom: Symptom) => {
    try {
      const response = await fetch(`http://localhost:5000/patient/${username}/symptoms`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptom: newSymptom }),
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setPatientData(updatedData);
      } else {
        console.error('Failed to update symptom');
      }
    } catch (err) {
      console.error('Error adding symptom:', err);
    }
  };
  
  
  

  if (loading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  // Fallback for undefined or missing data
  const safePatientData = patientData || {
    name: 'Unknown',
    diagnosis: 'Not specified',
    status: 'stable',
    dischargeDate: 'N/A',
    nextAppointment: {
      date: 'N/A',
      doctor: 'N/A',
      type: 'N/A',
    },
    medicationAdherence: 0,
    vitalsSummary: {
      status: 'normal',
      lastUpdated: 'N/A',
    },
    medications: [],
    symptoms: [],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-4">Hi, {username}!</h2> {/* Greeting with username */}
      <PatientOverview 
        name={safePatientData.name} 
        diagnosis={safePatientData.diagnosis} 
        status={safePatientData.status} 
        dischargeDate={safePatientData.dischargeDate} 
        nextAppointment={safePatientData.nextAppointment} 
        medicationAdherence={safePatientData.medicationAdherence} 
        vitalsSummary={safePatientData.vitalsSummary} 
        username={username} 
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        <div className="lg:col-span-2">
          {/* Add other components or content here */}
        </div>
        <div>
          <TodaysMedications medications={safePatientData.medications} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
        <div>
          <RecentSymptoms 
            symptoms={safePatientData.symptoms} 
            onAddSymptom={handleAddSymptom} 
          />
        </div>
        <div className="my-6">
  <RecoveryGraph recoveryScores={safePatientData.recoveryScores || []} />
</div>
        <div className="lg:col-span-2">
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
