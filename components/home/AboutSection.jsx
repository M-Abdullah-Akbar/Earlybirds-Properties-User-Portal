"use client";
import React from "react";
import Image from "next/image";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
//import DropdownSelect from "@/components/common/DropdownSelect";
export default function LoanCalculator() {
  return (
    <>
      <section className="section-pre-approved mt-5">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 flex items-center">
              <div className="content">
                <div className="heading-section ">
                  <h2 className="title split-text effect-right">
                    <SplitTextAnimation text="Find, Buy & Own" />
                    <br />
                    <SplitTextAnimation text=" Your Dream Home" />
                  </h2>
                  <p className="text-1 split-text split-lines-transform">
                    Explore handpicked apartments, villas, penthouses, and
                    mansions — all designed to match your lifestyle. Your
                    perfect home is just a click away.
                  </p>
                </div>
                <div className="wrap-btn">
                  <a href="#" className="tf-btn bg-color-primary pd-6 fw-7">
                    Find More
                  </a>
                </div>
                {/*<form
                onSubmit={(e) => e.preventDefault()}
                className="form-pre-approved"
              >
                <div className="cols ">
                  <fieldset>
                    <label className=" text-1 fw-6 mb-12" htmlFor="amount">
                      Total Amount
                    </label>
                    <input type="number" id="amount" placeholder={1000} />
                  </fieldset>
                  <div className="wrap-input">
                    <fieldset className="payment">
                      <label className="text-1 fw-6 mb-12" htmlFor="payment">
                        Down Payment
                      </label>
                      <input type="number" id="payment" placeholder={2000} />
                    </fieldset>
                    <fieldset className="percent">
                      <input
                        className="input-percent"
                        type="text"
                        defaultValue="20%"
                      />
                    </fieldset>
                  </div>
                </div>
                <div className="cols">
                  <fieldset className="interest-rate">
                    <label className="text-1 fw-6 mb-12" htmlFor="interestRate">
                      Interest Rate
                    </label>
                    <input type="number" id="interestRate" placeholder={0} />
                  </fieldset>
                  <div className="select">
                    <label className="text-1 fw-6 mb-12">
                      Amortization Period (months)
                    </label>

                    <DropdownSelect
                      options={[
                        "Select amortization period",
                        "1 month",
                        "2 months",
                        "3 months",
                        "4 months",
                        "5 months",
                      ]}
                      addtionalParentClass=""
                    />
                  </div>
                </div>
                <div className="cols">
                  <fieldset>
                    <label className=" text-1 fw-6 mb-12" htmlFor="tax">
                      Property Tax
                    </label>
                    <input type="number" id="tax" placeholder="$3000" />
                  </fieldset>
                  <fieldset>
                    <label className=" text-1 fw-6 mb-12" htmlFor="insurance">
                      Home Insurance
                    </label>
                    <input type="number" id="insurance" placeholder="$3000" />
                  </fieldset>
                </div>
                <p className="text-1">
                  Your estimated monthly payment: <span>8000</span>
                </p>
                <div className="wrap-btn">
                  <a href="#" className="tf-btn bg-color-primary pd-6 fw-7">
                    Calculate now
                  </a>
                  <a href="#" className="tf-btn style-border pd-7 fw-7 ">
                    Start over
                  </a>
                </div>
              </form>*/}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="image-wrap img-animation wow animate__animated">
                <Image
                  className="lazyload parallax-img"
                  data-src="/images/happy-caucasian-family-holding-hands-and-going-fro-2024-10-18-08-39-45-utc (1).jpg"
                  alt=""
                  src="/images/happy-caucasian-family-holding-hands-and-going-fro-2024-10-18-08-39-45-utc (1).jpg"
                  width={400}
                  height={290}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section-pre-approved mt-5">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-6 order-lg-1 order-2">
              <div className="image-wrap img-animation wow animate__animated">
                <Image
                  className="lazyload parallax-img"
                  data-src="/images/835b26df-b5e7-4a36-9b65-afe3a7e8a3ac.jpg"
                  alt=""
                  src="/images/835b26df-b5e7-4a36-9b65-afe3a7e8a3ac.jpg"
                  width={400}
                  height={290}
                />
              </div>
            </div>
            <div className="col-lg-6 flex items-center order-lg-2 order-1">
              <div className="content">
                <div className="heading-section ">
                  <h2 className="title split-text effect-right">
                    <SplitTextAnimation text="Rental Homes for Everyone" />
                  </h2>
                  <p className="text-1 split-text split-lines-transform">
                    Discover a curated collection of premium rental properties —
                    from modern apartments to spacious villas — offering
                    comfort, style, and a refined lifestyle for every budget.
                  </p>
                </div>
                <div className="wrap-btn">
                  <a href="#" className="tf-btn bg-color-primary pd-6 fw-7">
                    Find More
                  </a>
                </div>
                {/*<form
              onSubmit={(e) => e.preventDefault()}
              className="form-pre-approved"
            >
              <div className="cols ">
                <fieldset>
                  <label className=" text-1 fw-6 mb-12" htmlFor="amount">
                    Total Amount
                  </label>
                  <input type="number" id="amount" placeholder={1000} />
                </fieldset>
                <div className="wrap-input">
                  <fieldset className="payment">
                    <label className="text-1 fw-6 mb-12" htmlFor="payment">
                      Down Payment
                    </label>
                    <input type="number" id="payment" placeholder={2000} />
                  </fieldset>
                  <fieldset className="percent">
                    <input
                      className="input-percent"
                      type="text"
                      defaultValue="20%"
                    />
                  </fieldset>
                </div>
              </div>
              <div className="cols">
                <fieldset className="interest-rate">
                  <label className="text-1 fw-6 mb-12" htmlFor="interestRate">
                    Interest Rate
                  </label>
                  <input type="number" id="interestRate" placeholder={0} />
                </fieldset>
                <div className="select">
                  <label className="text-1 fw-6 mb-12">
                    Amortization Period (months)
                  </label>

                  <DropdownSelect
                    options={[
                      "Select amortization period",
                      "1 month",
                      "2 months",
                      "3 months",
                      "4 months",
                      "5 months",
                    ]}
                    addtionalParentClass=""
                  />
                </div>
              </div>
              <div className="cols">
                <fieldset>
                  <label className=" text-1 fw-6 mb-12" htmlFor="tax">
                    Property Tax
                  </label>
                  <input type="number" id="tax" placeholder="$3000" />
                </fieldset>
                <fieldset>
                  <label className=" text-1 fw-6 mb-12" htmlFor="insurance">
                    Home Insurance
                  </label>
                  <input type="number" id="insurance" placeholder="$3000" />
                </fieldset>
              </div>
              <p className="text-1">
                Your estimated monthly payment: <span>8000</span>
              </p>
              <div className="wrap-btn">
                <a href="#" className="tf-btn bg-color-primary pd-6 fw-7">
                  Calculate now
                </a>
                <a href="#" className="tf-btn style-border pd-7 fw-7 ">
                  Start over
                </a>
              </div>
            </form>*/}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
