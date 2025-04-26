
import React, { useState } from 'react';
import Card from '../ui/Card';
import { Symptom } from '../../types';

interface RecentSymptomsProps {
  symptoms: Symptom[];
  onAddSymptom: (newSymptom: Symptom) => void;
}

const RecentSymptoms: React.FC<RecentSymptomsProps> = ({ 
  symptoms, 
  onAddSymptom 
}) => {
  const [isAddingSymptom, setIsAddingSymptom] = useState(false);
  //const [newSymptom, setNewSymptom] = useState({
    const [newSymptom, setNewSymptom] = useState<Omit<Symptom, 'id'>>({

    name: '',
    severity: 5,
    duration: '',
    severityCategory: 'Moderate',
  });

  const getSeverityColor = (severity: number) => {
    if (severity <= 3) return 'bg-success-500';
    if (severity <= 6) return 'bg-warning-500';
    return 'bg-error-500';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSymptom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (newSymptom.name && newSymptom.duration) {
      onAddSymptom({
        ...newSymptom,
        id: Math.random().toString(),
        severity: parseInt(newSymptom.severity.toString()),
      });
      setIsAddingSymptom(false); // Close the form
    }
  };
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSymptom((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card title="Recent Symptoms">
      {symptoms.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500">No symptoms recorded</p>
          <button 
            className="mt-4 btn btn-primary" 
            onClick={() => setIsAddingSymptom(true)}
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
            <button className="btn btn-outline-primary" onClick={() => setIsAddingSymptom(true)}>
              Add Symptom
            </button>
            <button className="btn btn-outline">View History</button>
          </div>
        </>
      )}

      {/* Form for adding new symptom */}
      {isAddingSymptom && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Add New Symptom</h3>
          <div>
            <input
              type="text"
              name="name"
              value={newSymptom.name}
              onChange={handleInputChange}
              placeholder="Symptom Name"
              className="mb-4 p-2 border rounded w-full"
            />
            <textarea
              name="duration"
              value={newSymptom.duration}
              onChange={handleInputChange}
              placeholder="Duration"
              className="mb-4 p-2 border rounded w-full"
            />
            <div className="flex mb-4">
              <label className="mr-2">Severity (1-10): </label>
              <input
                type="number"
                name="severity"
                value={newSymptom.severity}
                onChange={handleInputChange}
                min="1"
                max="10"
                className="p-2 border rounded w-16"
              />
            </div>
            <div className="mb-4">
              <label className="mr-2">Severity Category: </label>
              
              <select
  name="severityCategory"
  value={newSymptom.severityCategory}
  onChange={handleSelectChange}
  className="p-2 border rounded w-full"
>
  <option value="Critical">Critical</option>
  <option value="Moderate">Moderate</option>
  <option value="Mild">Mild</option>
</select>
            </div>
            <button 
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Save Symptom
            </button>
            <button
              className="btn btn-outline ml-4"
              onClick={() => setIsAddingSymptom(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default RecentSymptoms;