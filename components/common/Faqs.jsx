"use client"
//import Image from "next/image";
//import Link from "next/link";
import React, { useState } from "react";
import { areasInUaeFaqsData, buyFaqsData, rentFaqsData, sellFaqsData, offPlanFaqsData, faqsData } from "@/data/faqs";

export default function Faqs({ pageType = "areas-in-uae" }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Select the appropriate FAQ data based on page type
  const getFaqData = () => {
    switch(pageType) {
      case "buy":
        return buyFaqsData;
      case "rent":
        return rentFaqsData;
      case "sell":
        return sellFaqsData;
      case "off-plan":
        return offPlanFaqsData;
      case "faqs":
        return faqsData;
      default:
        return areasInUaeFaqsData;
    }
  };

  const fetchedFaqsData = getFaqData();

  // Split the FAQs into two columns
  const leftColumnFaqs = fetchedFaqsData.slice(0, Math.ceil(fetchedFaqsData.length / 2));
  const rightColumnFaqs = fetchedFaqsData.slice(Math.ceil(fetchedFaqsData.length / 2));

  return (
    <section className="section-faq py-80">
      <div className="tf-container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div className="heading-section text-center mb-48">
              <h2 className="title">Frequently Asked Questions</h2>
              <p className="text-color-4 fw-4 mt-16">Find answers to common questions about UAE real estate</p>
            </div>
            <div className="row">
              {/* Left Column */}
              <div className="col-lg-6">
                <div className="tf-faq mb-60">
                  <ul className="box-faq" id="wrapper-faq">
                    {leftColumnFaqs.map((faq, index) => {
                      const actualIndex = index;
                      return (
                        <li 
                          key={faq.id} 
                          className={`faq-item ${activeIndex === actualIndex ? 'active' : ''}`}
                        >
                          <a
                            href={`#accordion-faq-${faq.id}`}
                            className={`faq-header h6 ${activeIndex === actualIndex ? '' : 'collapsed'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleAccordion(actualIndex);
                            }}
                            aria-expanded={activeIndex === actualIndex}
                            aria-controls={`accordion-faq-${faq.id}`}
                          >
                            {faq.question}
                            <i className="icon-CaretDown" />
                          </a>
                          <div
                            id={`accordion-faq-${faq.id}`}
                            className={`collapse ${activeIndex === actualIndex ? 'show' : ''}`}
                          >
                            <p className="faq-body">
                              {faq.answer}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="col-lg-6">
                <div className="tf-faq mb-60">
                  <ul className="box-faq" id="wrapper-faq-2">
                    {rightColumnFaqs.map((faq, index) => {
                      const actualIndex = index + leftColumnFaqs.length;
                      return (
                        <li 
                          key={faq.id} 
                          className={`faq-item ${activeIndex === actualIndex ? 'active' : ''}`}
                        >
                          <a
                            href={`#accordion-faq-${faq.id}`}
                            className={`faq-header h6 ${activeIndex === actualIndex ? '' : 'collapsed'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleAccordion(actualIndex);
                            }}
                            aria-expanded={activeIndex === actualIndex}
                            aria-controls={`accordion-faq-${faq.id}`}
                          >
                            {faq.question}
                            <i className="icon-CaretDown" />
                          </a>
                          <div
                            id={`accordion-faq-${faq.id}`}
                            className={`collapse ${activeIndex === actualIndex ? 'show' : ''}`}
                          >
                            <p className="faq-body">
                              {faq.answer}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
