"use client";

import React, { useState } from "react";
import { emailAPI, uploadAPI, staticDataAPI, locationAPI } from "@/utils/api";
import { toast } from "react-toastify";

import DropdownSelect from "../common/DropdownSelect";

const InstantValuationForm = () => {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyStatus: "",
    propertyType: "",
    emirate: "",
    beds: "",
    size: "",
    price: "",
    images: [],
  });

  const [propertyTypes, setPropertyTypes] = useState([]);
  const [emirates, setEmirates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [errors, setErrors] = useState({});

  // Fetch property types and emirates on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyTypesResponse = await staticDataAPI.getPropertyTypes();
        if (propertyTypesResponse.success) {
          setPropertyTypes(propertyTypesResponse.data);
        }

        const emiratesResponse = await locationAPI.getEmirates();
        if (emiratesResponse.success) {
          setEmirates(emiratesResponse.data);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
        toast.error("Failed to load form data. Please refresh the page.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    // Create image objects with file references and previews
    const newImages = files.map((file) => ({
      file: file,
      preview: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handlePropertyStatusChange = (value) => {
    setFormData(prev => ({
      ...prev,
      propertyStatus: value
    }));
  };

  const handlePropertyTypeChange = (value) => {
    setFormData(prev => ({
      ...prev,
      propertyType: value
    }));
  };

  const handleEmirateChange = (value) => {
    setFormData(prev => ({
      ...prev,
      emirate: value
    }));
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.propertyStatus) {
      newErrors.propertyStatus = 'Please select a property status';
    }
    
    if (!formData.propertyType) {
      newErrors.propertyType = 'Please select a property type';
    }
    
    if (!formData.emirate) {
      newErrors.emirate = 'Please select an emirate';
    }
    
    if (!formData.beds) {
      newErrors.beds = 'Number of bedrooms is required';
    }
    
    if (!formData.size) {
      newErrors.size = 'Property size is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Expected price is required';
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
    setMessage({ type: "", text: "" });
    setErrors({});

    // Track form submission attempt - function removed to fix ReferenceError
    // trackContactForm('Instant Valuation Form', null, {
    //   propertyStatus: formData.propertyStatus,
    //   propertyType: formData.propertyType,
    //   emirate: formData.emirate,
    //   beds: formData.beds,
    //   size: formData.size,
    //   hasPrice: !!formData.price,
    //   hasImages: formData.images.length > 0,
    //   imageCount: formData.images.length,
    //   source: 'valuation_form'
    // });

    try {
      // First, upload images if any
      let uploadedImages = [];
      if (formData.images.length > 0) {
        const formDataImages = new FormData();
        formData.images.forEach((image) => {
          formDataImages.append("images", image.file);
        });

        try {
          // Upload images using the uploadAPI
          const uploadResponse = await uploadAPI.uploadImages(formDataImages);

          if (
            uploadResponse.success &&
            uploadResponse.data &&
            uploadResponse.data.images
          ) {
            uploadedImages = uploadResponse.data.images;
            console.log("Images uploaded successfully:", uploadedImages);
          } else {
            throw new Error("Failed to upload images");
          }
        } catch (uploadError) {
          console.error("Error uploading images:", uploadError);
          setMessage({
            type: "error",
            text: "Failed to upload images. Please try again.",
          });
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare valuation data for API
      const valuationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        propertyStatus: formData.propertyStatus,
        propertyType: formData.propertyType,
        emirate: formData.emirate,
        beds: formData.beds,
        size: formData.size,
        price: formData.price,
        images: uploadedImages,
        recipient: "info@earlybirdsproperties.com"
      };

      // Send the valuation request
      const response = await emailAPI.sendInstantValuationEmail(valuationData);

      if (response.success) {

        
        setMessage({
          type: "success",
          text: "Your valuation request has been sent successfully! We will get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          propertyStatus: "",
          propertyType: "",
          emirate: "",
          beds: "",
          size: "",
          price: "",
          images: [],
        });
      } else {

        
        setMessage({
          type: "error",
          text:
            response.error ||
            "Failed to send valuation request. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting valuation form:", error.message || "An error occurred");
      

      
      // Set user-friendly error message
      const errorMessage = error.message || 'Failed to send your valuation request. Please try again later.';
      setErrors({ general: errorMessage });
      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-contact mt-5 style-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-md-12">
            <form
              id="contactform"
              onSubmit={handleSubmit}
              className="form-contact"
            >
              {message.text && (
                <div
                  className={`message-box ${
                    message.type === "success" ? "success" : "error"
                  }`}
                >
                  <p>{message.text}</p>
                </div>
              )}
              {errors.general && (
                <div className="message-box error">
                  <p>{errors.general}</p>
                </div>
              )}
              <div className="heading-section text-center mb-4">
                <h2 className="title fw-bold mb-2" style={{ color: 'var(--Primary)' }}>Get an Instant Valuation</h2>
                <p style={{ color: 'var(--Text)' }}>Get a professional property valuation instantly. Fill out the form below and we'll provide you with an accurate market assessment.</p>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="name" className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Your Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Enter your full name"
                      style={{
                        backgroundColor: 'var(--Background)',
                        borderColor: 'var(--Border)',
                        color: 'var(--Text)'
                      }}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="email" className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter your email address"
                      style={{
                        backgroundColor: 'var(--Background)',
                        borderColor: 'var(--Border)',
                        color: 'var(--Text)'
                      }}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="phone" className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Phone Number:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Enter your phone number"
                      style={{
                        backgroundColor: 'var(--Background)',
                        borderColor: 'var(--Border)',
                        color: 'var(--Text)'
                      }}
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Property Status:</label>
                    <DropdownSelect
                      options={["Select", "Sale", "Rent", "Management"]}
                      addtionalParentClass={`${errors.propertyStatus ? 'error' : ''}`}
                      defaultValue={formData.propertyStatus || "Select"}
                      onChange={handlePropertyStatusChange}
                    />
                    {errors.propertyStatus && <span className="error-text">{errors.propertyStatus}</span>}
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Property Type:</label>
                      <DropdownSelect
                        options={["Select", ...propertyTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1))]}
                        addtionalParentClass={`${errors.propertyType ? 'error' : ''}`}
                        defaultValue={formData.propertyType ? formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1) : "Select"}
                        onChange={handlePropertyTypeChange}
                      />
                      {errors.propertyType && <span className="error-text">{errors.propertyType}</span>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Emirates:</label>
                      <DropdownSelect
                        options={["Select", ...emirates]}
                        addtionalParentClass={`${errors.emirate ? 'error' : ''}`}
                        defaultValue={formData.emirate || "Select"}
                        onChange={handleEmirateChange}
                      />
                      {errors.emirate && <span className="error-text">{errors.emirate}</span>}
                    </div>
                  </div>
                </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="beds" className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Number of Beds:</label>
                    <input
                      type="number"
                      id="beds"
                      name="beds"
                      value={formData.beds}
                      onChange={handleChange}
                      required
                      min="0"
                      max="10"
                      className={`form-control form-control-lg ${errors.beds ? 'is-invalid' : ''}`}
                      placeholder="Number of bedrooms"
                      style={{
                        backgroundColor: 'var(--Background)',
                        borderColor: 'var(--Border)',
                        color: 'var(--Text)'
                      }}
                    />
                    {errors.beds && <div className="invalid-feedback">{errors.beds}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="size" className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Size (Sq Ft.):</label>
                    <input
                      type="number"
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                      className={`form-control form-control-lg ${errors.size ? 'is-invalid' : ''}`}
                      placeholder="Size in square feet"
                      style={{
                        backgroundColor: 'var(--Background)',
                        borderColor: 'var(--Border)',
                        color: 'var(--Text)'
                      }}
                    />
                    {errors.size && <div className="invalid-feedback">{errors.size}</div>}
                  </div>
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="price" className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>Expected Price:</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      min="0"
                      className={`form-control form-control-lg ${errors.price ? 'is-invalid' : ''}`}
                      placeholder="Enter expected price"
                      style={{
                        backgroundColor: 'var(--Background)',
                        borderColor: 'var(--Border)',
                        color: 'var(--Text)'
                      }}
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label fw-semibold mb-2" style={{ color: 'var(--Heading)' }}>
                      Upload Property Images (Max 10)
                    </label>
                    <div className="upload-box">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="property-images"
                      />
                      <button
                        type="button"
                        className="btn btn-lg w-100"
                        onClick={() =>
                          document.getElementById("property-images").click()
                        }
                        style={{
                          backgroundColor: 'transparent',
                          borderColor: 'var(--Primary)',
                          color: 'var(--Primary)',
                          borderWidth: '2px'
                        }}
                      >
                        <i className="fas fa-upload me-2"></i>
                        Select Images
                      </button>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="gallery-box mt-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="image-box position-relative d-inline-block me-2 mb-2">
                            <img 
                              src={image.preview} 
                              alt={`Preview ${index}`} 
                              className="img-thumbnail"
                              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                              style={{ width: '25px', height: '25px', padding: '0', fontSize: '12px' }}
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 text-center">
                  <button
                    type="submit"
                    className="btn btn-lg px-5 py-3 fw-bold"
                    disabled={isSubmitting}
                    style={{ 
                      minWidth: '250px',
                      backgroundColor: 'var(--Primary)',
                      borderColor: 'var(--Primary)',
                      color: '#ffffff'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Submit Valuation Request
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstantValuationForm;
