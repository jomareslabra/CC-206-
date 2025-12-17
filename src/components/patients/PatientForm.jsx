import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { patientService } from '../../data/mockData';

const PatientForm = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // For edit mode
  
  const isEditMode = mode === 'edit';
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    primaryConcern: 'Cardiology',
    bloodType: 'A+',
    allergies: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: 'Spouse'
    },
    address: '',
    insuranceProvider: '',
    insuranceId: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load patient data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      const patient = patientService.getPatientById(parseInt(id));
      if (patient) {
        setFormData({
          ...patient,
          allergies: patient.allergies.join(', ')
        });
      }
    }
  }, [isEditMode, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [name]: value
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.primaryConcern) newErrors.primaryConcern = 'Primary concern is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Format allergies as array
    const formattedData = {
      ...formData,
      allergies: formData.allergies 
        ? formData.allergies.split(',').map(item => item.trim()).filter(item => item)
        : []
    };
    
    try {
      if (isEditMode) {
        patientService.updatePatient(parseInt(id), formattedData);
      } else {
        patientService.addPatient(formattedData);
      }
      
      // Success - navigate back to patients list
      navigate('/admin/patients');
    } catch (error) {
      console.error('Error saving patient:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/patients');
  };

  return (
    <div className="patient-form-container">
      <div className="form-header">
        <h2>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h2>
        <button 
          onClick={handleCancel}
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="patient-form">
        <div className="form-sections">
          {/* Personal Information */}
          <div className="form-section">
            <h3><i className="fas fa-user"></i> Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Smith"
                  disabled={isSubmitting}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="bloodType">Blood Type</label>
                <select
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h3><i className="fas fa-address-book"></i> Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  disabled={isSubmitting}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.smith@email.com"
                  disabled={isSubmitting}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main St, Springfield"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="form-section">
            <h3><i className="fas fa-heartbeat"></i> Medical Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="primaryConcern">Primary Concern *</label>
                <select
                  id="primaryConcern"
                  name="primaryConcern"
                  value={formData.primaryConcern}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.primaryConcern ? 'error' : ''}
                >
                  <option value="">Select a concern</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="General Checkup">General Checkup</option>
                </select>
                {errors.primaryConcern && <span className="error-message">{errors.primaryConcern}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="allergies">Allergies</label>
                <input
                  type="text"
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Penicillin, Peanuts (comma separated)"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="form-section">
            <h3><i className="fas fa-phone-emergency"></i> Emergency Contact</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="emergencyName">Contact Name</label>
                <input
                  type="text"
                  id="emergencyName"
                  name="name"
                  value={formData.emergencyContact.name}
                  onChange={handleEmergencyContactChange}
                  placeholder="Jane Smith"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyPhone">Contact Phone</label>
                <input
                  type="tel"
                  id="emergencyPhone"
                  name="phone"
                  value={formData.emergencyContact.phone}
                  onChange={handleEmergencyContactChange}
                  placeholder="(555) 123-4568"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyRelationship">Relationship</label>
                <select
                  id="emergencyRelationship"
                  name="relationship"
                  value={formData.emergencyContact.relationship}
                  onChange={handleEmergencyContactChange}
                  disabled={isSubmitting}
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Parent">Parent</option>
                  <option value="Child">Child</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="form-section">
            <h3><i className="fas fa-file-medical"></i> Insurance Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="insuranceProvider">Insurance Provider</label>
                <input
                  type="text"
                  id="insuranceProvider"
                  name="insuranceProvider"
                  value={formData.insuranceProvider}
                  onChange={handleChange}
                  placeholder="HealthCare Plus"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="insuranceId">Insurance ID</label>
                <input
                  type="text"
                  id="insuranceId"
                  name="insuranceId"
                  value={formData.insuranceId}
                  onChange={handleChange}
                  placeholder="HCP-789012"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
            <h3><i className="fas fa-notes-medical"></i> Medical Notes</h3>
            <div className="form-group full-width">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any additional medical information or notes..."
                rows="4"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Saving...
              </>
            ) : (
              <>
                <i className="fas fa-save"></i> {isEditMode ? 'Update Patient' : 'Add Patient'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;