import BrandSlider from "./BrandSlider";
import React from "react";
import SplitTextAnimation from "./SplitTextAnimation";

export default function CommonBrands({
  parentClass = "section-work-together style-2 mt-5",
  title = "Let's Work Together",
  description = "Thousands of luxury home enthusiasts just like you visit our website.",
  containerClass = "mt-5 mb-40",
  sliderCount = 2,
  reverseSecondSlider = true,
}) {
  return (
    <section className={parentClass}>
      <div className={containerClass ? containerClass : "wg-partner"}>
        <div className="tf-container">
          <div className="row">
            <div className="col-12 wrap-partners">
              <div className="heading-section text-center mb-48">
                <h2 className="title split-text effect-right">
                  <SplitTextAnimation text={title} />
                </h2>
                <p className="text-1 split-text effect-right">
                  <SplitTextAnimation text={description} />
                </p>
              </div>
              <BrandSlider parentClass="infiniteslide wrap-partners mb-40" />
              {sliderCount > 1 && (
                <BrandSlider
                  parentClass={`infiniteslide wrap-partners ${reverseSecondSlider ? 'partner-slider-reverse' : ''}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}