"use client";
import React, { useState } from "react";
import Image from "next/image";
import { emailAPI, uploadAPI, staticDataAPI, locationAPI } from "@/utils/api";
import { toast } from "react-toastify";

import DropdownSelect from "../common/DropdownSelect";

export default function Hero() {
  
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
    //   source: 'sell_hero_form'
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
    <div className="mt-5 mb-5">
      <div className="section-contact style-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-6 flex items-center">
              {/*<div className="content-left">
                <h2 className="text-color-heading title-section mb-4">Sell Your Property With Confidence</h2>
                <p className="text-1 text-color-default fw-4 mb-5">
                  Let our experts guide you through the selling process and help you get the best value for your property. We provide comprehensive market analysis and personalized selling strategies.
                </p>
                <div className="wrap-btn mt-5 mb-10">
                  <a
                    href="/instant-valuation"
                    className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle"
                  >
                    Get Instant Valuation
                    <i className="icon-arrow-up-right" />
                  </a>
                </div>
              </div>*/}
            </div>
            <div className="col-md-6">
              <form
                className="form-get-in-touch"
                onSubmit={handleSubmit}
              >
                {message.text && (
                  <div
                    className={`alert ${
                      message.type === "success" ? "alert-success" : "alert-danger"
                    } mb-3`}
                  >
                    {message.text}
                  </div>
                )}
                {errors.general && (
                  <div className="alert alert-danger mb-3">
                    {errors.general}
                  </div>
                )}
                <h2 className="text-color-heading title-form fw-5 mb-0">
                  Get an Instant Valuation
                </h2>
                <p className="text-1 text-color-default fw-3 split-text split-lines-transform">
                  Get a professional property valuation instantly. Fill out the form below and we&apos;ll provide you with an accurate market assessment.
                </p>
                <div className="grid-2">
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="name3">
                      Name
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      placeholder="Your name"
                      name="name"
                      id="name3"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </fieldset>
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="email3">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Your email"
                      name="email"
                      id="email3"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </fieldset>
                </div>
                <div className="grid-2">
                  <fieldset className="phone">
                    <label className="text-1 fw-6 mb-12" htmlFor="phone">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="Your phone number"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </fieldset>
                  <fieldset>
                    <label className="text-1 fw-6 mb-12">
                      Property Status
                    </label>
                    <DropdownSelect
                      options={["Select", "Sale", "Rent", "Management"]}
                      addtionalParentClass={`${errors.propertyStatus ? 'error' : ''}`}
                      defaultValue={formData.propertyStatus || "Select"}
                      onChange={handlePropertyStatusChange}
                    />
                    {errors.propertyStatus && <span className="error-text">{errors.propertyStatus}</span>}
                  </fieldset>
                </div>
                <div className="grid-2">
                  <fieldset>
                    <label className="text-1 fw-6 mb-12">
                      Property Type
                    </label>
                    <DropdownSelect
                      options={["Select", ...propertyTypes.map(type => type.charAt(0).toUpperCase() + type.slice(1))]}
                      addtionalParentClass={`${errors.propertyType ? 'error' : ''}`}
                      defaultValue={formData.propertyType ? formData.propertyType.charAt(0).toUpperCase() + formData.propertyType.slice(1) : "Select"}
                      onChange={handlePropertyTypeChange}
                    />
                    {errors.propertyType && <span className="error-text">{errors.propertyType}</span>}
                  </fieldset>
                  <fieldset>
                    <label className="text-1 fw-6 mb-12">
                      Emirates
                    </label>
                    <DropdownSelect
                      options={["Select", ...emirates]}
                      addtionalParentClass={`${errors.emirate ? 'error' : ''}`}
                      defaultValue={formData.emirate || "Select"}
                      onChange={handleEmirateChange}
                    />
                    {errors.emirate && <span className="error-text">{errors.emirate}</span>}
                  </fieldset>
                </div>
                <div className="grid-2">
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="beds">
                      Number of Beds
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.beds ? 'is-invalid' : ''}`}
                      placeholder="Number of bedrooms"
                      name="beds"
                      id="beds"
                      value={formData.beds}
                      onChange={handleChange}
                      min="0"
                      max="10"
                      required
                    />
                    {errors.beds && <div className="invalid-feedback">{errors.beds}</div>}
                  </fieldset>
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="size">
                      Size (Sq Ft.)
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.size ? 'is-invalid' : ''}`}
                      placeholder="Size in square feet"
                      name="size"
                      id="size"
                      value={formData.size}
                      onChange={handleChange}
                      required
                    />
                    {errors.size && <div className="invalid-feedback">{errors.size}</div>}
                  </fieldset>
                </div>
                <div className="grid-2">
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="price">
                      Expected Price
                    </label>
                    <input
                      type="number"
                      className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                      placeholder="Enter expected price"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      min="0"
                      required
                    />
                    {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                  </fieldset>
                  <fieldset>
                    <label className="text-1 fw-6 mb-12">
                      Upload Images (Max 10)
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
                        className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle w-100"
                        onClick={() =>
                          document.getElementById("property-images").click()
                        }
                      >
                        <i className="fas fa-upload me-2"></i>
                        Select Images
                      </button>
                    </div>
                    {formData.images.length > 0 && (
                      <div className="gallery-box mt-3">
                        {formData.images.map((image, index) => (
                          <div key={index} className="image-box position-relative d-inline-block me-2 mb-2">
                            <Image 
                              src={image.preview} 
                              alt={`Preview ${index}`} 
                              className="img-thumbnail"
                              width={60}
                              height={60}
                              style={{ objectFit: 'cover' }}
                            />
                            <button
                              type="button"
                              className="btn btn-danger btn-sm position-absolute top-0 end-0 rounded-circle"
                              style={{ width: '20px', height: '20px', padding: '0', fontSize: '10px' }}
                              onClick={() => removeImage(index)}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </fieldset>
                </div>

                <div className="wrap-btn">
                  <button
                    type="submit"
                    className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Instant Valuation
                        <i className="icon-arrow-up-right" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
