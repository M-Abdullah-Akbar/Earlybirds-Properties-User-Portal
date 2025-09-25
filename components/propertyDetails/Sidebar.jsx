"use client";
import React, { useState } from "react";
import Image from "next/image";
import { emailAPI } from "../../utils/api";

export default function Sidebar({ property }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await emailAPI.sendPropertyInquiryEmail({
        ...formData,
        propertyId: property?.id,
        propertyTitle: property?.title,
        agent: 'Muhammad Zohaib Saleem',
        type: 'property_inquiry'
      });

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCall = () => {
    window.open('tel:+971561615675', '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, I'm interested in the property: ${property?.title || 'Property'}`);
    window.open(`https://wa.me/971561615675?text=${message}`, '_blank');
  };

  return (
    <div className="tf-sidebar sticky-sidebar">
      <div className="form-contact-seller mb-30">
        <div className="agent-contact-card">
          <div className="agent-header text-center mb-4">
            <div className="agent-avatar mb-3">
              <Image
                alt="Muhammad Zohaib Saleem"
                src="/images/founder-avatar.jpg"
                width={100}
                height={100}
                className="rounded-circle"
              />
            </div>
            <div className="agent-info">
              <h5 className="agent-name fw-6 mb-1" style={{ color: 'var(--Heading)' }}>Muhammad Zohaib Saleem</h5>
              <p className="agent-title" style={{ color: 'var(--Text)', fontSize: '14px' }}>Founder & CEO</p>
            </div>
          </div>
          
          {/*<div className="schedule-header mb-3 text-center" style={{ backgroundColor: 'var(--Secondary)', color: 'var(--Text-white)', padding: '12px 16px', borderRadius: '8px' }}>
            <span className="fw-5">Schedule a showing?</span>
          </div>*/}
          
          {submitStatus === 'success' && (
            <div className="alert alert-success mb-3" style={{ padding: '12px', backgroundColor: 'var(--Color-7)', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              Message sent successfully! We&apos;ll contact you soon.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className="alert alert-error mb-3" style={{ padding: '12px', backgroundColor: 'var(--Color-2)', color: 'white', borderRadius: '8px', textAlign: 'center' }}>
              Failed to send message. Please try again.
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <fieldset className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name"
                name="name"
                id="name1"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email"
                name="email"
                id="email1"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="mb-3">
              <input
                type="tel"
                className="form-control"
                placeholder="Your Phone"
                name="phone"
                id="phone1"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </fieldset>
            <fieldset className="mb-4">
              <textarea
                name="message"
                cols={30}
                rows={4}
                placeholder="I&apos;m interested in ..."
                id="message1"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </fieldset>
            
            <div className="action-buttons">
              <button 
                type="submit" 
                className="tf-btn bg-color-secondary pd-26 w-full mb-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Email'}
              </button>
              
              <div className="contact-buttons d-flex gap-3">
                <button 
                  type="button" 
                  className="tf-btn style-border pd-26 flex-fill"
                  onClick={handleCall}
                >
                  <i className="icon-phone"></i>
                  Call
                </button>
                <button 
                  type="button" 
                  className="tf-btn style-border pd-26 flex-fill"
                  onClick={handleWhatsApp}
                >
                  <i className="icon-message"></i>
                  WhatsApp
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
