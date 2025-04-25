// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // // Helper function to extract doctorCode from JWT token
// // const getDoctorCodeFromToken = () => {
// //   const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage
// //   if (!token) return null;

// //   const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
// //   return payload?.doctorCode || null; // Get doctorCode from the token's payload
// // };

// // const styles = {
// //   container: {
// //     maxWidth: "600px",
// //     margin: "40px auto",
// //     padding: "30px",
// //     backgroundColor: "#fff",
// //     borderRadius: "10px",
// //     boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
// //     fontFamily: "sans-serif",
// //   },
// //   heading: {
// //     textAlign: "center",
// //     marginBottom: "20px",
// //     color: "#333",
// //   },
// //   input: {
// //     width: "100%",
// //     padding: "10px",
// //     margin: "8px 0 15px",
// //     border: "1px solid #ccc",
// //     borderRadius: "5px",
// //     fontSize: "1rem",
// //   },
// //   medicineSection: {
// //     marginTop: "20px",
// //   },
// //   medicineLabel: {
// //     fontWeight: "bold",
// //     display: "block",
// //     marginBottom: "10px",
// //   },
// //   medicineRow: {
// //     display: "flex",
// //     gap: "10px",
// //     marginBottom: "10px",
// //   },
// //   button: {
// //     backgroundColor: "#28a745",
// //     color: "#fff",
// //     padding: "12px",
// //     border: "none",
// //     borderRadius: "6px",
// //     fontSize: "1rem",
// //     width: "100%",
// //     cursor: "pointer",
// //     marginTop: "20px",
// //   },
// //   addButton: {
// //     backgroundColor: "#f0ad4e",
// //     border: "none",
// //     color: "#fff",
// //     padding: "8px 12px",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //     marginTop: "5px",
// //   },
// //   removeButton: {
// //     backgroundColor: "#d9534f",
// //     border: "none",
// //     color: "#fff",
// //     padding: "8px 12px",
// //     borderRadius: "4px",
// //     cursor: "pointer",
// //   },
// // };

// // const Form = () => {
// //   const navigate = useNavigate();
// //   const [formData, setFormData] = useState({
// //     patientName: "",
// //     diseaseName: "",
// //     expectedRecoveryTime: "",
// //     followUpDate: "",
// //     medicines: [{ name: "", time: "" }],
// //   });

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement>,
// //     index: number | null = null,
// //     field: string | null = null
// //   ) => {
// //     const { name, value } = e.target;

// //     if (index !== null && field !== null) {
// //       // Update the specific field in the medicines array
// //       const updatedMeds = [...formData.medicines];
// //       updatedMeds[index] = { ...updatedMeds[index], [field]: value };
// //       setFormData({ ...formData, medicines: updatedMeds });
// //     } else {
// //       setFormData({ ...formData, [name]: value });
// //     }
// //   };

// //   const addMedicine = () => {
// //     setFormData({
// //       ...formData,
// //       medicines: [...formData.medicines, { name: "", time: "" }],
// //     });
// //   };

// //   const removeMedicine = (index: number) => {
// //     const updatedMeds = formData.medicines.filter((_, i) => i !== index);
// //     setFormData({ ...formData, medicines: updatedMeds });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Extract doctorCode from the token
// //     const doctorCode = getDoctorCodeFromToken();
// //     if (!doctorCode) {
// //       console.log("Doctor code is missing or invalid");
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:5000/api/doctor/add-patient', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           doctorCode: doctorCode, // Send the doctorCode from the token
// //           patientName: formData.patientName,
// //           diseaseName: formData.diseaseName,
// //           expectedRecoveryTime: formData.expectedRecoveryTime,
// //           followUpDate: formData.followUpDate,
// //           medicines: formData.medicines,
// //         }),
// //       });

// //       const result = await response.json();

// //       if (response.ok) {
// //         console.log('Patient added successfully', result);
// //       } else {
// //         console.log('Error:', result.msg);
// //       }
// //     } catch (error) {
// //       console.error('Error while adding patient:', error);
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2 style={styles.heading}>Post-Hospital Recovery Form</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="text"
// //           name="patientName"
// //           placeholder="Patient Name"
// //           value={formData.patientName}
// //           onChange={handleChange}
// //           style={styles.input}
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="diseaseName"
// //           placeholder="Disease Name"
// //           value={formData.diseaseName}
// //           onChange={handleChange}
// //           style={styles.input}
// //           required
// //         />
// //         <input
// //           type="text"
// //           name="expectedRecoveryTime"
// //           placeholder="Expected Recovery Time"
// //           value={formData.expectedRecoveryTime}
// //           onChange={handleChange}
// //           style={styles.input}
// //           required
// //         />
// //         <input
// //           type="date"
// //           name="followUpDate"
// //           value={formData.followUpDate}
// //           onChange={handleChange}
// //           style={styles.input}
// //           required
// //         />

// //         <div style={styles.medicineSection}>
// //           <label style={styles.medicineLabel}>Medicines</label>
// //           {formData.medicines.map((medicine, index) => (
// //             <div key={index} style={styles.medicineRow}>
// //               <input
// //                 type="text"
// //                 placeholder="Medicine Name"
// //                 value={medicine.name}
// //                 onChange={(e) => handleChange(e, index, "name")}
// //                 style={styles.input}
// //                 required
// //               />
// //               <input
// //                 type="time"
// //                 value={medicine.time}
// //                 onChange={(e) => handleChange(e, index, "time")}
// //                 style={styles.input}
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => removeMedicine(index)}
// //                 style={styles.removeButton}
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}
// //           <button type="button" onClick={addMedicine} style={styles.addButton}>
// //             + Add Medicine
// //           </button>
// //         </div>

// //         <button type="submit" style={styles.button}>
// //           Submit Recovery Plan
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Form;
// import React, { useState } from 'react';

// const AddPatient: React.FC = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [doctorCode, setDoctorCode] = useState('');
//   const [message, setMessage] = useState('');

//   const handleAddPatient = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const res = await fetch('http://localhost:5000/api/doctor/add-patient', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ doctorCode, username, password })
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage('✅ Patient added successfully!');
//         setUsername('');
//         setPassword('');
//       } else {
//         setMessage(`❌ ${data.msg}`);
//       }
//     } catch (error) {
//       setMessage('❌ Failed to add patient.');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
//       <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
//       <form onSubmit={handleAddPatient} className="space-y-4">
//         <div>
//           <label>Doctor Code</label>
//           <input
//             type="text"
//             value={doctorCode}
//             onChange={(e) => setDoctorCode(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label>Patient Username</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <div>
//           <label>Patient Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Patient
//         </button>
//       </form>
//       {message && <p className="mt-4 text-sm text-center">{message}</p>}
//     </div>
//   );
// };

// export default AddPatient;
import React, { useState, useEffect } from 'react';

const AddPatient: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [doctorCode, setDoctorCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const storedCode = localStorage.getItem('doctorCode');
    if (storedCode) setDoctorCode(storedCode);
  }, []);

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/doctor/add-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctorCode, username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Patient added successfully!');
        setUsername('');
        setPassword('');
      } else {
        setMessage(`❌ ${data.msg}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add patient.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
      <form onSubmit={handleAddPatient} className="space-y-4">
        <div>
          <label>Doctor Code</label>
          <input
            type="text"
            value={doctorCode}
            onChange={(e) => setDoctorCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Patient Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label>Patient Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Patient
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};

export default AddPatient;
