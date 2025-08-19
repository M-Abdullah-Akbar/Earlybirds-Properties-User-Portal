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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send email using our API utility
      const response = await emailAPI.sendContactEmail({
        ...formData,
        recipient: "muhammedabdullahakbar@gmail.com" // You can set this as needed
      });

      if (response.success) {
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
      console.error("Error sending email:", error.response?.data || error.message || "An error occurred");
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
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your first name"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your last name"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </fieldset>
                </div>
                <div className="cols">
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
                  <fieldset>
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
                </div>
                <div className="cols">
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      Property Status
                    </label>
                    <DropdownSelect
                      options={["Select", "Buy", "Sell", "Rent", "Mortgage"]}
                      addtionalParentClass=""
                      defaultValue={formData.propertyStatus}
                      onChange={handlePropertyStatusChange}
                    />
                  </div>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      I am a
                    </label>
                    <DropdownSelect
                      options={["Select", "Buyer", "Seller", "Tenant", "Broker"]}
                      addtionalParentClass=""
                      defaultValue={formData.userInfo}
                      onChange={handleUserInfoChange}
                    />
                  </div>
                </div>
                <div className="cols">
                  <fieldset>
                    <label htmlFor="maxPrice">Max. Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Maximum price"
                      name="maxPrice"
                      id="maxPrice"
                      value={formData.maxPrice}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="minSize">Min. Size (Sq Ft):</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Minimum size in square feet"
                      name="minSize"
                      id="minSize"
                      value={formData.minSize}
                      onChange={handleChange}
                    />
                  </fieldset>
                </div>
                <div className="cols">
                  <fieldset>
                    <label htmlFor="bedrooms">Bedrooms:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Number of bedrooms"
                      name="bedrooms"
                      id="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                    />
                  </fieldset>
                  <fieldset>
                    <label htmlFor="bathrooms">Bathrooms:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Number of bathrooms"
                      name="bathrooms"
                      id="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleChange}
                    />
                  </fieldset>
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
