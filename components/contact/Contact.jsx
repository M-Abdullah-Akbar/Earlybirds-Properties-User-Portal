"use client";
import React, { useState } from "react";
import DropdownSelect from "../common/DropdownSelect";
import axios from "axios";
//import MapComponent from "../common/MapComponent";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "Select",
    message: ""
  });
  const [success, setSuccess] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (value) => {
    setFormData(prev => ({
      ...prev,
      interest: value
    }));
  };

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send email using a service or API
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/send-email",
        {
          to: "muhammedabdullahakbar@gmail.com",
          subject: `Contact Form: ${formData.interest} Inquiry from ${formData.name}`,
          html: `
            <h2>Contact Form Submission</h2>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Interest:</strong> ${formData.interest}</p>
            <p><strong>Message:</strong> ${formData.message}</p>
          `
        }
      );

      if ([200, 201].includes(response.status)) {
        setFormData({
          name: "",
          email: "",
          phone: "",
          interest: "Select",
          message: ""
        });
        setSuccess(true);
        handleShowMessage();
      } else {
        setSuccess(false);
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error sending email:", error.response?.data || "An error occurred");
      setSuccess(false);
      handleShowMessage();
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
                <div className="heading-section">
                  <h2 className="title">We Would Love to Hear From You</h2>
                  <p className="text-1">
                    We'll get to know you to understand your selling goals,
                    explain the selling process so you know what to expect.
                  </p>
                </div>
                <div className="cols">
                  <fieldset>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      id="email-contact"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                </div>
                <div className="cols">
                  <fieldset className="phone">
                    <label htmlFor="phone">Phone number:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your phone number"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      What are you interested in?
                    </label>

                    <DropdownSelect
                      options={["Select", "Rent", "Sale"]}
                      addtionalParentClass=""
                      defaultValue={formData.interest}
                      onChange={handleInterestChange}
                    />
                  </div>
                </div>
                <fieldset>
                  <label htmlFor="message">Your Message:</label>
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </fieldset>
                <div className="send-wrap">
                  <button
                    className="tf-btn bg-color-primary fw-7 pd-8"
                    type="submit"
                  >
                    Contact our experts
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
