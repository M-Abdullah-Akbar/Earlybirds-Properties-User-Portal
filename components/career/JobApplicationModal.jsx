"use client";
import { jobAPI } from "@/utils/api";
import React, { useState, useRef } from "react";

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
      if(e.target.files && e.target.files[0]) {
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
      if(cvFile) {
          data.append("cv", cvFile);
      }
      
      const res = await jobAPI.applyForJob(data);
      
      if (res.success) {
        alert("Application submitted successfully!");
        onClose();
        setFormData({ name: "", email: "", phone: "", message: "" });
        setCvFile(null);
      } else {
        alert(res.error || "Failed to submit application");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting application");
    } finally {
        setLoading(false);
    }
  };

  if (!show || !job) return null;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Apply for {job.title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-control"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                  <label className="form-label">Upload CV/Resume</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
              </div>
              <div className="mb-3">
                <label className="form-label">Cover Letter / Message</label>
                <textarea
                  name="message"
                  className="form-control"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
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
