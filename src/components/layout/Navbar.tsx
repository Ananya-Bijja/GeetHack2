import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, Bell, User, LogOut, X } from 'lucide-react';
import Logo from '../ui/Logo';

interface NavbarProps {
  userRole: 'patient' | 'doctor' | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsCount] = useState(3);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary-600">
                RecoveryTrack
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {userRole === 'patient' ? (
                <>
                  <NavLink 
                    to="/patient/dashboard" 
                    className={({ isActive }) => 
                      isActive 
                        ? "border-primary-500 text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/patient/health-logs" 
                    className={({ isActive }) => 
                      isActive 
                        ? "border-primary-500 text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }
                  >
                    Health Logs
                  </NavLink>
                  <NavLink 
                    to="/patient/medications" 
                    className={({ isActive }) => 
                      isActive 
                        ? "border-primary-500 text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }
                  >
                    Medications
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink 
                    to="/doctor/dashboard" 
                    className={({ isActive }) => 
                      isActive 
                        ? "border-primary-500 text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }
                  >
                    Dashboard
                  </NavLink>
                  <NavLink 
                    to="/doctor/add-patient" 
                    className={({ isActive }) => 
                      isActive 
                        ? "border-primary-500 text-primary-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium" 
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    }
                  >
                    Add Patient
                  </NavLink>
                </>
              )}
            </div>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            <button className="p-2 text-gray-500 hover:text-primary-500 relative">
              <Bell className="h-5 w-5" />
              {notificationsCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-error-500 text-white text-xs">
                  {notificationsCount}
                </span>
              )}
            </button>
            
            <div className="relative">
              <button className="p-1 rounded-full text-gray-500 hover:text-primary-500 flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span className="hidden md:inline text-sm">Profile</span>
              </button>
            </div>
          </div>
          
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-primary-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {userRole === 'patient' ? (
              <>
                <NavLink 
                  to="/patient/dashboard" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" 
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/patient/health-logs" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" 
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Health Logs
                </NavLink>
                <NavLink 
                  to="/patient/medications" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" 
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Medications
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/doctor/dashboard" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" 
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/doctor/add-patient" 
                  className={({ isActive }) => 
                    isActive 
                      ? "bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium" 
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Patient
                </NavLink>
              </>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-primary-200 flex items-center justify-center text-primary-800 font-bold">
                  {userRole === 'patient' ? 'P' : userRole === 'doctor' ? 'D' : 'C'}
                </div>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-800">
                  {userRole === 'patient' ? 'John Doe' : userRole === 'doctor' ? 'Dr. Sarah Smith' : 'Mark Johnson'}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {userRole === 'patient' ? 'Patient' : userRole === 'doctor' ? 'Cardiologist' : 'Caregiver'}
                </div>
              </div>
              <button className="ml-auto p-1 rounded-full text-gray-400 hover:text-primary-500">
                <Bell className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-3 space-y-1">
              <NavLink 
                to="/profile" 
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Your Profile
              </NavLink>
              <NavLink 
                to="/settings" 
                className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                Settings
              </NavLink>
              <button 
                className="w-full text-left flex items-center space-x-2 px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogOut className="h-5 w-5" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;