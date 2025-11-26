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
  const throttle = useMemo(
    () => (func, delay) => {
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
    },
    []
  );

  const handleScroll = useCallback(() => {
    if (!window.requestAnimationFrame) return;

    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const innerH = window.innerHeight;

      setScrolled(scrollY);
      setShowScrollTop(scrollY >= innerH);

      // Only calculate percentage if needed (e.g. for the circle progress)
      // Using document.documentElement.scrollHeight causes reflow, so we throttle it or accept it's needed
      // But we can check if we really need to update the percentage every frame
      if (scrollY > 100) {
        const totalHeight = document.documentElement.scrollHeight - innerH;
        if (totalHeight > 0) {
          setScrollPercentage((scrollY / totalHeight) * 100);
        }
      }
    });
  }, []);

  // Throttle the scroll event listener
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
