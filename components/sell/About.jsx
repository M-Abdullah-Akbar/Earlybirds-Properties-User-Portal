import React from "react";
import CommonAbout from "@/components/common/CommonAbout";

export default function About() {
  const sellData = {
    title: "Sell Your Property in Dubai with Early Bird Properties",
    description: [
      "Looking to sell your Dubai property? Early Bird Properties provides a combination of experience, marketplace exposure, and customized services. We help you receive the maximum possible return on your property. By selling through us, you will enjoy our expert marketing methods, strong, quick, easy, and hassle-free sales process.",
      "Contact Early Bird Properties today to list your Dubai property."
    ],
    sections: [
      {
        title: "List Your Property Exclusively with Early Bird Properties",
        description: "Early Bird Properties is known for achieving exceptional results. Our deep understanding of the market enables us to deliver top sale values by protecting your return on investment. We give your property the exposure it deserves and connect you with serious buyers."
      },
      {
        title: "Our Services",
        description: "When you list with Early Bird Properties, you become eligible for a range of exclusive benefits that are meant to help you sell your property profitably and quickly.",
        listItems: [
          { title: "1. Verified Buyers Only", content: "We deal only with potential buyers, so you deal only with serious prospects." },
          { title: "2. Effective Marketing", content: "Your property is listed with graphics, write-ups and offers on popular websites." },
          { title: "3. Wide Exposure", content: "We place your listing where it will stand out most among the best property websites." },
          { title: "4. Legal Process Made Easy", content: "Our team handles all the legal processes and keeps it easy to sell for you." },
          { title: "5. Broker Support at Every Step", content: "Our agents guide you throughly and negotiate to help you achieve the best outcome." },
          { title: "6. Mortgage Advice", content: "If your property is being mortgaged, our advice panel negotiates with banks to make the process easy." },
          { title: "7. Complete Confidentiality", content: "We protect your privacy and ensure confidentiality for both you and prospective buyers throughout the selling process." }
        ]
      },
      {
        title: "Why use Early Bird Properties?",
        listItems: [
          { content: "Proven success in accurate property valuation and ROI protection" },
          { content: "Seasoned, dedicated marketing staff for maximum property exposure" },
          { content: "Large number of repeat clients who continuously return for fresh investments" },
          { content: "Organized handling of tenant relations to facilitate stress-free property viewings" }
        ]
      }
    ],
    parentClass: "section-pre-approved mt-5"
  };

  return <CommonAbout {...sellData} />;
}