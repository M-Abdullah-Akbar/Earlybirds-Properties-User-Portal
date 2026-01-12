"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";

export default function MetaPixel() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMounted = useRef(false);

    useEffect(() => {
        // Skip the first render/mount because the script tag handles the initial PageView
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        // Track PageView on subsequent route changes (SPA navigation)
        if (typeof window.fbq === "function") {
            window.fbq("track", "PageView");
        }
    }, [pathname, searchParams]);

    return (
        <>
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '24018330397756039');
            fbq('track', 'PageView');
          `,
                }}
            />
            <noscript>
                <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src="https://www.facebook.com/tr?id=24018330397756039&ev=PageView&noscript=1"
                    alt=""
                />
            </noscript>
        </>
    );
}
