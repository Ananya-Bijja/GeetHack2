import React from 'react';
import Card from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import { Calendar, Pill, Stethoscope, HeartPulse } from 'lucide-react';

interface PatientOverviewProps {
  name: string;
  diagnosis: string;
  status: 'improving' | 'stable' | 'concerning' | 'critical';
  dischargeDate: string;
  nextAppointment: {
    date: string;
    doctor: string;
    type: string;
  };
  medicationAdherence: number;
  vitalsSummary: {
    status: 'normal' | 'abnormal';
    lastUpdated: string;
  };
}

const PatientOverview: React.FC<PatientOverviewProps> = ({
  name,
  diagnosis,
  status,
  dischargeDate,
  nextAppointment,
  medicationAdherence,
  vitalsSummary
}) => {
  // Calculate days since discharge
  const calculateDaysSinceDischarge = () => {
    const discharge = new Date(dischargeDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - discharge.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysSinceDischarge = calculateDaysSinceDischarge();

  return (
    <Card className="mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{name}</h2>
          <p className="text-gray-600">{diagnosis}</p>
        </div>
        <div className="mt-2 md:mt-0">
          <StatusBadge status={status} className="text-sm px-3 py-1" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-primary-100 rounded-md">
            <Calendar className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Recovery Period</p>
            <p className="text-lg font-semibold text-gray-900">{daysSinceDischarge} days</p>
            <p className="text-xs text-gray-500">since discharge</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-secondary-100 rounded-md">
            <Stethoscope className="h-6 w-6 text-secondary-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Next Appointment</p>
            <p className="text-lg font-semibold text-gray-900">{nextAppointment.date}</p>
            <p className="text-xs text-gray-500">{nextAppointment.type} with {nextAppointment.doctor}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-accent-100 rounded-md">
            <Pill className="h-6 w-6 text-accent-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Medication Adherence</p>
            <p className="text-lg font-semibold text-gray-900">{medicationAdherence}%</p>
            <p className="text-xs text-gray-500">last 7 days</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 p-2 bg-success-100 rounded-md">
            <HeartPulse className="h-6 w-6 text-success-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Vitals</p>
            <p className="text-lg font-semibold text-gray-900">
              {vitalsSummary.status === 'normal' ? 'Normal' : 'Abnormal'}
            </p>
            <p className="text-xs text-gray-500">last updated {vitalsSummary.lastUpdated}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PatientOverview;