import React from "react";
import CommonBrands from "./CommonBrands";

export default function Brands({
  parentClass = "section-work-together style-2 mt-5",
}) {
  return (
    <CommonBrands
      parentClass={parentClass}
      title="Let's Work Together"
      description="Thousands of luxury home enthusiasts just like you visit our website."
      containerClass="wg-partner"
      sliderCount={2}
      reverseSecondSlider={true}
    />
  );
}

