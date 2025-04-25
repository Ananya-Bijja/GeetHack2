import React, { useState } from 'react';
import Card from '../components/ui/Card';
import HealthLogForm from '../components/health/HealthLogForm';
import { HealthLog } from '../types';
import { PlusCircle, Calendar, ArrowDown, ArrowUp } from 'lucide-react';

// Mock data - in a real app this would come from an API
const mockHealthLogs: HealthLog[] = [
  {
    id: '1',
    date: '2025-05-08T09:00:00Z',
    painLevel: 2,
    mood: 'good',
    symptoms: [
      {
        id: '1',
        name: 'Chest Pain',
        severity: 2,
        duration: '10 minutes',
      },
      {
        id: '2',
        name: 'Fatigue',
        severity: 4,
        duration: 'Morning',
      },
    ],
    notes: 'Feeling better today. The new medication seems to be working well.',
    vitals: {
      temperature: 98.6,
      bloodPressure: {
        systolic: 120,
        diastolic: 80,
      },
      heartRate: 72,
      oxygenSaturation: 98,
    },
  },
  {
    id: '2',
    date: '2025-05-07T09:00:00Z',
    painLevel: 3,
    mood: 'fair',
    symptoms: [
      {
        id: '3',
        name: 'Chest Pain',
        severity: 3,
        duration: '15 minutes',
      },
      {
        id: '4',
        name: 'Shortness of Breath',
        severity: 4,
        duration: 'During walk',
      },
      {
        id: '5',
        name: 'Fatigue',
        severity: 5,
        duration: 'All day',
      },
    ],
    notes: 'Had some shortness of breath during my 10-minute walk. Will monitor.',
    vitals: {
      temperature: 98.8,
      bloodPressure: {
        systolic: 125,
        diastolic: 82,
      },
      heartRate: 76,
      oxygenSaturation: 97,
    },
  },
  {
    id: '3',
    date: '2025-05-06T09:00:00Z',
    painLevel: 4,
    mood: 'fair',
    symptoms: [
      {
        id: '6',
        name: 'Chest Pain',
        severity: 4,
        duration: '20 minutes',
      },
      {
        id: '7',
        name: 'Fatigue',
        severity: 6,
        duration: 'All day',
      },
    ],
    notes: 'Chest pain after breakfast, subsided with rest. Still feeling tired most of the day.',
    vitals: {
      temperature: 99.0,
      bloodPressure: {
        systolic: 128,
        diastolic: 84,
      },
      heartRate: 78,
      oxygenSaturation: 96,
    },
  },
];

const HealthLogs: React.FC = () => {
  const [isAddingLog, setIsAddingLog] = useState(false);
  const [selectedLog, setSelectedLog] = useState<HealthLog | null>(null);
  
  const handleSubmitLog = (log: Partial<HealthLog>) => {
    // In a real app, this would call an API to save the log
    console.log('Submitting health log:', log);
    setIsAddingLog(false);
    setSelectedLog(null);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Logs</h1>
          <p className="text-gray-600 mt-1">Track your daily symptoms and recovery progress</p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={() => {
            setIsAddingLog(true);
            setSelectedLog(null);
          }}
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Log Entry
        </button>
      </div>

      {isAddingLog ? (
        <HealthLogForm 
          onSubmit={handleSubmitLog}
          initialValues={selectedLog || undefined}
        />
      ) : selectedLog ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mb-6">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900">
                    {formatDate(selectedLog.date)}
                  </h3>
                </div>
                <p className="text-gray-500 mt-1">{formatTime(selectedLog.date)}</p>
              </div>
              <button 
                className="btn btn-outline-primary"
                onClick={() => setSelectedLog(null)}
              >
                Back to Logs
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Pain Level</h4>
                <div className="flex items-center">
                  <div className="text-2xl font-bold text-gray-900 mr-2">{selectedLog.painLevel}/10</div>
                  {selectedLog.painLevel <= 3 ? (
                    <span className="text-success-500 flex items-center">
                      <ArrowDown className="h-4 w-4 mr-1" />
                      Low
                    </span>
                  ) : selectedLog.painLevel <= 6 ? (
                    <span className="text-warning-500 flex items-center">
                      Moderate
                    </span>
                  ) : (
                    <span className="text-error-500 flex items-center">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      High
                    </span>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Mood</h4>
                <div className="text-2xl font-bold text-gray-900 capitalize">
                  {selectedLog.mood}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Symptoms</h4>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedLog.symptoms.length}
                </div>
              </div>
            </div>
            
            {selectedLog.vitals && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Vitals</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedLog.vitals.temperature && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="text-lg font-medium text-gray-900">{selectedLog.vitals.temperature}°F</p>
                    </div>
                  )}
                  
                  {selectedLog.vitals.bloodPressure && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Blood Pressure</p>
                      <p className="text-lg font-medium text-gray-900">
                        {selectedLog.vitals.bloodPressure.systolic}/{selectedLog.vitals.bloodPressure.diastolic}
                      </p>
                    </div>
                  )}
                  
                  {selectedLog.vitals.heartRate && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Heart Rate</p>
                      <p className="text-lg font-medium text-gray-900">{selectedLog.vitals.heartRate} BPM</p>
                    </div>
                  )}
                  
                  {selectedLog.vitals.oxygenSaturation && (
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">Oxygen</p>
                      <p className="text-lg font-medium text-gray-900">{selectedLog.vitals.oxygenSaturation}%</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {selectedLog.symptoms.length > 0 && (
              <div className="mb-6">
                <h4 className="text-lg font-medium text-gray-900 mb-3">Symptoms</h4>
                <div className="space-y-3">
                  {selectedLog.symptoms.map((symptom) => (
                    <div key={symptom.id} className="bg-white p-3 rounded-lg border border-gray-200">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">{symptom.name}</span>
                        <span className="text-sm text-gray-500">{symptom.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 h-2 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${
                              symptom.severity <= 3 
                                ? 'bg-success-500' 
                                : symptom.severity <= 6 
                                  ? 'bg-warning-500' 
                                  : 'bg-error-500'
                            }`} 
                            style={{ width: `${symptom.severity * 10}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs font-medium text-gray-900 min-w-[20px]">
                          {symptom.severity}/10
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedLog.notes && (
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">Notes</h4>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{selectedLog.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Card>
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pain Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mood</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symptoms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockHealthLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedLog(log)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatDate(log.date)}</div>
                      <div className="text-sm text-gray-500">{formatTime(log.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          log.painLevel <= 3 
                            ? 'bg-success-100 text-success-800' 
                            : log.painLevel <= 6 
                              ? 'bg-warning-100 text-warning-800' 
                              : 'bg-error-100 text-error-800'
                        }`}>
                          {log.painLevel}/10
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">{log.mood}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{log.symptoms.length} recorded</div>
                      <div className="text-sm text-gray-500">
                        {log.symptoms.slice(0, 2).map(s => s.name).join(', ')}
                        {log.symptoms.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default HealthLogs;