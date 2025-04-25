import React, { useState } from 'react';
import Card from '../ui/Card';
import { HealthLog, Symptom, Vitals } from '../../types';
import { Plus, Trash } from 'lucide-react';

interface HealthLogFormProps {
  onSubmit: (log: Partial<HealthLog>) => void;
  initialValues?: Partial<HealthLog>;
}

const HealthLogForm: React.FC<HealthLogFormProps> = ({
  onSubmit,
  initialValues = {}
}) => {
  const [painLevel, setPainLevel] = useState(initialValues.painLevel || 0);
  const [mood, setMood] = useState<HealthLog['mood']>(initialValues.mood || 'good');
  const [symptoms, setSymptoms] = useState<Partial<Symptom>[]>(initialValues.symptoms || []);
  const [newSymptom, setNewSymptom] = useState<Partial<Symptom>>({ name: '', severity: 5, duration: '' });
  const [notes, setNotes] = useState(initialValues.notes || '');
  const [vitals, setVitals] = useState<Partial<Vitals>>(initialValues.vitals || {});

  const addSymptom = () => {
    if (!newSymptom.name) return;
    
    setSymptoms([...symptoms, { ...newSymptom, id: Date.now().toString() }]);
    setNewSymptom({ name: '', severity: 5, duration: '' });
  };

  const removeSymptom = (index: number) => {
    const updatedSymptoms = [...symptoms];
    updatedSymptoms.splice(index, 1);
    setSymptoms(updatedSymptoms);
  };

  const updateVitals = (field: keyof Vitals, value: string) => {
    setVitals({
      ...vitals,
      [field]: value ? Number(value) : undefined
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSubmit({
      date: new Date().toISOString(),
      painLevel,
      mood,
      symptoms: symptoms as Symptom[],
      notes,
      vitals: Object.keys(vitals).length > 0 ? vitals as Vitals : undefined
    });
  };

  return (
    <Card title="Health Log Entry">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Pain Level */}
          <div>
            <label htmlFor="painLevel" className="label">
              Pain Level: {painLevel}
            </label>
            <input
              type="range"
              id="painLevel"
              min="0"
              max="10"
              step="1"
              value={painLevel}
              onChange={(e) => setPainLevel(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>No Pain (0)</span>
              <span>Worst Pain (10)</span>
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="label">Mood</label>
            <div className="grid grid-cols-4 gap-2">
              {(['excellent', 'good', 'fair', 'poor'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm ${
                    mood === option
                      ? 'bg-primary-100 border border-primary-500 text-primary-700'
                      : 'bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setMood(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="label">Symptoms</label>
            
            {symptoms.length > 0 && (
              <div className="space-y-3 mb-4">
                {symptoms.map((symptom, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{symptom.name}</span>
                        <span className="text-xs text-gray-500">{symptom.duration}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <div className="w-full bg-gray-200 h-1.5 rounded-full">
                          <div 
                            className={`h-1.5 rounded-full ${
                              (symptom.severity || 0) <= 3 
                                ? 'bg-success-500' 
                                : (symptom.severity || 0) <= 6 
                                  ? 'bg-warning-500' 
                                  : 'bg-error-500'
                            }`} 
                            style={{ width: `${(symptom.severity || 0) * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs">{symptom.severity}/10</span>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="ml-2 text-gray-400 hover:text-error-500"
                      onClick={() => removeSymptom(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Symptom name"
                className="input flex-1"
                value={newSymptom.name}
                onChange={(e) => setNewSymptom({ ...newSymptom, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Duration"
                className="input w-1/3"
                value={newSymptom.duration}
                onChange={(e) => setNewSymptom({ ...newSymptom, duration: e.target.value })}
              />
            </div>
            
            <div className="flex items-center mb-2">
              <label className="text-xs mr-2 w-20">Severity:</label>
              <input
                type="range"
                min="0"
                max="10"
                value={newSymptom.severity}
                onChange={(e) => setNewSymptom({ ...newSymptom, severity: Number(e.target.value) })}
                className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="ml-2 text-xs min-w-[30px]">{newSymptom.severity}/10</span>
            </div>
            
            <button
              type="button"
              className="btn btn-outline-primary w-full flex items-center justify-center"
              onClick={addSymptom}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Symptom
            </button>
          </div>

          {/* Vitals */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="label mb-0">Vitals (Optional)</label>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="temperature" className="label text-xs">Temperature (°F)</label>
                <input
                  type="number"
                  id="temperature"
                  placeholder="98.6"
                  className="input"
                  value={vitals.temperature || ''}
                  onChange={(e) => updateVitals('temperature', e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="heartRate" className="label text-xs">Heart Rate (BPM)</label>
                <input
                  type="number"
                  id="heartRate"
                  placeholder="70"
                  className="input"
                  value={vitals.heartRate || ''}
                  onChange={(e) => updateVitals('heartRate', e.target.value)}
                />
              </div>
              
              <div className="col-span-2">
                <label htmlFor="bloodPressure" className="label text-xs">Blood Pressure (mmHg)</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="Systolic"
                    className="input"
                    value={vitals.bloodPressure?.systolic || ''}
                    onChange={(e) => setVitals({
                      ...vitals,
                      bloodPressure: {
                        ...vitals.bloodPressure,
                        systolic: Number(e.target.value)
                      }
                    })}
                  />
                  <span className="self-center">/</span>
                  <input
                    type="number"
                    placeholder="Diastolic"
                    className="input"
                    value={vitals.bloodPressure?.diastolic || ''}
                    onChange={(e) => setVitals({
                      ...vitals,
                      bloodPressure: {
                        ...vitals.bloodPressure,
                        diastolic: Number(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className="label">Notes</label>
            <textarea
              id="notes"
              rows={3}
              className="input"
              placeholder="How are you feeling today? Any concerns or improvements?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" className="btn btn-outline">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Log
            </button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default HealthLogForm;