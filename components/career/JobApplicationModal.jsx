"use client";
import { jobAPI } from "@/utils/api";
import React, { useState } from "react";
import { toast } from "react-toastify";
// Import SCSS directly from public folder
import "../../public/scss/component/_job-application-modal.scss";
import { IoMdClose } from "react-icons/io";

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
      <div className="job-application-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-custom">
          <h5 className="title">Apply for {job.title}</h5>
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <IoMdClose />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body-custom">
            <div className="form-group-custom">
              <label>Full Name <span style={{ color: "red" }}>*</span></label>
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
              <label>Email Address <span style={{ color: "red" }}>*</span></label>
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
              <label>Phone Number <span style={{ color: "red" }}>*</span></label>
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
              <label>Upload CV/Resume ({'.pdf,.doc,.docx'}) <span style={{ color: "red" }}>*</span></label>
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
              <label>Cover Letter / Message</label>
              <textarea
                name="message"
                rows="4"
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
  );
}
