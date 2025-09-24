"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { newsletterAPI } from "@/utils/api";
import { footerData } from "@/data/footerLinks";
export default function Footer2({ parentClass = "" }) {
  // Mobile footer links are now always visible, no need for toggle functionality

  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };

  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSuccess(false);
      handleShowMessage();
      return;
    }

    try {
      const response = await newsletterAPI.subscribeToNewsletter(email);

      // Success response from API
      e.target.reset(); // Reset the form
      setSuccess(true); // Set success state
      handleShowMessage();
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      
      // Handle specific error cases
      if (error.status === 409) {
        // Email already subscribed
        setSuccess(false);
      } else if (error.status === 400) {
        // Invalid email format
        setSuccess(false);
      } else {
        // General error
        setSuccess(false);
      }
      
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };

  return (
    <footer id="footer" className={parentClass}>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="footer-top" style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                gap: '20px',
                flexWrap: 'wrap'
              }}>
              <div className="footer-logo">
                <Link href={`/`}>
                  <Image
                    id="logo_footer"
                    alt="logo-footer"
                    width={120}
                    height={100}
                    src="/images/logo/Earlybird_Logo.png"
                  />
                </Link>
              </div>
              <div className="wrap-contact-item style-1" style={{ 
                display: 'flex', 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                flexWrap: 'wrap', 
                flex: 1,
                gap: '10px'
              }}>
                <div className="contact-item" style={{ minWidth: '250px', margin: '5px 0' }}>
                  <div className="icons">
                    <i className="icon-location-6" />
                  </div>
                  <div className="content">
                    <div className="title text-1">Office Address</div>
                    <h6>
                      <a href="#">
                        1st Floor Al Masraf Bank Al Qouze 1, sh. Zayed Road 3-A94
                        Office
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="contact-item" style={{ minWidth: '300px', margin: '5px 0' }}>
                  <div className="icons">
                    <i className="icon-phone-2" />
                  </div>
                  <div className="content">
                    <div className="title text-1">Call us</div>
                    <h6>
                      <a href="#"> +971 561615675</a><br />
                      <a href="#"> +971 566914193</a>
                    </h6>
                  </div>
                </div>
                <div className="contact-item" style={{ minWidth: '200px', margin: '5px 0' }}>
                  <div className="icons">
                    <i className="icon-letter-2" />
                  </div>
                  <div className="content">
                    <div className="title text-1">Email Address</div>
                    <h6 className="fw-4">
                      <a href="#">info@earlybirdsproperties.com</a>
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-main">
            <div className="row">
              <div className="footer-description col-lg-5 col-md-6">
                <h5 className="title text-white lh-30 mb-2">About Us</h5>
                <p className="text-1">
                  Welcome to EarlyBirds Properties, your trusted partner in the
                  dynamic world of Dubai real estate. We stand proud as a
                  leading real estate company with over a decade of unwavering
                  dedication and expertise.
                </p>
                <div className="wrap-social mt-5">
                  <div className="text-3 fw-6 text_white">Follow us</div>
                  <ul className="tf-social">
                    <li>
                      <a
                        href="https://web.facebook.com/Earlybirdproperties"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-fb" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.youtube.com/@EarlybirdProperties"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src="/icons/youtube-icon.svg"
                          alt="YouTube"
                          width="24"
                          height="24"
                          style={{ filter: "invert(1)" }}
                        />
                      </a>
                    </li>
                    <li>
                      <a
                        href="http://linkedin.com/in/earlybirds-managing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-linked" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/earlybirdsproperties"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-ins" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {footerData.map((column, index) => (
                <div className="col-lg-3 col-md-6" key={index}>
                  <div
                    className={`footer-menu-list footer-col-block ${
                      column.className || ""
                    }`}
                  >
                    <h5 className="title lh-30 title-desktop">
                      {column.title}
                    </h5>
                    <h5 className="title lh-30 title-mobile footer-heading-mobile">
                      {column.title}
                    </h5>
                    <ul className="tf-collapse-content">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          {link.href.startsWith("/") ? (
                            <Link href={link.href}>{link.text}</Link>
                          ) : (
                            <a href={link.href}>{link.text}</a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="col-lg-4 col-md-6">
                <div className="footer-menu-list newsletter">
                  <h5 className="title lh-30 mb-19">Newsletter</h5>
                  <div className="sib-form">
                    <div id="sib-form-container" className="sib-form-container">
                      <div
                        id="error-message"
                        className="sib-form-message-panel"
                      >
                        <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                          <svg
                            viewBox="0 0 512 512"
                            className="sib-icon sib-notification__icon"
                          >
                            <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
                          </svg>
                          <span className="sib-form-message-panel__inner-text">
                            Your subscription could not be saved. Please try
                            again.
                          </span>
                        </div>
                      </div>
                      <div
                        id="success-message"
                        className="sib-form-message-panel"
                      >
                        <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
                          <svg
                            viewBox="0 0 512 512"
                            className="sib-icon sib-notification__icon"
                          >
                            <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
                          </svg>
                          <span className="sib-form-message-panel__inner-text">
                            Your subscription has been successful.
                          </span>
                        </div>
                      </div>
                      <div
                        id="sib-container"
                        className="sib-container--large sib-container--vertical"
                      >
                        <div
                          className={`tfSubscribeMsg  footer-sub-element ${
                            showMessage ? "active" : ""
                          }`}
                        >
                          {success ? (
                            <p style={{ color: "rgb(52, 168, 83)" }}>
                              You have successfully subscribed to our newsletter.
                            </p>
                          ) : (
                            <p style={{ color: "red" }}>
                              Subscription failed. Please check your email and try again.
                            </p>
                          )}
                        </div>
                        <form onSubmit={sendEmail} id="sib-form">
                          <div className="sib-form-block">
                            <div className="sib-text-form-block">
                              <p className="text-1">
                                Sign up to receive the latest articles
                              </p>
                            </div>
                          </div>
                          <div className="sib-input sib-form-block mb-11">
                            <div className="form__entry entry_block">
                              <div className="form__label-row mb-10">
                                <fieldset className="entry__field">
                                <input
                                  className="input input-nl "
                                  type="email"
                                  id="EMAIL"
                                  name="email"
                                  autoComplete="email"
                                  placeholder="Your email address"
                                  data-required="true"
                                  required
                                />
                              </fieldset>
                              </div>
                              <label className="entry__error entry__error--primary"></label>
                            </div>
                          </div>
                          <div className="sib-form-block">
                            <button
                              className="sib-form-block__button sib-form-block__button-with-loader tf-btn bg-color-primary  w-full"
                              form="sib-form"
                              type="submit"
                            >
                              <svg
                                className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
                                viewBox="0 0 512 512"
                              >
                                <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                              </svg>
                              Subscribe
                            </button>
                          </div>
                          <div className="sib-optin sib-form-block">
                            <div className="form__entry entry_mcq">
                              <div className="form__label-row">
                                <div className="checkbox-item">
                                  <label className="mb-0">
                                    <span className="text-2 text-color-default">
                                      I have read and agree to the terms &amp;
                                      conditions
                                    </span>
                                    <input
                                      type="checkbox"
                                      className="input_replaced"
                                      defaultValue={1}
                                      id="OPT_IN"
                                      name="OPT_IN"
                                    />
                                    <span className="btn-checkbox" />
                                  </label>
                                </div>
                              </div>
                              <label className="entry__error entry__error--primary"></label>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        name="email_address_check"
                        defaultValue=""
                        className="input--hidden"
                      />
                      <input type="hidden" name="locale" defaultValue="en" />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="footer-bottom">
            <p>
              Copyright © {new Date().getFullYear()}{" "}
              <span className="fw-7">Earlybird Real Estate LLC.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
