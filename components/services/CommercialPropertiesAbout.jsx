"use client";
import ServiceAbout from "@/components/common/ServiceAbout";

export default function CommercialPropertiesAbout() {
  return (
    <ServiceAbout
      title="Commercial Properties"
      description={[
        "We deal with suitable commercial properties. Be it an office, showroom, or retail store, we find properties that provide optimal locations, high growth prospects, and full visibility to boost your business."
      ]}
      imagePath="/images/section/section-about-5.jpg"
      secondImagePath="/images/section/section-about-6.jpg"
      videoId="XHOmBV4js_E"
      parentClass="tf-spacing-7 pt-0 mt-5"
      imageAlt="Commercial Properties in Dubai"
      videoButtonText="Learn more about commercial properties"
      additionalContent="Commercial Properties"
    />
  );
}
