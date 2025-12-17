import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doctorService } from '../../data/mockData';

const DoctorForm = ({ mode = 'add' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isEditMode = mode === 'edit';
  
  const [formData, setFormData] = useState({
    name: '',
    specialization: 'Cardiology',
    email: '',
    phone: '',
    yearsOfExperience: '',
    qualifications: '',
    office: '',
    schedule: 'Mon-Fri: 9AM-5PM',
    hourlyRate: '',
    status: 'active',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializations = [
    'Cardiology', 'Dermatology', 'Orthopedics', 
    'Pediatrics', 'Neurology', 'Oncology', 'General Practice'
  ];

  useEffect(() => {
    if (isEditMode && id) {
      const doctor = doctorService.getDoctorById(parseInt(id));
      if (doctor) {
        setFormData({
          ...doctor,
          qualifications: doctor.qualifications.join(', ')
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
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Doctor name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Experience is required';
    
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
    
    const formattedData = {
      ...formData,
      yearsOfExperience: parseInt(formData.yearsOfExperience),
      hourlyRate: parseInt(formData.hourlyRate) || 150,
      qualifications: formData.qualifications 
        ? formData.qualifications.split(',').map(item => item.trim()).filter(item => item)
        : []
    };
    
    try {
      if (isEditMode) {
        doctorService.updateDoctor(parseInt(id), formattedData);
      } else {
        doctorService.addDoctor(formattedData);
      }
      
      navigate('/admin/doctors');
    } catch (error) {
      console.error('Error saving doctor:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/admin/doctors');
  };

  return (
    <div className="patient-form-container">
      <div className="form-header">
        <h2>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h2>
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
          {/* Professional Information */}
          <div className="form-section">
            <h3><i className="fas fa-user-md"></i> Professional Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Doctor Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Dr. John Smith"
                  disabled={isSubmitting}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="specialization">Specialization *</label>
                <select
                  id="specialization"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className={errors.specialization ? 'error' : ''}
                >
                  <option value="">Select specialization</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
                {errors.specialization && <span className="error-message">{errors.specialization}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="yearsOfExperience">Years of Experience *</label>
                <input
                  type="number"
                  id="yearsOfExperience"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                  placeholder="10"
                  min="0"
                  max="50"
                  disabled={isSubmitting}
                  className={errors.yearsOfExperience ? 'error' : ''}
                />
                {errors.yearsOfExperience && <span className="error-message">{errors.yearsOfExperience}</span>}
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
                  placeholder="doctor.smith@hospital.com"
                  disabled={isSubmitting}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="office">Office Location</label>
                <input
                  type="text"
                  id="office"
                  name="office"
                  value={formData.office}
                  onChange={handleChange}
                  placeholder="Room 301, Floor 3"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Schedule & Rates */}
          <div className="form-section">
            <h3><i className="fas fa-calendar-alt"></i> Schedule & Rates</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="schedule">Working Schedule</label>
                <input
                  type="text"
                  id="schedule"
                  name="schedule"
                  value={formData.schedule}
                  onChange={handleChange}
                  placeholder="Mon, Wed, Fri: 9AM-5PM"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hourlyRate">Hourly Rate ($)</label>
                <input
                  type="number"
                  id="hourlyRate"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleChange}
                  placeholder="150"
                  min="50"
                  max="500"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="active">Active</option>
                  <option value="on-leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="form-section">
            <h3><i className="fas fa-graduation-cap"></i> Qualifications</h3>
            <div className="form-group full-width">
              <label htmlFor="qualifications">Certifications & Qualifications</label>
              <input
                type="text"
                id="qualifications"
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="MD, Board Certified, Fellowship in... (comma separated)"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
            <h3><i className="fas fa-notes-medical"></i> Additional Notes</h3>
            <div className="form-group full-width">
              <label htmlFor="notes">Notes</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Special skills, languages spoken, research interests..."
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
                <i className="fas fa-save"></i> {isEditMode ? 'Update Doctor' : 'Add Doctor'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorForm;