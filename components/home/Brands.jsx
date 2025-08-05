import BrandSlider from "../common/BrandSlider";
import React from "react";
import SplitTextAnimation from "../common/SplitTextAnimation";
export default function Brands() {
  return (
    <div className="tf-spacing-1">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-40">
              <h4 className="title text-color-heading fw-5 split-text effect-right">
                <SplitTextAnimation text="Partner With the Best" />
              </h4>
              <p className="text-1 text-color-default split-text split-lines-transform">
                We are proud to partner with some of the world’s leading real estate developers and investors. Our extensive network of industry connections allows us to curate investment opportunities that are not only secure but also remarkably lucrative. We remain dedicated to making your investments flourish and your financial dreams a tangible reality.
              </p>
            </div>
            <BrandSlider parentClass="infiniteslide wrap-partners" />
          </div>
        </div>
      </div>
    </div>
  );
}
