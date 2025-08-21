"use client";
import React from "react";

export default function Hero() {
  return (
    <div className="mt-5 mb-5">
      <div className="section-contact style-3">
        <div className="tf-container">
          <div className="row">
            <div className="col-md-6 flex items-center">
              <div className="content-left">
                <h2 className="text-color-heading title-section mb-4">Sell Your Property With Confidence</h2>
                <p className="text-1 text-color-default fw-4 mb-5">
                  Let our experts guide you through the selling process and help you get the best value for your property. We provide comprehensive market analysis and personalized selling strategies.
                </p>
                <div className="wrap-btn mt-5 mb-10">
                  <a
                    href="#"
                    className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle"
                  >
                    Get Free Valuation
                    <i className="icon-arrow-up-right" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <form
                className="form-get-in-touch"
                onSubmit={(e) => e.preventDefault()}
              >
                <h2 className="text-color-heading title-form fw-5 mb-0">
                  Get in touch
                </h2>
                <p className="text-1 text-color-default fw-3 split-text split-lines-transform">
                  We'll get to know you to understand your selling goals,
                  explain the selling process so you know what to expect.
                </p>
                <div className="grid-2">
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="name3">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      name="name"
                      id="name3"
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <label className="text-1 fw-6 mb-12" htmlFor="email3">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      name="Your email"
                      id="email3"
                      required
                    />
                  </fieldset>
                </div>
                <fieldset className="phone">
                  <label className="text-1 fw-6 mb-12" htmlFor="phone">
                    Phone number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your phone number"
                    name="phone"
                    id="phone"
                    required
                  />
                </fieldset>
                <fieldset>
                  <label className="text-1 fw-6 mb-12" htmlFor="message3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    cols={30}
                    rows={10}
                    placeholder="Your message"
                    id="message3"
                    required
                    defaultValue={""}
                  />
                </fieldset>
                <div className="wrap-btn">
                  <a
                    href="#"
                    className="tf-btn bg-color-primary pd-26 btn-border rounded-cycle"
                  >
                    Contact our experts
                    <i className="icon-arrow-up-right" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
