"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { properties } from "@/data/properties";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
export default function Properties({ title }) {
  return (
    <section className="section-listing mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center ">
              <h2 className="title split-text effect-right">
                <SplitTextAnimation text={title} />
              </h2>
              {/*<p className="text-1 split-text split-lines-transform">
                Thousands of luxury home enthusiasts just like you visit our
                website.
              </p>*/}
            </div>
            <div
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-767"
              data-screen={767}
              data-preview={1}
              data-space={15}
            >
              <div className="swiper-wrapper tf-layout-mobile-md md-col-2  lg-col-3 ">
                {properties.map((property, i) => (
                  <div key={i} className="swiper-slide">
                    <div className="box-house hover-img ">
                      <div className="image-wrap">
                        <Link href={`/property-detail/${property.focusKeyword || property.slug || property._id || property.id}`}>
                          <Image
                            className="lazyload"
                            alt=""
                            src={property.imageSrc}
                            width={600}
                            height={401}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rj5m1leRPj4VCbdkVZeQBHNK9w7Q/rbj7SS6wzSM0k+RLkksSUdSeaUqfPDfTcn0OiPyMfM2srwA8/9k="
                          />
                        </Link>
                        <ul className="box-tag flex gap-8 ">
                          <li className="flat-tag text-4 bg-main fw-6 text_white">
                            Featured
                          </li>
                          <li className="flat-tag text-4 bg-3 fw-6 text_white">
                            For Sale
                          </li>
                        </ul>
                        {/*<div className="list-btn flex gap-8 ">
                          <a href="#" className="btn-icon save hover-tooltip">
                            <i className="icon-save" />
                            <span className="tooltip">Add Favorite</span>
                          </a>
                          <a href="#" className="btn-icon find hover-tooltip">
                            <i className="icon-find-plus" />
                            <span className="tooltip">Quick View</span>
                          </a>
                        </div>*/}
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <Link href={`/property-detail/${property.focusKeyword || property.slug || property._id || property.id}`}>
                            {property.title}
                          </Link>
                        </h5>
                        <p className="location text-1 line-clamp-1 ">
                          <i className="icon-location" /> {typeof property.location === 'string' ? property.location : 
                           property.location?.address || 
                           `${property.area || ''} ${property.emirate || ''}`.trim() || 
                           'Location not specified'}
                        </p>
                        <ul className="meta-list flex">
                          <li className="text-1 flex">
                            <span>{property.beds}</span>Beds
                          </li>
                          <li className="text-1 flex">
                            <span>{property.baths}</span>Baths
                          </li>
                          <li className="text-1 flex">
                            <span>{property.sqft}</span>Sqft
                          </li>
                        </ul>
                        <div className="bot flex justify-between items-center">
                          {/*<h5 className="price">
                            ${property.price.toLocaleString()}
                          </h5>*/}
                          <div className="wrap-btn flex">
                            {/*<a
                              href="#"
                              className="compare flex gap-8 items-center text-1"
                            >
                              <i className="icon-compare" />
                              Compare
                            </a>*/}
                            <Link
                              href={`/property-detail/${property.focusKeyword || property.slug || property._id || property.id}`}
                              className="tf-btn style-border pd-4"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="sw-pagination sw-pagination-mb-1 text-center d-lg-none d-block" />
            </div>
            <Swiper
              dir="ltr"
              className="swiper style-pagination tf-sw-mobile-1 sw-swiper-767"
              modules={[Pagination]}
              pagination={{
                clickable: true,
                el: ".spd446",
              }}
              spaceBetween={15}
            >
              {properties.map((property, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <div className="box-house hover-img ">
                    <div className="image-wrap">
                      <Link href={`/property-detail/${property.focusKeyword || property.slug || property._id || property.id}`}>
                        <Image
                          className="lazyload"
                          alt=""
                          src={property.imageSrc}
                          width={600}
                          height={401}
                        />
                      </Link>
                      <ul className="box-tag flex gap-8 ">
                        <li className="flat-tag text-4 bg-main fw-6 text_white">
                          Featured
                        </li>
                        <li className="flat-tag text-4 bg-3 fw-6 text_white">
                          For Sale
                        </li>
                      </ul>
                      <div className="list-btn flex gap-8 ">
                        <a href="#" className="btn-icon save hover-tooltip">
                          <i className="icon-save" />
                          <span className="tooltip">Add Favorite</span>
                        </a>
                        <a href="#" className="btn-icon find hover-tooltip">
                          <i className="icon-find-plus" />
                          <span className="tooltip">Quick View</span>
                        </a>
                      </div>
                    </div>
                    <div className="content">
                      <h5 className="title">
                        <Link href={`/property-detail/${property.focusKeyword || property.slug || property._id || property.id}`}>
                          {property.title}
                        </Link>
                      </h5>
                      <p className="location text-1 line-clamp-1 ">
                        <i className="icon-location" /> {typeof property.location === 'string' ? property.location : 
                         property.location?.address || 
                         `${property.area || ''} ${property.emirate || ''}`.trim() || 
                         'Location not specified'}
                      </p>
                      <ul className="meta-list flex">
                        <li className="text-1 flex">
                          <span>{property.beds}</span>Beds
                        </li>
                        <li className="text-1 flex">
                          <span>{property.baths}</span>Baths
                        </li>
                        <li className="text-1 flex">
                          <span>{property.sqft}</span>Sqft
                        </li>
                      </ul>
                      <div className="bot flex justify-between items-center">
                        <h5 className="price">
                          ${property.price.toLocaleString()}
                        </h5>
                        <div className="wrap-btn flex">
                          <a
                            href="#"
                            className="compare flex gap-8 items-center text-1"
                          >
                            <i className="icon-compare" />
                            Compare
                          </a>
                          <Link
                            href={`/property-detail/${property.focusKeyword || property.slug || property._id || property.id}`}
                            className="tf-btn style-border pd-4"
                          >
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              <div className="sw-pagination sw-pagination-mb-1 text-center d-lg-none d-block spd446" />
            </Swiper>
            <div className="text-center mt-5 flex justify-center">
              <Link href="/properties" className="tf-btn style-border pd-4">
                Load More Listings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
