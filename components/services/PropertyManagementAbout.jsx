"use client";
import ServiceAbout from "@/components/common/ServiceAbout";

export default function PropertyManagementAbout() {
  return (
    <ServiceAbout
      title="Property Management"
      description={[
        "Managing a property is very stressful. But we make it problem-free for you. From tenant searching and rent collection to normal maintenance and compliance with the law. We deal with everything so that your property remains profitable and in good condition at all times.",
      ]}
      imagePath1="/images/section/section-about-5.jpg"
      parentClass="tf-spacing-7 pt-0 mt-5"
      imageAlt="Property Management in Dubai"
    />
  );
}
