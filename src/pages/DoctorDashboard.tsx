import React from 'react';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { Calendar, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Patient } from '../types';

// Mock data - in a real app this would come from an API
const mockPatients: (Patient & { status: 'improving' | 'stable' | 'concerning' | 'critical' })[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'patient',
    dateOfBirth: '1975-05-15',
    diagnosis: 'Post-Cardiac Surgery Recovery',
    dischargeDate: '2025-05-01',
    status: 'improving',
    medications: [],
    healthLogs: [],
  },
  {
    id: '2',
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    role: 'patient',
    dateOfBirth: '1982-10-28',
    diagnosis: 'Post-Hip Replacement',
    dischargeDate: '2025-05-03',
    status: 'stable',
    medications: [],
    healthLogs: [],
  },
  {
    id: '3',
    name: 'Robert Williams',
    email: 'robert.williams@example.com',
    role: 'patient',
    dateOfBirth: '1968-03-12',
    diagnosis: 'COPD Exacerbation Recovery',
    dischargeDate: '2025-04-25',
    status: 'concerning',
    medications: [],
    healthLogs: [],
  },
  {
    id: '4',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'patient',
    dateOfBirth: '1990-07-07',
    diagnosis: 'Post-Appendectomy',
    dischargeDate: '2025-05-05',
    status: 'stable',
    medications: [],
    healthLogs: [],
  },
  {
    id: '5',
    name: 'James Brown',
    email: 'james.brown@example.com',
    role: 'patient',
    dateOfBirth: '1955-12-03',
    diagnosis: 'Stroke Recovery',
    dischargeDate: '2025-04-20',
    status: 'critical',
    medications: [],
    healthLogs: [],
  },
];

const mockAlerts = [
  {
    id: '1',
    patientId: '5',
    patientName: 'James Brown',
    type: 'critical',
    message: 'Reported severe headache and confusion',
    createdAt: '2025-05-08T09:35:00Z',
  },
  {
    id: '2',
    patientId: '3',
    patientName: 'Robert Williams',
    type: 'warning',
    message: 'Oxygen saturation dropped to 93%',
    createdAt: '2025-05-08T08:15:00Z',
  },
  {
    id: '3',
    patientId: '1',
    patientName: 'John Doe',
    type: 'info',
    message: 'Missed evening medication dose',
    createdAt: '2025-05-07T21:00:00Z',
  },
];

const mockAppointments = [
  {
    id: '1',
    patientId: '2',
    patientName: 'Emily Johnson',
    date: '2025-05-10',
    time: '10:00 AM',
    type: 'Follow-up',
  },
  {
    id: '2',
    patientId: '1',
    patientName: 'John Doe',
    date: '2025-05-10',
    time: '11:30 AM',
    type: 'Check-up',
  },
  {
    id: '3',
    patientId: '4',
    patientName: 'Maria Garcia',
    date: '2025-05-10',
    time: '2:15 PM',
    type: 'Post-op',
  },
  {
    id: '4',
    patientId: '3',
    patientName: 'Robert Williams',
    date: '2025-05-11',
    time: '9:00 AM',
    type: 'Urgent Care',
  },
];

const DoctorDashboard: React.FC = () => {
  const getConcerningPatients = () => {
    return mockPatients.filter(p => p.status === 'concerning' || p.status === 'critical');
  };
  
  const getAlertBadgeClass = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-error-100 text-error-800';
      case 'warning':
        return 'bg-warning-100 text-warning-800';
      case 'info':
        return 'bg-primary-100 text-primary-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Doctor Dashboard</h1>
        <p className="text-gray-600 mt-1">Monitor your patients' recovery progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card title="At-Risk Patients">
            {getConcerningPatients().length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No patients require immediate attention</p>
              </div>
            ) : (
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Since Discharge</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getConcerningPatients().map((patient) => {
                      const discharge = new Date(patient.dischargeDate);
                      const today = new Date();
                      const diffTime = Math.abs(today.getTime() - discharge.getTime());
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      
                      return (
                        <tr key={patient.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                            <div className="text-sm text-gray-500">{new Date(patient.dateOfBirth).toLocaleDateString()}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{patient.diagnosis}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={patient.status} />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {diffDays} days
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 flex items-center">
                              View Details
                              <ArrowUpRight className="h-4 w-4 ml-1" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>
        
        <div>
          <Card title="Recent Alerts">
            <div className="divide-y divide-gray-100">
              {mockAlerts.map((alert) => (
                <div key={alert.id} className="py-3">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-md ${
                      alert.type === 'critical' 
                        ? 'bg-error-50' 
                        : alert.type === 'warning' 
                          ? 'bg-warning-50' 
                          : 'bg-primary-50'
                    }`}>
                      <AlertTriangle className={`h-5 w-5 ${
                        alert.type === 'critical' 
                          ? 'text-error-500' 
                          : alert.type === 'warning' 
                            ? 'text-warning-500' 
                            : 'text-primary-500'
                      }`} />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{alert.patientName}</p>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAlertBadgeClass(alert.type)}`}>
                          {alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTime(alert.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4">
              <button className="btn btn-outline-primary w-full">View All Alerts</button>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mb-6">
        <Card title="Today's Appointments">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockAppointments.map((appointment) => (
              <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                  <div className="text-sm font-medium text-gray-900">
                    {appointment.time}
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-base font-medium">{appointment.patientName}</div>
                  <div className="text-sm text-gray-500">{appointment.type}</div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {new Date(appointment.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </div>
                  <button className="text-primary-600 hover:text-primary-900 text-sm font-medium">
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <div>
        <Card title="All Patients">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Update</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-bold">
                          {patient.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                          <div className="text-sm text-gray-500">{patient.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{patient.diagnosis}</div>
                      <div className="text-sm text-gray-500">
                        Discharged: {new Date(patient.dischargeDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={patient.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">Yesterday, 3:45 PM</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-4">
                        View Profile
                      </button>
                      <button className="text-primary-600 hover:text-primary-900">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;