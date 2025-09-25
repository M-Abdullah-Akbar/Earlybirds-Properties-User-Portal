"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogAPI, blogCategoryAPI } from "@/utils/api";
import { renderTiptapJson } from "@/utils/tiptap-html-renderer";
import Sidebar from "../propertyDetails/Sidebar";

export default function BlogDetails({ blogId }) {
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blog details
  const fetchBlogDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await blogAPI.getBlogById(blogId);

      if (response.success) {
        const blogData = response.data.blog;

        // Process tags - simplified since backend now sends clean data
        if (blogData.tags && Array.isArray(blogData.tags)) {
          blogData.tags = blogData.tags.filter(
            (tag) => tag && typeof tag === "string" && tag.trim().length > 0
          );
        } else {
          blogData.tags = [];
        }

        setBlog(blogData);
      } else {
        setError("Blog not found");
      }
    } catch (err) {
      console.error("Error fetching blog details:", err);
      setError("Failed to load blog. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  // Fetch featured blogs
  const fetchFeaturedBlogs = async (categoryId, excludeBlogId) => {
    try {
      const response = await blogAPI.getFeaturedBlogs(4);

      if (response.success) {
        const blogsData = response.data?.blogs || response.data || [];
        // Filter out current blog if it exists in featured blogs
        const filteredBlogs = blogsData.filter(
          (blog) => blog._id !== excludeBlogId
        );
        setFeaturedBlogs(filteredBlogs);
      }
    } catch (err) {
      console.error("Error fetching featured blogs:", err);
    }
  };

  // Fetch categories for sidebar
  const fetchCategories = async () => {
    try {
      const response = await blogCategoryAPI.getCategories();
      console.log("Categories response:", response);
      if (
        response.success &&
        response.data &&
        Array.isArray(response.data.categories)
      ) {
        console.log("Categories data:", response.data.categories);
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    if (blogId) {
      fetchBlogDetails();
      fetchCategories();
    }
  }, [blogId, fetchBlogDetails]);

  // Separate useEffect to fetch related content after blog details are loaded
  useEffect(() => {
    if (blog && blog._id) {
      // Fetch featured blogs
      fetchFeaturedBlogs(blog.category?._id, blog._id);
    }
  }, [blog]);

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
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
  );

  // Error component
  const ErrorMessage = ({ message, onRetry }) => (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4 fs-5">{message}</div>
      <button onClick={onRetry} className="tf-btn-primary">
        Try Again
      </button>
    </div>
  );

  if (loading) {
    return (
      <section className="section-blog-details mt-5">
        <div className="tf-container">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="section-blog-details mt-5">
        <div className="tf-container">
          <ErrorMessage message={error} onRetry={fetchBlogDetails} />
        </div>
      </section>
    );
  }

  if (!blog) {
    return (
      <section className="section-blog-details mt-5">
        <div className="tf-container">
          <div className="text-center py-5">
            <div className="text-muted fs-5">Blog not found.</div>
            <Link href="/blogs" className="tf-btn-link mt-3">
              Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-blog-details mt-5">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-8">
            <article role="main" aria-labelledby="blog-title">
              <header className="heading">
                <h2 id="blog-title" className="title-heading">
                  {blog.title}
                </h2>
                <div className="meta flex flex-wrap gap-3" role="contentinfo">
                  {blog.author && (
                    <div className="meta-item flex align-center">
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M14.25 15.75V14.25C14.25 13.4544 13.9339 12.6913 13.3713 12.1287C12.8087 11.5661 12.0456 11.25 11.25 11.25H6.75C5.95435 11.25 5.19129 11.5661 4.62868 12.1287C4.06607 12.6913 3.75 13.4544 3.75 14.25V15.75"
                          stroke="#A8ABAE"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z"
                          stroke="#A8ABAE"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p
                        className="text-color-primary"
                        aria-label={`Author: ${
                          blog.author.name || blog.author
                        }`}
                      >
                        {blog.author.name || blog.author}
                      </p>
                    </div>
                  )}

                  {blog.category && (
                    <div className="meta-item flex align-center">
                      <svg
                        width={18}
                        height={18}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M15 15C15.3978 15 15.7794 14.842 16.0607 14.5607C16.342 14.2794 16.5 13.8978 16.5 13.5V6C16.5 5.60218 16.342 5.22064 16.0607 4.93934C15.7794 4.65804 15.3978 4.5 15 4.5H9.075C8.82414 4.50246 8.57666 4.44196 8.35523 4.32403C8.13379 4.20611 7.94547 4.03453 7.8075 3.825L7.2 2.925C7.06342 2.7176 6.87748 2.54736 6.65887 2.42955C6.44027 2.31174 6.19583 2.25004 5.9475 2.25H3C2.60218 2.25 2.22064 2.40804 1.93934 2.68934C1.65804 2.97064 1.5 3.35218 1.5 3.75V13.5C1.5 13.8978 1.65804 14.2794 1.93934 14.5607C2.22064 14.842 2.60218 15 3 15H15Z"
                          stroke="#A8ABAE"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p
                        className="text-color-primary"
                        aria-label={`Category: ${blog.category.name}`}
                      >
                        {blog.category.name}
                      </p>
                    </div>
                  )}

                  <div className="meta-item flex align-center">
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
                    <time
                      dateTime={blog.createdAt}
                      aria-label={`Published on ${formatDate(blog.createdAt)}`}
                    >
                      {formatDate(blog.createdAt)}
                    </time>
                  </div>
                </div>
              </header>

              {/* Excerpt */}
              {blog.excerpt && (
                <p
                  className="fw-5 text-color-heading mb-30"
                  role="doc-subtitle"
                >
                  {blog.excerpt}
                </p>
              )}

              {/* Featured Image */}
              {blog.images?.[0]?.url && (
                <figure className="image-wrap mb-30">
                  <Image
                    className="lazyload"
                    alt={blog.title}
                    width={840}
                    height={473}
                    src={blog.images?.[0]?.url}
                    loading="lazy"
                  />
                </figure>
              )}

              {/* Blog Content */}
              <div className="wrap-content mb-20" role="doc-content">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{
                    __html: blog.content
                      ? renderTiptapJson(blog.content)
                      : "<p>No content available</p>",
                  }}
                />
              </div>

              {/* Tags and Social Share */}
              <footer className="tag-wrap flex flex-column flex-md-row justify-between items-start items-md-center gap-3">
                <div className="tags">
                  {blog.tags && blog.tags.length > 0 && (
                    <>
                      <p className="mb-2">Tags:</p>
                      <div
                        className="tags d-flex flex-wrap gap-2"
                        role="list"
                        aria-label="Article tags"
                      >
                        {blog.tags.map((tag, index) => (
                          <a
                            key={index}
                            href={`/blogs?tag=${encodeURIComponent(tag)}`}
                            className="tag-link"
                            role="listitem"
                            aria-label={`View posts tagged with ${tag}`}
                          >
                            {tag}
                          </a>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <div className="wrap-social">
                  <p className="mb-2">Share this post:</p>
                  <ul
                    className="tf-social style-1"
                    role="list"
                    aria-label="Share on social media"
                  >
                    <li role="listitem">
                      <a
                        href="https://web.facebook.com/Earlybirdproperties"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-fb" />
                      </a>
                    </li>
                    <li role="listitem">
                      <a
                        href="http://linkedin.com/in/earlybirds-managing"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-linked" />
                      </a>
                    </li>
                    <li role="listitem">
                      <a
                        href="https://www.instagram.com/earlybirdsproperties"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="icon-ins" />
                      </a>
                    </li>
                  </ul>
                </div>
              </footer>
            </article>
          </div>

          {/* Sidebar */}
          <aside
            className="col-lg-4"
            role="complementary"
            aria-label="Blog sidebar"
          >
            <div className="tf-sidebar">
              {/* Featured Blogs */}
              {featuredBlogs.length > 0 && (
                <section
                  className="sidebar-item sidebar-featured"
                  aria-labelledby="featured-blogs-heading"
                >
                  <h4 id="featured-blogs-heading" className="sidebar-title">
                    Featured Blogs
                  </h4>
                  <ul>
                    {featuredBlogs.map((featuredBlog) => (
                      <li key={featuredBlog._id} className="box-listings">
                        <div className="image-wrap">
                          <Link
                            href={`/blogs/${
                              featuredBlog.slug || featuredBlog._id
                            }`}
                          >
                            <Image
                              src={
                                featuredBlog.featuredImage ||
                                featuredBlog.images?.[0]?.url ||
                                "/images/blog-placeholder.jpg"
                              }
                              alt={featuredBlog.title}
                              width={112}
                              height={80}
                              className="lazyload"
                            />
                          </Link>
                        </div>
                        <div className="content">
                          <h5 className="title fw-5">
                            <Link
                              href={`/blogs/${
                                featuredBlog.slug || featuredBlog._id
                              }`}
                            >
                              {featuredBlog.title}
                            </Link>
                          </h5>
                          <p>
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
                            <time dateTime={featuredBlog.createdAt}>
                              {formatDate(featuredBlog.createdAt)}
                            </time>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Categories */}
              {Array.isArray(categories) && categories.length > 0 && (
                <nav
                  className="sidebar-item sidebar-categories"
                  aria-labelledby="categories-heading"
                >
                  <h4 id="categories-heading" className="sidebar-title">
                    Categories
                  </h4>
                  <ul>
                    {categories.map((category) => (
                      <li key={category._id}>
                        <Link
                          href={`/blogs?category=${category._id}`}
                          aria-label={`View ${
                            category.blogCount || 0
                          } posts in ${category.name} category`}
                        >
                          {category.name} ({category.blogCount || 0})
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              {/* Popular Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="sidebar-item sidebar-tags">
                  <h4 className="sidebar-title">Popular Tags</h4>
                  <div className="tags-list">
                    {blog.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blogs?tag=${encodeURIComponent(tag)}`}
                        className="tags-item"
                        aria-label={`View posts tagged with ${tag}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <Sidebar />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
