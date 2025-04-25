// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface PatientLoginProps {
//   onLogin: (role: 'patient') => void;
// }

// const PatientLogin: React.FC<PatientLoginProps> = ({ onLogin }) => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     username: '',
//     code: ''
//   });
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:5000/api/patient/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       const data = await response.json();
//       if (response.ok) {
//         onLogin('patient');
//         navigate('/patient/dashboard'); // Redirect to patient dashboard
//       } else {
//         setErrorMessage(data.msg || 'Login failed');
//       }
//     } catch (err) {
//       setErrorMessage('Error logging in');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Patient Login</h2>
//           <p className="mt-2 text-center text-sm text-gray-600">Enter your username and unique code provided by your doctor</p>
//         </div>
//         {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="username" className="sr-only">Username</label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="code" className="sr-only">Unique Code</label>
//               <input
//                 id="code"
//                 name="code"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
//                 placeholder="Enter your unique code"
//                 value={formData.code}
//                 onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
//             >
//               Login
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PatientLogin;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PatientLoginProps {
  onLogin: (role: 'patient') => void;
}

const PatientLogin: React.FC<PatientLoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
    // doctorCode: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        onLogin('patient');
        navigate('/patient/dashboard');
      } else {
        setErrorMessage(data.msg || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Error logging in');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Patient Login</h2>
        </div>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label>Patient Name</label>
              <input
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Patient Name"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Password"
              />
            </div>
            {/* <div>
              <label>Doctor Code</label>
              <input
                name="doctorCode"
                type="text"
                required
                value={formData.doctorCode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Enter Doctor's Unique Code"
              />
            </div> */}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatientLogin;
