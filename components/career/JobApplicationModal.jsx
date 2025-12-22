"use client";
import { jobAPI } from "@/utils/api";
import React, { useState } from "react";
import { toast } from "react-toastify";
// Import SCSS directly from public folder
import "../../public/scss/component/_job-application-modal.scss";
import { IoMdClose } from "react-icons/io";
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaMoneyBillWave } from "react-icons/fa";

export default function JobApplicationModal({ show, onClose, job }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [cvFile, setCvFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData
      const data = new FormData();
      data.append("jobId", job._id);
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);
      if (cvFile) {
        data.append("cv", cvFile);
      }

      const res = await jobAPI.applyForJob(data);

      if (res.success) {
        toast.success("Application submitted successfully!");
        onClose();
        setFormData({ name: "", email: "", phone: "", message: "" });
        setCvFile(null);
      } else {
        toast.error(res.error || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting application");
    } finally {
      setLoading(false);
    }
  };

  if (!show || !job) return null;

  return (
    <div className="job-application-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="job-application-modal job-application-modal--split" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h5 className="title">Apply for {job.title}</h5>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <IoMdClose />
          </button>
        </div>

        <div className="modal-content-wrapper">
          {/* Left Side - Job Details */}
          <div className="job-details-section" style={{ background: '#fff' }}>
            <div className="job-details-header" style={{
              background: '#bd8c31',
              padding: '32px',
              color: 'white'
            }}>
              <h3 className="job-title" style={{
                fontSize: '1.75rem',
                fontFamily: '"Lexend", sans-serif',
                fontWeight: 700,
                marginBottom: '20px'
              }}>{job.title}</h3>
              <div className="job-meta">
                <span className="job-meta-item" style={{ fontSize: '1.1rem', padding: '10px 16px' }}>
                  <FaBriefcase className="meta-icon" />
                  {job.department}
                </span>
                <span className="job-meta-item" style={{ fontSize: '1.1rem', padding: '10px 16px' }}>
                  <FaMapMarkerAlt className="meta-icon" />
                  {job.location}
                </span>
                <span className="job-meta-item" style={{ fontSize: '1.1rem', padding: '10px 16px' }}>
                  <FaClock className="meta-icon" />
                  <span className={`job-type-badge ${job.type === 'Full Time' ? 'full-time' : 'part-time'}`}>
                    {job.type}
                  </span>
                </span>
                {job.salary && (
                  <span className="job-meta-item" style={{ fontSize: '1.1rem', padding: '10px 16px' }}>
                    <FaMoneyBillWave className="meta-icon" />
                    <span className="salary">{job.salary}</span>
                  </span>
                )}
              </div>
            </div>

            <div className="job-details-body" style={{ padding: '32px' }}>
              {job.description && (
                <div className="job-section" style={{ marginBottom: '28px' }}>
                  <h4 className="section-title" style={{
                    fontSize: '1.4rem',
                    fontFamily: '"Lexend", sans-serif',
                    fontWeight: 700,
                    marginBottom: '14px',
                    color: '#2c2e33'
                  }}>Job Description</h4>
                  <p className="section-content" style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.8,
                    color: '#5c5e61'
                  }}>{job.description}</p>
                </div>
              )}

              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="job-section" style={{ marginBottom: '28px' }}>
                  <h4 className="section-title" style={{
                    fontSize: '1.4rem',
                    fontFamily: '"Lexend", sans-serif',
                    fontWeight: 700,
                    marginBottom: '14px',
                    color: '#2c2e33'
                  }}>Responsibilities</h4>
                  <ul className="section-list">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '10px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {job.requirements && job.requirements.length > 0 && (
                <div className="job-section">
                  <h4 className="section-title" style={{
                    fontSize: '1.4rem',
                    fontFamily: '"Lexend", sans-serif',
                    fontWeight: 700,
                    marginBottom: '14px',
                    color: '#2c2e33'
                  }}>Requirements</h4>
                  <ul className="section-list">
                    {job.requirements.map((item, index) => (
                      <li key={index} style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '10px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Application Form */}
          <div className="application-form-section">
            <form onSubmit={handleSubmit}>
              <div className="form-header" style={{
                padding: '28px 32px',
                background: '#fef7f1'
              }}>
                <h4 style={{
                  fontSize: '1.5rem',
                  fontFamily: '"Lexend", sans-serif',
                  fontWeight: 700,
                  marginBottom: '8px',
                  color: '#2c2e33'
                }}>Submit Your Application</h4>
                <p style={{ fontSize: '1.1rem', color: '#5c5e61' }}>Fill out the form below to apply for this position</p>
              </div>

              <div className="modal-body-custom">
                <div className="form-group-custom">
                  <label style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'block' }}>Full Name <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Ex. John Doe"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-custom">
                  <label style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'block' }}>Email Address <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-custom">
                  <label style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'block' }}>Phone Number <span style={{ color: "red" }}>*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-custom">
                  <label style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'block' }}>Upload CV/Resume ({'.pdf,.doc,.docx'}) <span style={{ color: "red" }}>*</span></label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-custom">
                  <label style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px', display: 'block' }}>Cover Letter / Message</label>
                  <textarea
                    name="message"
                    rows="3"
                    placeholder="Tell us why you're a great fit..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer-custom">
                <button type="button" className="btn-custom btn-secondary-custom" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-custom btn-primary-custom" disabled={loading}>
                  {loading ? "Sending..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
