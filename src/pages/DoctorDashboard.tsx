
import React, { useState, useEffect } from 'react';
import Card from '../components/ui/Card';
import StatusBadge from '../components/ui/StatusBadge';
import { Calendar, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Patient } from '../types';

const DoctorDashboard: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const doctorCode = localStorage.getItem('doctorCode');
      if (!doctorCode) return;

      try {
        const res = await fetch('http://localhost:5000/api/doctor/patients', {
          headers: {
            'doctor-code': doctorCode
          }
        });

        if (res.ok) {
          const data = await res.json();
          setPatients(data);
        } else {
          console.error('Failed to fetch patients');
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchPatients();
  }, []);

  const getConcerningPatients = () => {
    return patients.filter(p => p.status === 'concerning' || p.status === 'critical');
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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {getConcerningPatients().map((patient, index) => {
                      const discharge = new Date(patient.dischargeDate);
                      const today = new Date();
                      const diffTime = Math.abs(today.getTime() - discharge.getTime());
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                      return (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{patient.username}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{patient.diseaseName}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <StatusBadge status={patient.status || 'stable'} />
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
            <p className="text-sm text-gray-500 p-4">Alert functionality not yet implemented.</p>
          </Card>
        </div>
      </div>

      <div>
        <Card title="All Patients">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Diagnosis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Follow-up</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {patients.map((patient, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">{patient.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.diseaseName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(patient.followUpDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={patient.status || 'stable'} />
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
