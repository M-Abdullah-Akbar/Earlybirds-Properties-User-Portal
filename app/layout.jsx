import { GoogleTagManager } from "@next/third-parties/google";
import LayoutClient from "@/components/common/LayoutClient";
import MetaPixel from "@/components/common/MetaPixel";
import Script from "next/script";
import { Suspense } from "react";
import { Lexend, Manrope, Mulish, Poppins } from "next/font/google";

// Critical CSS - load immediately (compiled CSS, not SCSS)
import "../public/css/main.css";

// Optimize fonts
const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${lexend.variable} ${manrope.variable} ${mulish.variable} ${poppins.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Enhanced preconnect for critical origins */}
        <link rel="dns-prefetch" href="https://api.earlybirdsproperties.com" />
        <link rel="preconnect" href="https://api.earlybirdsproperties.com" />

        {/* Preload critical font to prevent render blocking - kept as it might be a custom icon font */}
        <link
          rel="preload"
          href="/icons/icomoon/fonts/icomoon.woff?6ufuj"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body className="popup-loader">
        {/* GTM loads after page becomes interactive */}
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <Suspense fallback={null}>
          <MetaPixel />
        </Suspense>

        <LayoutClient>{children}</LayoutClient>

        <Script
          id="gtm-enhanced-tracking"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced ecommerce and custom event tracking setup
              window.gtag = window.gtag || function(){dataLayer.push(arguments);};
              
              // Set default parameters for all events
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
                custom_map: {
                  'custom_parameter_1': 'property_type',
                  'custom_parameter_2': 'listing_type',
                  'custom_parameter_3': 'location'
                }
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
