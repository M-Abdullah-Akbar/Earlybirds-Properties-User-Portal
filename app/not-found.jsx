import Cta from "@/components/common/Cta";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Page Not Found || Proty - Real Estate React Nextjs Template",
  description: "Proty - Real Estate React Nextjs Template",
};
export default function page() {
  return (
    <>
      <div id="wrapper" className="counter-scroll">
        <Header />
        <div className="main-content mt-20">
          <div className="page-content">
            <div className="tf-container tf-spacing-1 pt-0">
              <div className="error-404 text-center">
                <h1 className="mb-20 title">Oh no... We lost this page</h1>
                <p className="mb-40">
                  We searched everywhere but couldn’t find what you’re looking
                  for. Let’s find <br />a better place for you to go.
                </p>
                <Link
                  href={"/"}
                  className="tf-btn bg-color-primary rounded-4 pd-3 fw-6 mx-auto"
                >
                  Back to home
                </Link>
              </div>
            </div>
          </div>
        </div>

        <Footer parentClass="style-2" />
      </div>
    </>
  );
}
