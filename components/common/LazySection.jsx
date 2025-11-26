"use client";
import React, { useState, useEffect, useRef } from "react";

export default function LazySection({
  children,
  threshold = 0, // Trigger as soon as any part is visible
  rootMargin = "600px", // Pre-load well in advance (approx 1 viewport height)
  minHeight = "200px", // Default min-height to prevent collapse
  className = "",
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger if intersecting OR if we've already scrolled past it (boundingClientRect.top < 0)
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className} style={{ minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}
