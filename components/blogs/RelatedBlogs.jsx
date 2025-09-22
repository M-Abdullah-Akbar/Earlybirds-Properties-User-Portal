"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import { Pagination } from "swiper/modules";
import { blogAPI } from "@/utils/api";

export default function RelatedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured blogs
  const fetchFeaturedBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await blogAPI.getFeaturedBlogs(6);
      
      if (response.success) {
        setBlogs(response.data || []);
      } else {
        setError("Failed to load related posts");
      }
    } catch (err) {
      console.error("Error fetching featured blogs:", err);
      setError("Failed to load related posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedBlogs();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
    </div>
  );

  if (loading) {
    return (
      <section className="section-related-posts">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <h4 className="heading">Related posts</h4>
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || blogs.length === 0) {
    return null; // Don't show the section if there's an error or no blogs
  }

  return (
    <section className="section-related-blog tf-spacing-1 pt-0" aria-labelledby="related-blogs-heading">
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div className="heading-section text-center mb-48">
              <h2 id="related-blogs-heading" className="title text-anime-wave">
                Related Blogs
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loading ? (
              <div className="text-center py-5" role="status" aria-live="polite">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading related blogs...</span>
                </div>
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center" role="alert" aria-live="assertive">
                <p>{error}</p>
                <button 
                  className="btn btn-outline-primary mt-2"
                  onClick={fetchFeaturedBlogs}
                  aria-label="Retry loading related blogs"
                >
                  Try Again
                </button>
              </div>
            ) : blogs.length > 0 ? (
              <div className="swiper tf-sw-mobile" role="region" aria-label="Related blogs carousel">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={1}
                  pagination={{
                    clickable: true,
                    el: '.spd-related-blog'
                  }}
                  breakpoints={{
                    450: {
                      slidesPerView: 1,
                      spaceBetween: 15,
                    },
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                  }}
                  modules={[Pagination]}
                  className="swiper-wrapper"
                  role="list"
                  aria-label="Related blog posts"
                >
                  {blogs.map((blog) => (
                    <SwiperSlide key={blog._id} role="listitem">
                      <article className="blog-article-item hover-img">
                        <div className="image-wrap">
                          <Link 
                            href={`/blogs/${blog.slug || blog._id}`}
                            aria-label={`Read full article: ${blog.title}`}
                          >
                            <Image
                              className="lazyload"
                              alt={blog.title}
                              width={410}
                              height={317}
                              src={blog.featuredImage || "/images/blog-placeholder.jpg"}
                              loading="lazy"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <div className="meta">
                            {blog.category && (
                              <Link 
                                href={`/blogs?category=${blog.category._id}`} 
                                className="meta-item category"
                                aria-label={`View posts in ${blog.category.name} category`}
                              >
                                {blog.category.name}
                              </Link>
                            )}
                            <div className="meta-item date" role="text">
                              <span className="icon" aria-hidden="true">
                                <svg
                                  width={16}
                                  height={17}
                                  viewBox="0 0 16 17"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M4.5 2.5V4M11.5 2.5V4M2 13V5.5C2 5.10218 2.15804 4.72064 2.43934 4.43934C2.72064 4.15804 3.10218 4 3.5 4H12.5C12.8978 4 13.2794 4.15804 13.5607 4.43934C13.842 4.72064 14 5.10218 14 5.5V13M2 13C2 13.3978 2.15804 13.7794 2.43934 14.0607C2.72064 14.342 3.10218 14.5 3.5 14.5H12.5C12.8978 14.5 13.2794 14.342 13.5607 14.0607C13.842 13.7794 14 13.3978 14 13M2 13V8C2 7.60218 2.15804 7.22064 2.43934 6.93934C2.72064 6.65804 3.10218 6.5 3.5 6.5H12.5C12.8978 6.5 13.2794 6.65804 13.5607 6.93934C13.842 7.22064 14 7.60218 14 8V13"
                                    stroke="#A8ABAE"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                              <time 
                                dateTime={blog.createdAt}
                                aria-label={`Published on ${formatDate(blog.createdAt)}`}
                              >
                                {formatDate(blog.createdAt)}
                              </time>
                            </div>
                          </div>
                          <h3 className="title">
                            <Link 
                              href={`/blogs/${blog.slug || blog._id}`}
                              aria-label={`Read full article: ${blog.title}`}
                            >
                              {blog.title}
                            </Link>
                          </h3>
                          {blog.excerpt && (
                            <p className="excerpt" role="doc-subtitle">
                              {blog.excerpt.length > 120 
                                ? `${blog.excerpt.substring(0, 120)}...` 
                                : blog.excerpt
                              }
                            </p>
                          )}
                          <Link 
                            href={`/blogs/${blog.slug || blog._id}`} 
                            className="tf-btn style-border-line"
                            aria-label={`Read more about ${blog.title}`}
                          >
                            Read More
                            <i className="icon-arrow-right-add" aria-hidden="true" />
                          </Link>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div 
                  className="sw-pagination spd-related-blog justify-center" 
                  role="tablist" 
                  aria-label="Blog carousel pagination"
                />
              </div>
            ) : (
              <div className="text-center py-5" role="status">
                <p>No related blogs available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
