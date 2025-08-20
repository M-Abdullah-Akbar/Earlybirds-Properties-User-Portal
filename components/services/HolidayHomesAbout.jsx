"use client";
import ServiceAbout from "@/components/common/ServiceAbout";

export default function HolidayHomesAbout() {
  return (
    <ServiceAbout
      title="Holiday Homes"
      description={[
        "Are you seeking a vacation home or short-term? Our holiday homes are picked with care, furnished to the highest standard, and in prime locations for ultimate comfort and convenience. Whether you're on a family break or a business trip, we ensure you feel at home."
      ]}
      imagePath="/images/section/section-about-5.jpg"
      secondImagePath="/images/section/section-about-6.jpg"
      videoId="XHOmBV4js_E"
      parentClass="tf-spacing-7 pt-0 mt-5"
      imageAlt="Holiday Homes in Dubai"
      videoButtonText="Learn more about holiday homes"
      additionalContent="Maximize your returns with Holiday Homes in Dubai"
    />
  );
}
