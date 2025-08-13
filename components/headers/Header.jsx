import React from "react";
import Nav from "./Nav";
import Link from "next/link";
export default function Header8() {
  return (
    <header id="header-main" className="header style-7">
      <div className="header-inner">
        <div className="header-inner-wrap">
          <div className="header-logo">
            <Link href={`/`} className="site-logo">
              <img
                className="logo_header"
                alt="Earlybirds-Properties-Logo"
                data-light="/images/logo/Earlybird_Logo.png"
                data-dark="/images/logo/Earlybird_Logo.png"
                src="/images/logo/Earlybird_Logo.png"
              />
            </Link>
          </div>
          <nav className="main-menu style-1">
            <ul className="navigation">
              <Nav />
            </ul>
          </nav>
          <div className="header-right">
            <div className="btn-add">
              <Link
                className="tf-btn style-border rounded-cycle height-3 pd-23"
                href={`/contact-us`}
              >
                Book a visit
                <span>
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 7H17V17"
                      stroke="#F1913D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L17 7"
                      stroke="#F1913D"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </span>
              </Link>
            </div>
            <div
              className="mobile-button"
              data-bs-toggle="offcanvas"
              data-bs-target="#menu-mobile"
              aria-controls="menu-mobile"
            >
              <i className="icon-menu" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
