"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
// Swiper is automatically code-split by webpack config into its own chunk

export default function BrandSlider({
  parentClass = "infiniteslide wrap-partners mt-5",
}) {
  // Partner logos array with all available logos
  const partnerLogos = [
    {
      src: "/images/partner-logos/113119.png",
      alt: "Partner Logo",
      name: "Partner 1"
    },
    {
      src: "/images/partner-logos/Damac.png",
      alt: "Damac Properties",
      name: "Damac"
    },
    {
      src: "/images/partner-logos/Dubai-Properties-Logo.png",
      alt: "Dubai Properties",
      name: "Dubai Properties"
    },
    {
      src: "/images/partner-logos/Ellington-properties-Logo.png",
      alt: "Ellington Properties",
      name: "Ellington"
    },
    {
      src: "/images/partner-logos/Emaarr.png",
      alt: "Emaar Properties",
      name: "Emaar"
    },
    {
      src: "/images/partner-logos/Meraas-logo-svg.png",
      alt: "Meraas",
      name: "Meraas"
    },
    {
      src: "/images/partner-logos/Nakheel.png",
      alt: "Nakheel",
      name: "Nakheel"
    },
    {
      src: "/images/partner-logos/danube-properties-logo.png",
      alt: "Danube Properties",
      name: "Danube"
    },
    {
      src: "/images/partner-logos/sobha.png",
      alt: "Sobha Realty",
      name: "Sobha"
    },
    {
      src: "/images/partner-logos/tigergroup-1.png",
      alt: "Tiger Group",
      name: "Tiger Group"
    }
  ];

  return (
    <div className={parentClass}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={6}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              freeMode={true}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 6,
                  spaceBetween: 30,
                },
                1200: {
                  slidesPerView: 8,
                  spaceBetween: 40,
                },
              }}
              className="partner-slider"
            >
              {partnerLogos.map((logo, index) => (
                <SwiperSlide key={index} className="partner-item">
                  <div className="partner-logo-container">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={120}
                      height={80}
                      loading="lazy"
                      className="partner-logo"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .partner-logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 80px;
          padding: 10px;
          transition: all 0.3s ease;
        }
        
        .partner-logo-container:hover {
          transform: scale(1.05);
        }
        
        .partner-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          filter: grayscale(100%);
          transition: filter 0.3s ease;
        }
        
        .partner-logo:hover {
          filter: grayscale(0%);
        }
        
        .partner-item {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>
  );
};
