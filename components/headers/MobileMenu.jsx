"use client";
import { buyMenu, offPlanMenu, rentMenu, services } from "@/data/menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAnalytics } from "@/contexts/AnalyticsContext";

export default function MobileMenu() {
  const pathname = usePathname();
  const { trackClick, trackNavigation } = useAnalytics();

  const handleMobileNavClick = (destination, label, source = 'mobile_nav') => {
    trackClick({
      element_type: 'mobile_navigation_link',
      element_text: label,
      page_location: pathname
    });
    trackNavigation({
      destination,
      source
    });
  };

  const handleLogoClick = () => {
    trackClick({
      element_type: 'mobile_logo',
      element_text: 'Earlybirds Properties Logo',
      page_location: pathname
    });
    trackNavigation({
      destination: '/',
      source: 'mobile_logo'
    });
  };
  const isParentActive = (menus) =>
    menus.some((menu) =>
      menu.submenu
        ? menu.submenu.some((item) =>
            item.submenu
              ? item.submenu.some(
                  (item) => item.href.split("/")[1] === pathname.split("/")[1]
                )
              : item.href.split("/")[1] === pathname.split("/")[1]
          )
        : menu.href.split("/")[1] === pathname.split("/")[1]
    );
  return (
    <div
      className="offcanvas offcanvas-start mobile-nav-wrap"
      tabIndex={-1}
      id="menu-mobile"
      aria-labelledby="menu-mobile"
    >
      <div className="offcanvas-header top-nav-mobile">
        <div className="offcanvas-title">
          <Link href={`/`} onClick={handleLogoClick}>
            <Image
              alt=""
              src="/images/logo/Earlybird_Logo.png"
              width={120}
              height={100}
            />
          </Link>
        </div>
        <div data-bs-dismiss="offcanvas" aria-label="Close">
          <i className="icon-close" />
        </div>
      </div>
      <div className="offcanvas-body inner-mobile-nav">
        <div className="mb-body">
          <ul id="menu-mobile-menu">
            <li className={`menu-item ${"/" == pathname ? "current-item" : ""}`}>
              <Link href={`/`} className="item-menu-mobile" onClick={() => handleMobileNavClick('/', 'Home')}>Home</Link>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile ${
                buyMenu.some(
                  (elm) =>
                    elm.href == pathname ||
                    pathname.includes(`${elm.href.split("?")[0]}`)
                )
                  ? "current-menu-item"
                  : ""
              }`}
            >
              <a
                href="#dropdown-menu-buy"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-buy"
              >
                Buy
              </a>
              <div
                id="dropdown-menu-buy"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {buyMenu.map((item, index) => (
                    <li
                      key={index}
                      className={
                        pathname == item.href
                          ? "menu-item current-item"
                          : "menu-item"
                      }
                    >
                      <Link href={item.href} className="item-menu-mobile" onClick={() => handleMobileNavClick(item.href, item.label, 'mobile_buy_submenu')}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li className={`menu-item ${"/sell" == pathname ? "current-item" : ""}`}>
              <Link href={`/sell`} className="item-menu-mobile" onClick={() => handleMobileNavClick('/sell', 'Sell')}>Sell</Link>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile ${
                rentMenu.some(
                  (elm) =>
                    elm.href == pathname ||
                    pathname.includes(`${elm.href.split("?")[0]}`)
                )
                  ? "current-menu-item"
                  : ""
              }`}
            >
              <a
                href="#dropdown-menu-rent"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-rent"
              >
                Rent
              </a>
              <div
                id="dropdown-menu-rent"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {rentMenu.map((item, index) => (
                    <li
                      key={index}
                      className={
                        pathname == item.href
                          ? "menu-item current-item"
                          : "menu-item"
                      }
                    >
                      <Link href={item.href} className="item-menu-mobile" onClick={() => handleMobileNavClick(item.href, item.label, 'mobile_rent_submenu')}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile ${
                offPlanMenu.some(
                  (elm) =>
                    elm.href == pathname ||
                    pathname.includes(`${elm.href.split("?")[0]}`)
                )
                  ? "current-menu-item"
                  : ""
              }`}
            >
              <a
                href="#dropdown-menu-offplan"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-offplan"
              >
                Off Plan Properties
              </a>
              <div
                id="dropdown-menu-offplan"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {offPlanMenu.map((item, index) => (
                    <li
                      key={index}
                      className={
                        pathname == item.href
                          ? "menu-item current-item"
                          : "menu-item"
                      }
                    >
                      <Link href={item.href} className="item-menu-mobile" onClick={() => handleMobileNavClick(item.href, item.label, 'mobile_offplan_submenu')}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {/*<li className={`menu-item ${"/areas-in-uae" == pathname ? "current-item" : ""}`}>
              <Link href={`/areas-in-uae`} className="item-menu-mobile">Areas in UAE</Link>
            </li>*/}
            {/*<li className={`menu-item ${"/developers-in-uae" == pathname ? "current-item" : ""}`}>
              <Link href={`/developers-in-uae`} className="item-menu-mobile">Developers in UAE</Link>
            </li>*/}
            <li className={`menu-item ${"/about-us" == pathname ? "current-item" : ""}`}>
              <Link href={`/about-us`} className="item-menu-mobile" onClick={() => handleMobileNavClick('/about-us', 'About Us')}>About Us</Link>
            </li>
            <li
              className={`menu-item menu-item-has-children-mobile ${
                services.some(
                  (elm) =>
                    elm.href == pathname ||
                    pathname.includes(`${elm.href.split("/")[1]}`)
                )
                  ? "current-menu-item"
                  : ""
              }`}
            >
              <a
                href="#dropdown-menu-services"
                className="item-menu-mobile collapsed"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="dropdown-menu-services"
              >
                Services
              </a>
              <div
                id="dropdown-menu-services"
                className="collapse"
                data-bs-parent="#menu-mobile-menu"
              >
                <ul className="sub-mobile">
                  {services.map((item, index) => (
                    <li
                      key={index}
                      className={
                        pathname == item.href
                          ? "menu-item current-item"
                          : "menu-item"
                      }
                    >
                      <Link href={item.href} className="item-menu-mobile" onClick={() => handleMobileNavClick(item.href, item.label, 'mobile_services_submenu')}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
            {/*<li className={`menu-item ${"/blog" == pathname ? "current-item" : ""}`}>
              <Link href={`/blog`} className="item-menu-mobile" onClick={() => handleMobileNavClick('/blog', 'Blog')}>Blog</Link>
            </li>*/}
            <li className={`menu-item ${"/faqs" == pathname ? "current-item" : ""}`}>
              <Link href={`/faqs`} className="item-menu-mobile" onClick={() => handleMobileNavClick('/faqs', "Faq's")}>Faq's</Link>
            </li>
          </ul>
          {/*<div className="support">
            <a href="#" className="text-need">
              {" "}
              Need help?
            </a>
            <ul className="mb-info">
              <li>
                Call Us Now: <span className="number">1-555-678-8888</span>
              </li>
              <li>
                Support 24/7: <a href="#">themesflat@gmail.com</a>
              </li>
              <li>
                <div className="wrap-social">
                  <p>Follow us:</p>
                  <ul className="tf-social style-2">
                    <li>
                      <a href="#">
                        <i className="icon-fb" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-X" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-linked" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icon-ins" />
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>*/}
        </div>
      </div>
    </div>
  );
}
