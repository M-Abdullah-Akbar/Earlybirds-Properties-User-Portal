"use client";
import React from "react";
import Nav from "./Nav";
import Link from "next/link";
import Image from "next/image";
import { trackNavigation } from "@/utils/analytics";

export default function Header8() {

  return (
    <header id="header-main" className="header style-7">
      <div className="header-inner">
        <div className="header-inner-wrap">
          <div className="header-logo">
            <Link 
              href={`/`} 
              className="site-logo"
              onClick={() => trackNavigation("Logo", "/")}
            >
              <Image
                className="logo_header"
                alt="Earlybirds-Properties-Logo"
                src="/images/logo/Earlybird_Logo.png"
                width={200}
                height={60}
                priority
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
                href={`/book-a-consultation`}
                onClick={() => trackNavigation("Book a Consultation", "/book-a-consultation")}
              >
                Book a Consultation
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
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L17 7"
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>{" "}
                </span>
              </Link>
            </div>
            <div className="btn-add">
              <Link
                className="tf-btn style-border rounded-cycle height-3 pd-23"
                href={`/instant-valuation`}
                onClick={() => trackNavigation("Instant Valuation", "/instant-valuation")}
              >
                Instant Valuation 
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
                      stroke="#bd8c31"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 17L17 7"
                      stroke="#bd8c31"
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
              onClick={() => trackNavigation("Mobile Menu", "mobile-menu")}
            >
              <i className="icon-menu" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
