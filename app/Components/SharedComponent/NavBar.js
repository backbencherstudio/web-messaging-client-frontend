"use client"
import ThemeToggle from "../context/ThemeToggle";
import { useState, useEffect, useRef } from "react";
import Link from 'next/link';
import { usePathname } from "next/navigation";

const NavBar = () => {

  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/auth");

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [showNavbar, setShowNavbar] = useState(true);
  const [isAtTop, setIsAtTop] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
      const handleScroll = () => {
          const currentScrollY = window.scrollY;
          setIsAtTop(currentScrollY);
          if (currentScrollY > lastScrollY.current) {
              // Scrolling Down - Hide Navbar
              setShowNavbar(false);
          } else {
              // Scrolling Up - Show Navbar
              setShowNavbar(true);
          }

          lastScrollY.current = currentScrollY;
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
          window.removeEventListener("scroll", handleScroll);
      };
  }, []);

  return (
    <div className="   px-[6px] 2xl:px-0 ">
      <div className={`fixed  top-0 left-0 w-full z-50  transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"}  ${isAtTop ? "mt-0" : "mt-6"} ` }>
        <div className="max-w-[1552px] mx-auto md:py-6 py-[14px] 2xl:px-[96px] xl:px-[56px]  px-[14px] rounded-[12px] bg-nav-gradient backdrop-blur-3xl dark:bg-nav-dark-gradient flex  items-center">

        <Link href="/">
          <h1 className="text-[#070707] dark:text-white font-medium lg:text-[32px] text-2xl md:text-[28px] lg:min-w-[254px] ">
            SayThat.sh
          </h1>
        </Link>
          {/* Navigation Links */}
          <div className="flex items-center  justify-between w-full ml-4 ">
            <div className={` ${isAdminRoute ? "hidden" : "hidden md:flex"}  md:text-[18px] text-base items-center lg:space-x-6 space-x-3 text-base `}>
              <Link
                 href="/"
                className="text-[#070707] dark:text-white"
              >
                Home
              </Link>
              <button
                onClick={() => handleNavigation("leaderboard")}
                className="text-[#070707] dark:text-white"
              >
                Leaderboard
              </button>
              <button
                onClick={() => handleNavigation("faq")}
                className="text-[#070707] dark:text-white"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigation("about")}
                className="text-[#070707] dark:text-white"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="text-[#070707] dark:text-white"
              >
                Contact
              </button>
            </div>

            {/* Theme Toggle & Sign In Button */}
            <div className="flex items-center justify-end w-full lg:space-x-6 md:space-x-2">
              <ThemeToggle></ThemeToggle>
              <Link href="/auth/signin" className="bg-[#070707] border border-[#070707] text-[#E3E6EF] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium lg:rounded-[99px] md:rounded-[50px] hidden md:block" >
                Sign In
              </Link>
              <Link href="/auth/signup" className="bg-[#F3F6FE] dark:bg-[#F3F6FE] border border-[#070707] text-[#000] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium rounded-[99px] hidden md:block">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
