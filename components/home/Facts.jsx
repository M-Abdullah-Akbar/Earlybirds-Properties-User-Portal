"use client";

import OdometerComponent from "@/components/common/OdometerComponent";
import { counterData } from "@/data/facts";
import React, { useEffect, useState } from "react";
// import SplitTextAnimation from "@/components/common/SplitTextAnimation";
import { FaHome, FaUsers, FaBuilding } from "react-icons/fa";
import Image from "next/image";

const iconStyle = {
  padding: "18px",
  borderRadius: "50%",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "80px",
  marginBottom: "20px",
  transition: "all 0.4s ease",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.08)",
  cursor: "pointer",
  animation: "fadeInUp 0.8s ease-out forwards",
};

const getIconProps = (color, bgColor, index) => {
  // Ensure consistent color format by using hex values
  // This helps prevent hydration mismatches between rgb and hex formats
  const getHexColor = (colorValue) => {
    // If it's already a hex color, return it
    if (colorValue.startsWith("#")) {
      return colorValue;
    }
    // Otherwise, assume it's a named color or rgb value and return as is
    // The browser will handle the conversion consistently
    return colorValue;
  };

  const safeColor = getHexColor(color);
  const safeBgColor = getHexColor(bgColor);

  return (isDarkMode) => {
    // Create a clean object without event handlers for initial render
    // Event handlers will be attached client-side after hydration
    const baseStyle = {
      ...iconStyle,
      color: safeColor,
      backgroundColor: safeBgColor,
      boxShadow: isDarkMode
        ? "0 6px 15px rgba(255, 255, 255, 0.08)"
        : "0 6px 15px rgba(0, 0, 0, 0.08)",
    };

    // Only include these on the client side
    if (typeof window !== "undefined") {
      return {
        ...baseStyle,
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-8px)";
          e.currentTarget.style.boxShadow = isDarkMode
            ? "0 12px 20px rgba(255, 255, 255, 0.15)"
            : "0 12px 20px rgba(0, 0, 0, 0.15)";
          e.currentTarget.style.color = "#ffffff";
          e.currentTarget.style.backgroundColor = safeColor;
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = isDarkMode
            ? "0 6px 15px rgba(255, 255, 255, 0.08)"
            : "0 6px 15px rgba(0, 0, 0, 0.08)";
          e.currentTarget.style.color = safeColor;
          e.currentTarget.style.backgroundColor = safeBgColor;
        },
      };
    }

    return baseStyle;
  };
};

const renderIcon = (iconType, props) => {
  // Create a clean props object with only the necessary properties
  // to avoid hydration mismatches between server and client rendering
  const containerStyle = {
    padding: props.padding,
    borderRadius: props.borderRadius,
    display: props.display,
    alignItems: props.alignItems,
    justifyContent: props.justifyContent,
    width: props.width,
    height: props.height,
    marginBottom: props.marginBottom,
    transition: props.transition,
    boxShadow: props.boxShadow,
    cursor: props.cursor,
    animation: props.animation,
    color: props.color,
    // backgroundColor removed to eliminate background colors
  };

  const iconImageStyle = {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  };

  // Use custom PNG icons from public/images/icons
  return (
    <div style={containerStyle}>
      <Image
        src={`/images/icons/${iconType}`}
        alt="Icon"
        width={44}
        height={44}
        style={iconImageStyle}
      />
    </div>
  );
};
export default function Facts() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if document is available (client-side)
    if (typeof document !== "undefined") {
      // Initial check for dark mode
      const checkDarkMode = () => {
        const isDark = document.body.classList.contains("dark-theme");
        setIsDarkMode(isDark);
      };

      // Check on load
      checkDarkMode();

      // Set up a mutation observer to detect theme changes
      const observer = new MutationObserver(checkDarkMode);
      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ["class"],
      });

      return () => observer.disconnect();
    }
  }, []);

  // Define theme-specific styles
  const containerStyle = {
    paddingTop: "50px",
    paddingBottom: "70px",
  };

  return (
    <div className="mt-5" style={containerStyle}>
      <div className="tf-container">
        <div className="row">
          <div className="col-12">
            <div
              className="heading-section mb-56 gap-32"
              style={{ textAlign: "center" }}
            >
              <h2
                className="title split-text effect-right fw-5"
                style={{
                  marginBottom: "25px",
                  fontSize: "2.8rem",
                  fontWeight: "700",
                  letterSpacing: "0.5px",
                }}
              >
                Market Leader in Real Estate
              </h2>
              {/*<p className="text-1 text-color-default split-text split-lines-transform">
                At Proty, we're more than just a real estate company; we're
                architects of dreams, crafting spaces where life <br />
                flourishes and businesses thrive.
              </p>*/}
            </div>
          </div>
          {counterData.map((item, index) => (
            <div className="col-lg-3 col-6" key={index}>
              <div
                className="counter-item style-4"
                style={{
                  textAlign: "center",
                  animation: `fadeIn 0.8s ease-out ${index * 0.2}s forwards`,
                  opacity: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "25px 15px",
                  borderRadius: "16px",
                  transition: "all 0.3s ease",
                  height: "100%",
                  boxShadow: isDarkMode
                    ? "0 2px 10px rgba(255, 255, 255, 0.03)"
                    : "0 2px 10px rgba(0, 0, 0, 0.03)",
                  cursor: "pointer",
                  border: isDarkMode
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "1px solid rgba(0, 0, 0, 0.05)",
                  margin: "10px 5px",
                  backgroundColor: isDarkMode ? "#1f2124" : "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 8px 20px rgba(255, 255, 255, 0.08)"
                    : "0 8px 20px rgba(0, 0, 0, 0.08)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = isDarkMode
                    ? "0 2px 10px rgba(255, 255, 255, 0.03)"
                    : "0 2px 10px rgba(0, 0, 0, 0.03)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                suppressHydrationWarning={true}
              >
                <div className="icon-box">
                  {renderIcon(
                    item.icon,
                    getIconProps(
                      item.iconColor,
                      item.iconBgColor,
                      index
                    )(isDarkMode)
                  )}
                </div>
                <div
                  className="count"
                  style={{
                    marginTop: "15px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="counter-number"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "700",
                      color: isDarkMode ? "#ffffff" : "inherit",
                      textAlign: "center",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div className={`odometer style-4 ${item.className}`}>
                      <OdometerComponent max={item.value} />
                    </div>
                    {item.subText && <span>{item.subText}</span>}
                    <span className="sub plus">+</span>
                  </div>
                  <p
                    className="text-1 mt_-9"
                    style={{
                      marginTop: "10px",
                      fontSize: "1.7rem",
                      fontWeight: "600",
                      color: isDarkMode
                        ? "rgba(255, 255, 255, 0.9)"
                        : "#333333",
                      letterSpacing: "0.5px",
                      textAlign: "center",
                    }}
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
