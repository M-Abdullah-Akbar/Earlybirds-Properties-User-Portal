"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";

export default function BackToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrolled, setScrolled] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(500);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can use 'auto' or 'instant' as well
    });
  };

  // Throttle scroll handler to prevent excessive reflows
  const throttle = useMemo(() => (func, delay) => {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }, []);

  const handleScroll = useCallback(() => {
    // Use requestAnimationFrame to batch DOM reads
    requestAnimationFrame(() => {
      const currentScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      setScrolled(currentScroll);
      setShowScrollTop(window.scrollY >= window.innerHeight);
      
      // Cache scroll height calculation to avoid repeated DOM reads
      const totalScrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (currentScroll / totalScrollHeight) * 100;
      setScrollPercentage(scrollPercentage);
    });
  }, []); // 16ms throttle for ~60fps

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);
  return (
    <div
      className={`progress-wrap ${scrolled > 150 ? "active-progress" : ""}`}
      onClick={() => scrollToTop()}
    >
      <svg
        className="progress-circle svg-content"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          style={{
            transition: "none",
            strokeDasharray: "307.919, 307.919",
            strokeDashoffset:
              307.919 - (scrolled / scrollHeight) * 307.919
                ? 307.919 - (scrolled / scrollHeight) * 307.919
                : 0,
          }}
        />
      </svg>
    </div>
  );
}
