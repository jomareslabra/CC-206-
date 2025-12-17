import React, { useState } from 'react';
import { db } from '../../config/firebase';
import { writeBatch, doc } from 'firebase/firestore';
import { mockDoctors, mockPatients, mockAppointments } from '../../data/mockData';

const SeedData = () => {
  const [status, setStatus] = useState('Ready to upload');
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    if (!window.confirm('This will overwrite existing data with mock data. Continue?')) return;

    setLoading(true);
    setStatus('Initializing batch write...');

    try {
      const batch = writeBatch(db);

      // 1. Upload Doctors
      // We use the numeric ID as the Document ID so relationships stay intact
      mockDoctors.forEach((doctor) => {
        const docRef = doc(db, 'doctors', doctor.id.toString());
        batch.set(docRef, doctor);
      });

      // 2. Upload Patients
      mockPatients.forEach((patient) => {
        const docRef = doc(db, 'patients', patient.id.toString());
        batch.set(docRef, patient);
      });

      // 3. Upload Appointments
      mockAppointments.forEach((appt) => {
        const docRef = doc(db, 'appointments', appt.id.toString());
        batch.set(docRef, appt);
      });

      setStatus('Committing to Firebase...');
      await batch.commit();
      
      setStatus('✅ Success! Data uploaded. You can now delete this route.');
    } catch (error) {
      console.error(error);
      setStatus('❌ Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 bg-white shadow rounded-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Database Seeder</h2>
      <p className="mb-6 text-gray-600">
        Click below to upload all mock data (Patients, Doctors, Appointments) to your Firestore database.
      </p>
      
      <button
        onClick={handleSeed}
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-colors ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Uploading...' : 'Seed Database Now'}
      </button>

      <div className="mt-4 p-3 bg-gray-50 rounded border text-sm font-mono">
        Status: {status}
      </div>
    </div>
  );
};

export default SeedData;