import React, { useState } from 'react';

const AddPatient: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [expectedRecoveryTime, setExpectedRecoveryTime] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [medications, setMedications] = useState([{ name: '', time: '' }]);
  const [message, setMessage] = useState('');

  const handleMedicineChange = (index: number, field: string, value: string) => {
    const updated = [...medications];
    updated[index][field] = value;
    setMedications(updated);
  };

  const addMedicineField = () => {
    setMedications([...medications, { name: '', time: '' }]);
  };

  const removeMedicineField = (index: number) => {
    const updated = medications.filter((_, i) => i !== index);
    setMedications(updated);
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();

    const doctorCode = localStorage.getItem('doctorCode');
    const doctorUsername = localStorage.getItem('doctorUsername');
    if (!doctorCode || !doctorUsername) {
      setMessage('❌ Doctor not logged in.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/doctor/add-patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'doctor-code': doctorCode,
        },
        body: JSON.stringify({
          username,
          password,
          diseaseName,
          expectedRecoveryTime,
          followUpDate,
          medications,
          healthMetricsData: [],
          symptoms: [],
          recoveryTrendData: [],
          vitalsSummary: {
            status: 'normal',
            lastUpdated: ''
          },
          nextAppointment: {
            date: '',
            doctor: '',
            type: ''
          },
          medicationAdherence: 0
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Patient added successfully!');
        setUsername('');
        setPassword('');
        setDiseaseName('');
        setExpectedRecoveryTime('');
        setFollowUpDate('');
        setMedications([{ name: '', time: '' }]);
      } else {
        setMessage(`❌ ${data.msg}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add patient.');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Patient</h2>
      <form onSubmit={handleAddPatient} className="space-y-4">
        <input type="text" placeholder="Patient Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Patient Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Disease Name" value={diseaseName} onChange={(e) => setDiseaseName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Expected Recovery Time" value={expectedRecoveryTime} onChange={(e) => setExpectedRecoveryTime(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="date" placeholder="Follow-up Date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} className="w-full p-2 border rounded" required />

        <label className="block font-semibold">Medicines</label>
        {medications.map((med, index) => (
          <div key={index} className="flex space-x-2">
            <input
              type="text"
              placeholder="Name"
              value={med.name}
              onChange={(e) => handleMedicineChange(index, 'name', e.target.value)}
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              type="time"
              value={med.time}
              onChange={(e) => handleMedicineChange(index, 'time', e.target.value)}
              className="w-1/2 p-2 border rounded"
              required
            />
            <button type="button" onClick={() => removeMedicineField(index)} className="text-red-500 font-bold">X</button>
          </div>
        ))}
        <button type="button" onClick={addMedicineField} className="text-blue-600">+ Add Medicine</button>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Patient</button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
};

export default AddPatient;
