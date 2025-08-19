"use client";

import React, { useState } from "react";
import { emailAPI, uploadAPI, staticDataAPI, locationAPI } from "@/utils/api";
import { toast } from "react-toastify";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

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
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        propertyStatus: formData.propertyStatus,
        propertyType: formData.propertyType,
        emirate: formData.emirate,
        beds: formData.beds,
        size: formData.size,
        price: formData.price,
        images: uploadedImages,
      };

      // Send the valuation request
      const response = await emailAPI.sendInstantValuationEmail({
        ...valuationData,
        recipient: "muhammedabdullahakbar@gmail.com" // Set the recipient email address
      });

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
      console.error("Error submitting valuation form:", error);
      setMessage({
        type: "error",
        text: "An error occurred. Please try again later.",
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
              <div className="heading-section">
                <h2 className="title">Get an Instant Valuation</h2>
              </div>
              <div className="cols">
                <fieldset>
                  <label htmlFor="name">Your Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </fieldset>
              </div>
              <div className="cols">
                <fieldset>
                  <label htmlFor="phone">Phone Number:</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                  />
                </fieldset>
                <div className="select">
                  <label className="text-1 fw-6 mb-12">Property Status</label>
                  <select
                    className="nice-select"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="sale">Sale</option>
                    <option value="rent">Rent</option>
                    <option value="management">Management</option>
                  </select>
                </div>
              </div>
              <div className="cols">
                <div className="select">
                  <label className="text-1 fw-6 mb-12">Property Type</label>
                  <select
                    className="nice-select"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="select">
                  <label className="text-1 fw-6 mb-12">Emirates</label>
                  <select
                    className="nice-select"
                    name="emirate"
                    value={formData.emirate}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    {emirates.map((emirate, index) => (
                      <option key={index} value={emirate}>
                        {emirate}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="cols">
                <fieldset>
                  <label htmlFor="beds">Bedrooms:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="beds"
                    id="beds"
                    value={formData.beds}
                    onChange={handleChange}
                    placeholder="Number of Bedrooms"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label htmlFor="size">Size (Sq Ft.):</label>
                  <input
                    type="number"
                    className="form-control"
                    name="size"
                    id="size"
                    value={formData.size}
                    onChange={handleChange}
                    placeholder="Size in square feet"
                    required
                  />
                </fieldset>
              </div>
              <div className="cols">
                <fieldset>
                  <label htmlFor="price">Expected Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    id="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Expected Price"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="text-1 fw-6 mb-12">
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
                      className="tf-btn p-3 bg-color-primary fw-7"
                      onClick={() =>
                        document.getElementById("property-images").click()
                      }
                    >
                      Select Images
                    </button>
                  </div>
                  {formData.images.length > 0 && (
                    <div className="gallery-box">
                      {formData.images.map((image, index) => (
                        <div key={index} className="image-box">
                          <img src={image.preview} alt={`Preview ${index}`} />
                          <button
                            type="button"
                            className="close-btn"
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
              <div className="row">
                <div className="col-12 center">
                  <button
                    type="submit"
                    className="tf-btn p-3 bg-color-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Valuation Request"}
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
