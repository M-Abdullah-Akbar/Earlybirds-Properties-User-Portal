"use client";
import { jobAPI } from "@/utils/api";
import React, { useState, useEffect } from "react";
import JobApplicationModal from "./JobApplicationModal";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await jobAPI.getJobs();
        if (res.success) {
          setJobs(res.data);
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (e, job) => {
    e.preventDefault();
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  if(!loading && jobs.length === 0) {
      return (
        <section className="section-career tf-spacing-1">
            <div className="tf-container">
                <div className="text-center">
                    <h3 className="mb-4">No open positions at the moment.</h3>
                    <p>Please check back later.</p>
                </div>
            </div>
        </section>
      )
  }

  return (
    <>
      <section className="section-career tf-spacing-1">
        <div className="tf-container">
          <div className="row">
            <div className="col-12">
              <div className="heading-section text-center mb-48">
                <h2
                  className="title wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  Best Job For You At Earlybirds
                </h2>
                <p
                  className="text-1 wow animate__fadeInUp animate__animated"
                  data-wow-duration="1s"
                  data-wow-delay="0s"
                >
                  Join our team and help us connect clients to their dream properties.
                </p>
              </div>
              <div className="tf-grid-layout-2 mb-48">
                {jobs.map((item, index) => (
                  <div
                    key={item._id}
                    className={`career-item wow animate__fadeInUp animate__animated`}
                    data-wow-duration="1s"
                    data-wow-delay="0s"
                  >
                    <div className="content">
                      <h5 className="lh-28 name">{item.title}</h5>
                      <ul className="list-info">
                        <li className="text-4">
                          <i className="icon-bag" />
                          {item.department}
                        </li>
                        <li className="text-4">
                          <i className="icon-location" />
                          {item.location}
                        </li>
                        {item.salary && (
                            <li className="text-4">
                            <i className="icon-money" />
                            <span className="fw-7 text-color-primary">
                                {item.salary}
                            </span>
                            {/* Month */}
                            </li>
                        )}
                        <li className="text-4">
                            <span className={`badge ${item.type === 'Full Time' ? 'bg-primary' : 'bg-info'} text-white`}>
                                {item.type}
                            </span>
                        </li>
                      </ul>
                    </div>
                    <a 
                        href="#" 
                        className="tf-btn style-border pd-10"
                        onClick={(e) => handleApplyClick(e, item)}
                    >
                      Apply now
                    </a>
                  </div>
                ))}
              </div>
              {/* <a href="#" className="tf-btn bg-color-primary fw-7 pd-16 mx-auto">
                Load more
              </a> */}
            </div>
          </div>
        </div>
      </section>
      
      <JobApplicationModal 
        show={showModal} 
        onClose={closeModal} 
        job={selectedJob} 
      />
    </>
  );
}
