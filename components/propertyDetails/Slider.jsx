"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Gallery, Item } from "react-photoswipe-gallery";
import { Navigation } from "swiper/modules";
// Swiper is automatically code-split by webpack config into its own chunk

export default function Slider4({ property }) {
  // Use images from property data if available, otherwise use fallback
  const images = property?.images && property.images.length > 0 
    ? property.images.map(img => ({
        src: img.url,
        alt: img.alt || property.title || "Property Image",
      }))
    : [
        {
          src: "/images/section/property-details-v2-1.jpg",
          alt: property?.title || "Property Image",
        },
        { src: "/images/section/property-details-v3-1.jpg", alt: property?.title || "Property Image" },
        { src: "/images/section/property-details-v3-2.jpg", alt: property?.title || "Property Image" },
        { src: "/images/section/property-details-v3-3.jpg", alt: property?.title || "Property Image" },
        { src: "/images/section/property-details-v3-4.jpg", alt: property?.title || "Property Image" },
        { src: "/images/section/property-details-v3-5.jpg", alt: property?.title || "Property Image" },
      ];

  return (
    <div className="single-property-gallery">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <Gallery>
              <Swiper
                dir="ltr"
                className="swiper sw-thumbs-sigle"
                modules={[Navigation]}
                navigation={{
                  prevEl: ".snbp1",
                  nextEl: ".snbn1",
                }}
              >
                {images.map((elm, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <Item
                      original={elm.src}
                      thumbnail={elm.src}
                      width={1280}
                      height={680}
                      content={
                        <div className="pswp-img-container">
                          <Image 
                            src={elm.src} 
                            alt={elm.alt} 
                            width={1280}
                            height={680}
                            style={{ maxWidth: '100%', height: 'auto' }} 
                            crossOrigin="anonymous"
                          />
                        </div>
                      }
                    >
                      {({ ref, open }) => (
                        <a
                          onClick={open}
                          data-fancybox="gallery"
                          className="image-wrap relative d-block"
                        >
                          <Image
                            ref={ref}
                            className="lazyload"
                            alt={elm.alt}
                            src={elm.src}
                            width={1280}
                            height={680}
                            priority={i === 0} // Add priority to first image (LCP)
                            loading={i === 0 ? "eager" : "lazy"}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1280px"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                            style={{ width: '100%', height: 'auto' }} // Maintain aspect ratio
                          />
                        </a>
                      )}
                    </Item>
                  </SwiperSlide>
                ))}

                <div className="swiper-button-prev sw-button style-2 sw-thumbs-prev snbp1">
                  <i className="icon-arrow-left-1" />
                </div>
                <div className="swiper-button-next sw-button style-2 sw-thumbs-next snbn1">
                  <i className="icon-arrow-right-1" />
                </div>
              </Swiper>
            </Gallery>
          </div>
        </div>
      </div>
    </div>
  );
}
