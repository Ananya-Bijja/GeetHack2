import React from 'react';
import Card from '../ui/Card';
import { Check, Clock, AlertCircle } from 'lucide-react';
import { Medication } from '../../types';

interface TodaysMedicationsProps {
  medications: {
    medication: Medication;
    status: 'taken' | 'scheduled' | 'missed';
    time: string;
  }[];
}

const TodaysMedications: React.FC<TodaysMedicationsProps> = ({ medications }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <Check className="h-5 w-5 text-success-500" />;
      case 'scheduled':
        return <Clock className="h-5 w-5 text-primary-500" />;
      case 'missed':
        return <AlertCircle className="h-5 w-5 text-error-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'taken':
        return 'Taken';
      case 'scheduled':
        return 'Scheduled';
      case 'missed':
        return 'Missed';
      default:
        return '';
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'taken':
        return 'text-success-800 bg-success-50';
      case 'scheduled':
        return 'text-primary-800 bg-primary-50';
      case 'missed':
        return 'text-error-800 bg-error-50';
      default:
        return '';
    }
  };

  return (
    <Card title="Today's Medications">
      <div className="divide-y divide-gray-100">
        {medications.map((item, index) => (
          <div key={index} className="py-3 flex items-center justify-between">
            <div className="flex items-center">
              <div className={`p-2 rounded-md ${getStatusStyles(item.status)}`}>
                {getStatusIcon(item.status)}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-900">{item.medication.name}</p>
                <p className="text-xs text-gray-500">{item.medication.dosage} - {item.time}</p>
              </div>
            </div>
            <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(item.status)}`}>
              {getStatusText(item.status)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4">
        <button className="btn btn-outline-primary w-full">View All Medications</button>
      </div>
    </Card>
  );
};

export default TodaysMedications;