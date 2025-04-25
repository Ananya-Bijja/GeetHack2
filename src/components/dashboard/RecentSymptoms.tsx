import React from 'react';
import Card from '../ui/Card';
import { Symptom } from '../../types';

interface RecentSymptomsProps {
  symptoms: Symptom[];
  onAddSymptom: () => void;
}

const RecentSymptoms: React.FC<RecentSymptomsProps> = ({ 
  symptoms, 
  onAddSymptom 
}) => {
  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-success-500';
    if (severity <= 6) return 'bg-warning-500';
    return 'bg-error-500';
  };

  return (
    <Card title="Recent Symptoms">
      {symptoms.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No symptoms recorded</p>
          <button 
            className="mt-4 btn btn-primary" 
            onClick={onAddSymptom}
          >
            Record New Symptom
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {symptoms.map((symptom) => (
              <div key={symptom.id} className="flex items-center">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{symptom.name}</span>
                    <span className="text-sm text-gray-500">{symptom.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${getSeverityColor(symptom.severity)}`} 
                        style={{ width: `${symptom.severity * 10}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-xs font-medium text-gray-900 min-w-[20px]">
                      {symptom.severity}/10
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-between">
            <button className="btn btn-outline-primary" onClick={onAddSymptom}>
              Add Symptom
            </button>
            <button className="btn btn-outline">View History</button>
          </div>
        </>
      )}
    </Card>
  );
};

export default RecentSymptoms;