"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogAPI } from "@/utils/api";

export default function RelatedBlogs({ currentBlogId, limit = 3 }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch related blogs based on current blog
  const fetchRelatedBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let response;

      if (currentBlogId) {
        // Fetch blogs related to current blog by category/tags
        response = await blogAPI.getRelatedBlogs(currentBlogId, limit);
      } else {
        // Fallback to featured blogs if no current blog ID
        response = await blogAPI.getFeaturedBlogs(limit);
      }

      if (response.success) {
        // Handle different response structures
        const blogsData = response.data?.blogs || response.data || [];
        setBlogs(blogsData);
      } else {
        setError("Failed to load related posts");
      }
    } catch (err) {
      console.error("Error fetching related blogs:", err);
      setError("Failed to load related posts");
    } finally {
      setLoading(false);
    }
  }, [currentBlogId, limit]);

  useEffect(() => {
    fetchRelatedBlogs();
  }, [currentBlogId, limit, fetchRelatedBlogs]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
    <section
      className="section-related-posts"
      aria-labelledby="related-blogs-heading"
    >
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <h4 className="heading" id="related-blogs-heading">
              Related posts
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loading ? (
              <div
                className="text-center py-5"
                role="status"
                aria-live="polite"
              >
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">
                    Loading related blogs...
                  </span>
                </div>
              </div>
            ) : error ? (
              <div
                className="alert alert-danger text-center"
                role="alert"
                aria-live="assertive"
              >
                <p>{error}</p>
                <button
                  className="btn btn-outline-primary mt-2"
                  onClick={fetchRelatedBlogs}
                  aria-label="Retry loading related blogs"
                >
                  Try Again
                </button>
              </div>
            ) : blogs.length > 0 ? (
              <div
                className="grid-layout-3"
                role="region"
                aria-label="Related blogs grid"
              >
                {blogs.map((blog) => (
                  <article key={blog._id} className="blog-article-item style-3">
                    <div className="image-wrap">
                      <Link
                        href={`/blogs/${blog.slug || blog._id}`}
                        aria-label={`Read full article: ${blog.title}`}
                      >
                        <Image
                          className="lazyload"
                          alt={blog.title}
                          width={410}
                          height={280}
                          src={blog.images?.[0]?.url}
                          loading="lazy"
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "280px",
                          }}
                        />
                      </Link>
                      {blog.category && (
                        <div className="">
                          <Link
                            href={`/blogs?category=${blog.category._id}`}
                            aria-label={`View posts in ${blog.category.name} category`}
                          >
                            {blog.category.name}
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="time">
                      <span className="icon">
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
                      <p>
                        <time
                          dateTime={blog.createdAt}
                          aria-label={`Published on ${formatDate(
                            blog.createdAt
                          )}`}
                        >
                          {formatDate(blog.createdAt)}
                        </time>
                      </p>
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
                      <p className="description" role="doc-subtitle">
                        {blog.excerpt.length > 120
                          ? `${blog.excerpt.substring(0, 120)}...`
                          : blog.excerpt}
                      </p>
                    )}
                    <Link
                      href={`/blogs/${blog.slug || blog._id}`}
                      className="tf-btn-link"
                    >
                      <span> Read More </span>
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_2450_13860)">
                          <path
                            d="M10.0013 18.3334C14.6037 18.3334 18.3346 14.6024 18.3346 10C18.3346 5.39765 14.6037 1.66669 10.0013 1.66669C5.39893 1.66669 1.66797 5.39765 1.66797 10C1.66797 14.6024 5.39893 18.3334 10.0013 18.3334Z"
                            stroke="#bd8c31"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.66797 10H13.3346"
                            stroke="#bd8c31"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 13.3334L13.3333 10L10 6.66669"
                            stroke="#bd8c31"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_2450_13860">
                            <rect width={20} height={20} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </Link>
                  </article>
                ))}
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
