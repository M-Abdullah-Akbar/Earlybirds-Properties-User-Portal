import Blogs2 from "@/components/blogs/Blogs2";
//import Breadcumb from "@/components/common/Breadcumb";
//import Cta from "@/components/common/Cta";
import Footer from "@/components/footer/Footer";
import Header from "@/components/headers/Header";
import React from "react";

export const metadata = {
  title: "Blogs || Earlybirds Properties",
  description: "Earlybirds Properties - Blogs",
};
export default function page() {
  return (
    <>
      <div id="wrapper">
        <Header />
        <div className="main-content">
          {/*<Breadcumb pageName="Blog Grid" />*/}
          <Blogs2 />
          {/*<Cta />*/}
        </div>
        <Footer parentClass="style-2" />
      </div>
    </>
  );
}