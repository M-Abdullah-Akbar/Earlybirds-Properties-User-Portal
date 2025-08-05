'use client';

import { useEffect, useState } from 'react';
import { ADMIN_CONFIG } from '@/config/admin';

export default function AdminPage() {
  const [isRedirecting, setIsRedirecting] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Start countdown for automatic redirect
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to admin portal dashboard
          const adminPortalUrl = `${ADMIN_CONFIG.PORTAL_URL}/dashboard`;
          window.location.href = adminPortalUrl;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="text-center p-5 bg-white rounded shadow-lg" style={{ maxWidth: '500px' }}>
        <div className="mb-4">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Redirecting...</span>
          </div>
        </div>
        
        <h2 className="h3 mb-3 text-dark fw-bold">Redirecting to Admin Dashboard</h2>
        <p className="text-muted mb-4">
          Please wait while we redirect you to the admin dashboard.
        </p>
        
        <div className="alert alert-info d-inline-flex align-items-center" role="alert">
          <div className="spinner-border spinner-border-sm me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>Redirecting in {countdown} second{countdown !== 1 ? 's' : ''}...</span>
        </div>
        
        {/*<div className="mt-3">
          <small className="text-muted d-block mb-2">
            <strong>Token ID:</strong> {ADMIN_CONFIG.TOKEN_ID}
          </small>
          <small className="text-muted d-block">
            <strong>Target URL:</strong> {ADMIN_CONFIG.PORTAL_URL}/dashboard
          </small>
        </div>*/}
        
        <div className="mt-4">
          <small className="text-muted">
            If you are not redirected automatically, 
            <a 
              href={`${ADMIN_CONFIG.PORTAL_URL}/dashboard`} 
              className="text-decoration-none ms-1 text-primary"
            >
              click here
            </a>
          </small>
        </div>
      </div>
    </div>
  );
} 