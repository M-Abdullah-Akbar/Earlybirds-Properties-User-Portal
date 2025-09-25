"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

const OdometerComponent = ({ max }) => {
  const odometerRef = useRef(null);
  const [value, setValue] = useState(0);
  const odometerInitRef = useRef();

  useEffect(() => {
    import("odometer").then((Odometer) => {
      // Initialize Odometer or do something with it

      // Example usage of Odometer
      if (Odometer && odometerRef.current) {
        odometerInitRef.current = new Odometer.default({
          el: odometerRef.current,
          value,
        });
      }
    });
  }, [value]);
  useEffect(() => {
    if (odometerRef.current && odometerInitRef.current) {
      odometerInitRef.current.update(value); // Update odometer when value changes
    }
  }, [value]);

  const startCountup = useCallback(() => {
    setValue(max);
  }, [max]);

  useEffect(() => {
    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCountup();
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const currentRef = odometerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [startCountup]);

  return (
    <>
      <div ref={odometerRef} className="odometer">
        0
      </div>
    </>
  );
};

export default OdometerComponent;
