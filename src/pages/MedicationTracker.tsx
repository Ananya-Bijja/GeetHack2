import React, { useState } from 'react';
import Card from '../components/ui/Card';
import { Clock, CheckCircle, PlusCircle, Edit, Trash } from 'lucide-react';
import { Medication } from '../types';

// Mock data - in a real app this would come from an API
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    timeOfDay: ['Morning'],
    startDate: '2025-05-01',
    instructions: 'Take with food',
    adherence: 95,
  },
  {
    id: '2',
    name: 'Metoprolol',
    dosage: '25mg',
    frequency: 'Twice daily',
    timeOfDay: ['Morning', 'Evening'],
    startDate: '2025-05-01',
    instructions: 'Take with water',
    adherence: 85,
  },
  {
    id: '3',
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    timeOfDay: ['Morning'],
    startDate: '2025-05-01',
    adherence: 100,
  },
  {
    id: '4',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    timeOfDay: ['Evening'],
    startDate: '2025-05-01',
    instructions: 'Take at bedtime',
    adherence: 90,
  },
];

const mockTodaySchedule = [
  {
    id: '1',
    medicationId: '1',
    time: '8:00 AM',
    status: 'taken',
    takenAt: '8:05 AM',
  },
  {
    id: '2',
    medicationId: '2',
    time: '8:00 AM',
    status: 'taken',
    takenAt: '8:10 AM',
  },
  {
    id: '3',
    medicationId: '3',
    time: '8:00 AM',
    status: 'taken',
    takenAt: '8:15 AM',
  },
  {
    id: '4',
    medicationId: '2',
    time: '8:00 PM',
    status: 'scheduled',
  },
  {
    id: '5',
    medicationId: '4',
    time: '9:00 PM',
    status: 'scheduled',
  },
];

const MedicationTracker: React.FC = () => {
  const [isAddingMedication, setIsAddingMedication] = useState(false);
  const [newMedication, setNewMedication] = useState<Partial<Medication>>({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    timeOfDay: ['Morning'],
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleAddMedication = () => {
    if (!newMedication.name || !newMedication.dosage) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would call an API to add the medication
    console.log('Adding medication:', newMedication);
    setIsAddingMedication(false);
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      timeOfDay: ['Morning'],
      startDate: new Date().toISOString().split('T')[0],
    });
  };

  const getMedicationById = (id: string) => {
    return mockMedications.find(med => med.id === id);
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Medication Tracker</h1>
        <p className="text-gray-600 mt-1">Manage your medications and track your adherence</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <div className="lg:col-span-1">
          <Card title="Today's Schedule">
            <div className="divide-y divide-gray-100">
              {mockTodaySchedule.map((item) => {
                const medication = getMedicationById(item.medicationId);
                return (
                  <div key={item.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-md ${getStatusStyles(item.status)}`}>
                        {item.status === 'taken' ? 
                          <CheckCircle className="h-5 w-5 text-success-500" /> : 
                          <Clock className="h-5 w-5 text-primary-500" />
                        }
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">{medication?.name}</p>
                        <p className="text-xs text-gray-500">{medication?.dosage} - {item.time}</p>
                      </div>
                    </div>
                    {item.status === 'scheduled' && (
                      <button className="btn btn-sm btn-outline-primary">
                        Take Now
                      </button>
                    )}
                    {item.status === 'taken' && (
                      <div className="text-xs text-gray-500">
                        Taken at {item.takenAt}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">You've taken 3 of 5 medications today</p>
              <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Medication List */}
        <div className="lg:col-span-2">
          <Card 
            title="My Medications"
            footer={
              <button 
                className="btn btn-primary w-full flex items-center justify-center"
                onClick={() => setIsAddingMedication(true)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add New Medication
              </button>
            }
          >
            {isAddingMedication ? (
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Medication</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="label">Medication Name*</label>
                      <input
                        type="text"
                        id="name"
                        className="input"
                        value={newMedication.name}
                        onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="dosage" className="label">Dosage*</label>
                      <input
                        type="text"
                        id="dosage"
                        className="input"
                        placeholder="e.g., 10mg"
                        value={newMedication.dosage}
                        onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="frequency" className="label">Frequency</label>
                      <select
                        id="frequency"
                        className="input"
                        value={newMedication.frequency}
                        onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
                      >
                        <option value="Once daily">Once daily</option>
                        <option value="Twice daily">Twice daily</option>
                        <option value="Three times daily">Three times daily</option>
                        <option value="Four times daily">Four times daily</option>
                        <option value="As needed">As needed</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="startDate" className="label">Start Date</label>
                      <input
                        type="date"
                        id="startDate"
                        className="input"
                        value={newMedication.startDate}
                        onChange={(e) => setNewMedication({ ...newMedication, startDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Time of Day</label>
                    <div className="flex flex-wrap gap-2">
                      {['Morning', 'Afternoon', 'Evening', 'Bedtime'].map((time) => (
                        <label key={time} className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                            checked={newMedication.timeOfDay?.includes(time)}
                            onChange={(e) => {
                              const updatedTimes = e.target.checked
                                ? [...(newMedication.timeOfDay || []), time]
                                : (newMedication.timeOfDay || []).filter(t => t !== time);
                              setNewMedication({ ...newMedication, timeOfDay: updatedTimes });
                            }}
                          />
                          <span className="ml-2 text-sm text-gray-700">{time}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="instructions" className="label">Special Instructions</label>
                    <textarea
                      id="instructions"
                      rows={2}
                      className="input"
                      placeholder="Any special instructions for taking this medication"
                      value={newMedication.instructions || ''}
                      onChange={(e) => setNewMedication({ ...newMedication, instructions: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button 
                      type="button" 
                      className="btn btn-outline"
                      onClick={() => setIsAddingMedication(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-primary"
                      onClick={handleAddMedication}
                    >
                      Save Medication
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Medication</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adherence</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockMedications.map((medication) => (
                      <tr key={medication.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{medication.name}</div>
                          <div className="text-sm text-gray-500">{medication.dosage}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{medication.frequency}</div>
                          <div className="text-sm text-gray-500">{medication.timeOfDay.join(', ')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 h-1.5 rounded-full mr-2">
                              <div 
                                className={`h-1.5 rounded-full ${
                                  medication.adherence >= 90 ? 'bg-success-500' :
                                  medication.adherence >= 75 ? 'bg-warning-500' :
                                  'bg-error-500'
                                }`}
                                style={{ width: `${medication.adherence}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{medication.adherence}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="text-error-600 hover:text-error-900">
                            <Trash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MedicationTracker;