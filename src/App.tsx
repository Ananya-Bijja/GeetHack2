import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import HealthLogs from './pages/HealthLogs';
import MedicationTracker from './pages/MedicationTracker';
import DoctorDashboard from './pages/DoctorDashboard';
import DoctorSignup from './pages/DoctorSignup';
import DoctorLogin from './pages/DoctorLogin';
import PatientLogin from './pages/PatientLogin';
import AddPatient from './pages/AddPatient';

// Landing page component
const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-4xl w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            Welcome to RecoveryTrack
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your comprehensive healthcare management platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Doctor Signup Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Signup</h2>
            <p className="text-gray-600 mb-4">New to RecoveryTrack? Create your doctor account.</p>
            <a
              href="/doctor/signup"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Sign Up as Doctor
            </a>
          </div>

          {/* Doctor Login Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Login</h2>
            <p className="text-gray-600 mb-4">Already have an account? Log in to manage your patients.</p>
            <a
              href="/doctor/login"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Login as Doctor
            </a>
          </div>

          {/* Patient Login Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Login</h2>
            <p className="text-gray-600 mb-4">Access your health records and track your recovery.</p>
            <a
              href="/patient/login"
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Login as Patient
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Doctor Dashboard with Add Patient option
const DoctorDashboardWithOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Doctor Dashboard</h2>
            <p className="text-gray-600 mb-4">Welcome to your dashboard. Here you can manage your patients and view their health records.</p>
            <button
              onClick={() => navigate('/doctor/dashboard')}
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Go to Dashboard
            </button>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Add New Patient</h2>
            <p className="text-gray-600 mb-4">Register a new patient and generate their unique login credentials.</p>
            <button
              onClick={() => navigate('/doctor/add-patient')}
              className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add Patient
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [userRole, setUserRole] = useState<'patient' | 'doctor' | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (role: 'patient' | 'doctor') => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUserRole(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {isAuthenticated && (
        <header>
          <Navbar userRole={userRole} onLogout={handleLogout} />
        </header>
      )}
      
      <main className="flex-1">
        <Routes>
          {/* Landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Public routes */}
          <Route path="/doctor/signup" element={<DoctorSignup />} />
          <Route path="/doctor/login" element={<DoctorLogin onLogin={handleLogin} />} />
          <Route path="/patient/login" element={<PatientLogin onLogin={handleLogin} />} />

          {/* Protected doctor routes */}
          <Route
            path="/doctor/options"
            element={
              isAuthenticated && userRole === 'doctor' ? (
                <DoctorDashboardWithOptions />
              ) : (
                <Navigate to="/doctor/login" replace />
              )
            }
          />
          <Route
            path="/doctor/dashboard"
            element={
              isAuthenticated && userRole === 'doctor' ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/doctor/login" replace />
              )
            }
          />
          <Route
            path="/doctor/add-patient"
            element={
              isAuthenticated && userRole === 'doctor' ? (
                <AddPatient />
              ) : (
                <Navigate to="/doctor/login" replace />
              )
            }
          />

          {/* Protected patient routes */}
          <Route
            path="/patient/dashboard"
            element={
              isAuthenticated && userRole === 'patient' ? (
                <Dashboard />
              ) : (
                <Navigate to="/patient/login" replace />
              )
            }
          />
          <Route
            path="/patient/health-logs"
            element={
              isAuthenticated && userRole === 'patient' ? (
                <HealthLogs />
              ) : (
                <Navigate to="/patient/login" replace />
              )
            }
          />
          <Route
            path="/patient/medications"
            element={
              isAuthenticated && userRole === 'patient' ? (
                <MedicationTracker />
              ) : (
                <Navigate to="/patient/login" replace />
              )
            }
          />
          <Route
            path="/patient/symptoms"
            element={
              isAuthenticated && userRole === 'patient' ? (
                <div className="p-6">
                  <h1 className="text-2xl font-bold mb-4">Symptom Tracking</h1>
                  <div className="bg-white rounded-lg shadow p-6">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Symptom</label>
                        <input
                          type="text"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          placeholder="Enter your symptom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Severity (1-10)</label>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                          rows={3}
                          placeholder="Additional notes about your symptom"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      >
                        Log Symptom
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <Navigate to="/patient/login" replace />
              )
            }
          />

          {/* Default route */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </main>
      
      {isAuthenticated && (
        <footer className="bg-white border-t border-gray-200 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                © 2025 RecoveryTrack. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;