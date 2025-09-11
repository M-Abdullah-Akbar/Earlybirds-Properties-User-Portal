"use client";
import React, { useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import { emailAPI } from "../../utils/api";

//import MapComponent from "../common/MapComponent";

export default function BookConsultationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyStatus: "Select",
    userInfo: "Select",
    maxPrice: "",
    minSize: "",
    bedrooms: "",
    bathrooms: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePropertyStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      propertyStatus: value
    }));
  };

  const handleUserInfoChange = (value) => {
    setFormData(prev => ({
      ...prev,
      userInfo: value
    }));
  };

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (formData.propertyStatus === 'Select') {
      newErrors.propertyStatus = 'Please select a property status';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Prepare data for backend API
      const submitData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        propertyStatus: formData.propertyStatus !== 'Select' ? formData.propertyStatus : '',
        userInfo: formData.userInfo !== 'Select' ? formData.userInfo : '',
        maxPrice: formData.maxPrice,
        minSize: formData.minSize,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        message: formData.message.trim(),
        recipient: process.env.NEXT_PUBLIC_ADMIN_EMAIL || "info@earlybirdsproperties.com"
      };

      // Send email using our API utility
      const response = await emailAPI.sendContactEmail(submitData);

      if (response.success) {
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          propertyStatus: "Select",
          userInfo: "Select",
          maxPrice: "",
          minSize: "",
          bedrooms: "",
          bathrooms: "",
          message: ""
        });
        setSuccess(true);
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error sending email:", error.message || "An error occurred");
      
      // Set user-friendly error message
      const errorMessage = error.message || 'Failed to send your message. Please try again later.';
      setErrors({ general: errorMessage });
      setSuccess(false);
      handleShowMessage();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-top-map style-2">
      {/*<div className="wrap-map">
        <div
          id="map"
          className="row-height"
          data-map-zoom={16}
          data-map-scroll="true"
        >
          <MapComponent />
        </div>
      </div>*/}
      <div className="box mt-5">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <form
                id="contactform"
                onSubmit={handleSubmit}
                className="form-contact"
              >
                {showMessage && (
                  <div className={`message-box ${success ? 'success' : 'error'}`}>
                    <p>{success ? 'Your message has been sent successfully!' : 'Failed to send message. Please try again.'}</p>
                  </div>
                )}
                {errors.general && (
                  <div className="message-box error">
                    <p>{errors.general}</p>
                  </div>
                )}
                <div className="heading-section text-center mb-5">
                  <h2 className="title mb-3" style={{ color: 'var(--Primary)' }}>We Would Love to Hear From You</h2>
                  <p className="text-1" style={{ color: 'var(--Text)' }}>
                    We'll get to know you to understand your selling goals,
                    explain the selling process so you know what to expect.
                  </p>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="firstName" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>First Name <span style={{ color: 'var(--Color-2)' }}>*</span></label>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${errors.firstName ? 'is-invalid' : ''}`}
                        placeholder="Enter your first name"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="lastName" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Last Name <span style={{ color: 'var(--Color-2)' }}>*</span></label>
                      <input
                        type="text"
                        className={`form-control form-control-lg ${errors.lastName ? 'is-invalid' : ''}`}
                        placeholder="Enter your last name"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </fieldset>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="email" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Email Address <span style={{ color: 'var(--Color-2)' }}>*</span></label>
                      <input
                        type="email"
                        className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email address"
                        name="email"
                        id="email-contact"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="phone" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Phone Number</label>
                      <input
                        type="tel"
                        className="form-control form-control-lg"
                        placeholder="Enter your phone number"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>
                        Property Status <span style={{ color: 'var(--Color-2)' }}>*</span>
                      </label>
                      <DropdownSelect
                        options={["Select", "Buy", "Sell", "Rent", "Mortgage"]}
                        addtionalParentClass={`form-select-lg ${errors.propertyStatus ? 'error' : ''}`}
                        defaultValue={formData.propertyStatus}
                        onChange={handlePropertyStatusChange}
                      />
                      {errors.propertyStatus && <div className="invalid-feedback d-block">{errors.propertyStatus}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>
                        I am a
                      </label>
                      <DropdownSelect
                        options={["Select", "Buyer", "Seller", "Tenant", "Broker"]}
                        addtionalParentClass="form-select-lg"
                        defaultValue={formData.userInfo}
                        onChange={handleUserInfoChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="maxPrice" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Maximum Price (AED)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Enter maximum price"
                        name="maxPrice"
                        id="maxPrice"
                        value={formData.maxPrice}
                        onChange={handleChange}
                        min="0"
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="minSize" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Minimum Size (Sq Ft)</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Enter minimum size"
                        name="minSize"
                        id="minSize"
                        value={formData.minSize}
                        onChange={handleChange}
                        min="0"
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="bedrooms" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Bedrooms</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Number of bedrooms"
                        name="bedrooms"
                        id="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                    </fieldset>
                  </div>
                  <div className="col-md-6">
                    <fieldset className="form-group">
                      <label htmlFor="bathrooms" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Bathrooms</label>
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        placeholder="Number of bathrooms"
                        name="bathrooms"
                        id="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        min="0"
                        max="10"
                        style={{
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12">
                    <fieldset className="form-group">
                      <label htmlFor="message" className="form-label fw-6 mb-2" style={{ color: 'var(--Heading)' }}>Your Message <span style={{ color: 'var(--Color-2)' }}>*</span></label>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Tell us about your property requirements, preferred location, budget, or any specific questions you have..."
                        id="message"
                        className={`form-control form-control-lg ${errors.message ? 'is-invalid' : ''}`}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{ 
                          resize: 'vertical', 
                          minHeight: '120px',
                          backgroundColor: 'var(--Background)',
                          borderColor: 'var(--Border)',
                          color: 'var(--Text)'
                        }}
                      />
                      {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                    </fieldset>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button
                    className="tf-btn fw-7 pd-16 btn-lg px-5 py-3"
                    type="submit"
                    disabled={isSubmitting}
                    style={{ 
                      minWidth: '200px', 
                      borderRadius: '8px', 
                      fontSize: '16px',
                      backgroundColor: 'var(--Primary)',
                      borderColor: 'var(--Primary)',
                      color: '#ffffff'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending...
                      </>
                    ) : (
                      'Contact Our Experts'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
