import React, { useEffect } from "react";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const FloatingWhatsapp = () => {
  useEffect(() => {
    // Inject custom CSS and JavaScript for left-side animation
    const style = document.createElement('style');
    style.textContent = `
      .floating-whatsapp-chatbox {
        transform-origin: left bottom !important;
        transition: all 0.3s ease !important;
      }
      
      .floating-whatsapp-chatbox.slide-in-left {
        animation: slideInFromLeft 0.3s ease-out !important;
      }
      
      .floating-whatsapp-chatbox.slide-out-left {
        animation: slideOutToLeft 0.3s ease-in !important;
      }
      
      @keyframes slideInFromLeft {
        0% {
          transform: scale(0) translateX(-20px);
          opacity: 0;
        }
        100% {
          transform: scale(1) translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOutToLeft {
        0% {
          transform: scale(1) translateX(0);
          opacity: 1;
        }
        100% {
          transform: scale(0) translateX(-20px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Use MutationObserver to detect chatbox visibility changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          const chatbox = mutation.target;
          if (chatbox.classList.contains('floating-whatsapp-chatbox')) {
            const isVisible = chatbox.style.opacity === '1' || chatbox.style.display === 'block';
            const isHidden = chatbox.style.opacity === '0' || chatbox.style.display === 'none';
            
            if (isVisible) {
              chatbox.classList.remove('slide-out-left');
              chatbox.classList.add('slide-in-left');
            } else if (isHidden) {
              chatbox.classList.remove('slide-in-left');
              chatbox.classList.add('slide-out-left');
            }
          }
        }
      });
    });
    
    // Start observing after a short delay to ensure the component is mounted
    const timeoutId = setTimeout(() => {
      const chatboxes = document.querySelectorAll('.floating-whatsapp-chatbox');
      chatboxes.forEach(chatbox => {
        observer.observe(chatbox, {
          attributes: true,
          attributeFilter: ['style']
        });
      });
    }, 1000);
    
    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  return (
    <FloatingWhatsApp
      phoneNumber="+971561615675" // Replace with your actual WhatsApp number
      accountName="EarlyBirds Properties"
      avatar="/images/logo/Earlybird_Whatsapp_Logo.png" // Replace with your logo path
      statusMessage="Typically replies within 1 hour"
      chatMessage="Hello! How can we help you today? 🏠"
      placeholder="Type a message..."
      allowEsc={true}
      allowClickAway={false}
      darkMode={true}
      notification={true}
      notificationSound={true}
      height={300}
      style={{
        left: "20px",
        right: "auto",
      }}
      buttonStyle={{
        left: "20px",
        right: "auto",
      }}
      chatboxStyle={{
        left: "20px",
        right: "auto",
      }}
    />
  );
};

export default FloatingWhatsapp;
