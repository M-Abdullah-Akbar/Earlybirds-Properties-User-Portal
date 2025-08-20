"use client";
import ServiceAbout from "@/components/common/ServiceAbout";

export default function MortgageAbout() {
  return (
    <ServiceAbout
      title="Mortgage Services"
      description={[
        "We make property financing more accessible with our guidance. We offer access to reliable lenders, competitive mortgage schemes, and step-by-step assistance through the approval process. We make sure to enable property ownership to be smooth and reachable to all."
      ]}
      imagePath1="/images/section/section-about-5.jpg"
      parentClass="tf-spacing-7 pt-0 mt-5"
      imageAlt="Mortgage Services in Dubai"
      additionalContent="Unlock your Dream Home!"
    />
  );
}

