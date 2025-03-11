"use client";
import ThemeToggle from "../context/ThemeToggle";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoNotifications } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";
import { LuUserRoundPen } from "react-icons/lu";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useGetProfileQuery } from "@/app/store/api/authApi";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/auth");
  const isUserRoute = pathname?.startsWith("/user");
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: profile, isLoading, error } = useGetProfileQuery();
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

  // Check if user is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const handleLogout = () => {
    // Clear all auth-related items
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    // Optional: Clear any other user-related data
    // localStorage.clear(); // Be careful with this as it clears everything

    // Redirect to signin page
    router.push("/auth/signin");

    // Optional: Add a success message
    toast.success("Successfully logged out");
  };

  return (
    <div className="px-[6px] 2xl:px-0 ">
      <div
        className={`fixed px-5 2xl:px-0 top-0 left-0 w-full z-50  transition-transform duration-500 ${
          showNavbar ? "translate-y-00" : "-translate-y-fulll"
        }  ${isAtTop ? "mt-0" : "mt-6"} `}
      >
        <div className="max-w-[1552px] mx-auto md:py-6 py-[14px] 2xl:px-[96px] xl:px-[56px]  px-[14px] rounded-[12px] bg-nav-gradient backdrop-blur-3xl dark:bg-nav-dark-gradient flex  items-center">
          <div
            className={`${
              isUserRoute ? "max-w-[1080px] mx-auto w-full" : ""
            } flex items-center justify-between w-full`}
          >
            <Link href="/">
              <h1 className="text-[#070707] dark:text-white font-medium lg:text-[32px] text-2xl md:text-[28px] xl:min-w-[254px] lg:min-w-[200px] ">
                SayThat.sh
              </h1>
            </Link>
            {/* Navigation Links */}
            <div className="flex items-center  justify-between w-full ml-4 ">
              <div
                className={` ${
                  isAdminRoute || isUserRoute ? "hidden" : "hidden md:flex"
                }   items-center lg:space-x-6 space-x-3 text-base md:text-sm lg:text-base xl:text-lg `}
              >
                <Link href="/" className="text-[#070707] dark:text-white">
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

                {isLoggedIn() ? (
                  // Render profile and notification links on /users/allmessage
                  <div className="flex items-center gap-3">
                    <Link
                      href="/user/notification"
                      className="text-base font-medium"
                    >
                      <span className="md:w-[36px] md:h-[36px] w-[26px] h-[26px] flex items-center justify-center rounded-full bg-white dark:bg-[#080808]">
                        <IoNotifications className="text-2xl" />
                      </span>
                    </Link>
                    <Link
                      href="/user/editprofile"
                      className="text-base font-medium "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:w-[36px] md:h-[36px] w-[26px] h-[26px]"
                        width="36"
                        height="36"
                        viewBox="0 0 36 36"
                        fill="none"
                      >
                        <path
                          d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
                          fill="white"
                        />
                        <path
                          d="M31.0975 28.5255C30.3145 27.9068 29.3605 27.4613 28.3255 27.2453L23.3912 26.2552C22.8737 26.1562 22.5002 25.6927 22.5002 25.1528V24.021C22.8175 23.5755 23.1167 22.9837 23.4295 22.365C23.6725 21.8857 24.0392 21.1635 24.2215 20.9767C25.2205 19.9732 26.1857 18.846 26.485 17.3925C26.764 16.029 26.4895 15.3135 26.1677 14.7375C26.1677 13.2998 26.1227 11.4997 25.783 10.1902C25.7425 8.41725 25.4207 7.4205 24.6107 6.5475C24.0392 5.92875 23.1977 5.78475 22.5205 5.67C22.255 5.625 21.8882 5.562 21.7532 5.49C20.554 4.842 19.3682 4.52475 17.953 4.5C14.9897 4.6215 11.347 6.507 10.1275 9.8685C9.74949 10.8923 9.78774 12.573 9.81924 13.923L9.78999 14.7352C9.49974 15.3022 9.21399 16.0223 9.49524 17.3903C9.79224 18.846 10.7575 19.9755 11.7745 20.9925C11.941 21.1635 12.3167 21.8925 12.5642 22.374C12.8815 22.9905 13.183 23.58 13.5002 24.0233V25.155C13.5002 25.6928 13.1245 26.1562 12.6047 26.2575L7.66599 27.2475C6.63774 27.4657 5.68374 27.9068 4.90299 28.5255C4.65999 28.7213 4.50699 29.007 4.48224 29.3175C4.45749 29.628 4.56099 29.9318 4.77024 30.1635C8.13174 33.8715 12.9535 36 18.0002 36C23.047 36 27.871 33.8738 31.2302 30.1635C31.4395 29.9318 31.5452 29.6258 31.5182 29.3153C31.5059 29.1618 31.4622 29.0126 31.3898 28.8767C31.3174 28.7409 31.2179 28.6213 31.0975 28.5255Z"
                          fill="#C9CCD8"
                        />
                      </svg>
                    </Link>
                    <button onClick={() => setShowDropdown(!showDropdown)}>
                      <RiArrowDownSLine
                        className={`text-xl dark:text-[#D1D7E6] duration-500 ${
                          showDropdown ? "rotate-180 " : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`duration-700 w-[290px] dark:box-shadow ${
                        showDropdown ? "opacity-100 " : "opacity-0"
                      } absolute z-50 top-full 2xl:right-[15%] xl:right-[12.5%] right-0   bg-white shadow-lg rounded-[8px] dark:border dark:bg-custom-gradient dark:border-[#070707] transition-opacity duration-500`}
                    >
                      <div className="p-4 pb-[46px]">
                        <div className="flex items-center gap-3 py-4 px-3 bg-[#F6F8FA] dark:bg-[#191A1C] rounded-[12px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="46"
                            height="46"
                            viewBox="0 0 36 36"
                            fill="none"
                          >
                            <path
                              d="M18 36C27.9411 36 36 27.9411 36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 27.9411 8.05887 36 18 36Z"
                              fill="white"
                            />
                            <path
                              d="M31.0975 28.5255C30.3145 27.9068 29.3605 27.4613 28.3255 27.2453L23.3912 26.2552C22.8737 26.1562 22.5002 25.6927 22.5002 25.1528V24.021C22.8175 23.5755 23.1167 22.9837 23.4295 22.365C23.6725 21.8857 24.0392 21.1635 24.2215 20.9767C25.2205 19.9732 26.1857 18.846 26.485 17.3925C26.764 16.029 26.4895 15.3135 26.1677 14.7375C26.1677 13.2998 26.1227 11.4997 25.783 10.1902C25.7425 8.41725 25.4207 7.4205 24.6107 6.5475C24.0392 5.92875 23.1977 5.78475 22.5205 5.67C22.255 5.625 21.8882 5.562 21.7532 5.49C20.554 4.842 19.3682 4.52475 17.953 4.5C14.9897 4.6215 11.347 6.507 10.1275 9.8685C9.74949 10.8923 9.78774 12.573 9.81924 13.923L9.78999 14.7352C9.49974 15.3022 9.21399 16.0223 9.49524 17.3903C9.79224 18.846 10.7575 19.9755 11.7745 20.9925C11.941 21.1635 12.3167 21.8925 12.5642 22.374C12.8815 22.9905 13.183 23.58 13.5002 24.0233V25.155C13.5002 25.6928 13.1245 26.1562 12.6047 26.2575L7.66599 27.2475C6.63774 27.4657 5.68374 27.9068 4.90299 28.5255C4.65999 28.7213 4.50699 29.007 4.48224 29.3175C4.45749 29.628 4.56099 29.9318 4.77024 30.1635C8.13174 33.8715 12.9535 36 18.0002 36C23.047 36 27.871 33.8738 31.2302 30.1635C31.4395 29.9318 31.5452 29.6258 31.5182 29.3153C31.5059 29.1618 31.4622 29.0126 31.3898 28.8767C31.3174 28.7409 31.2179 28.6213 31.0975 28.5255Z"
                              fill="#C9CCD8"
                            />
                          </svg>
                          <div className="flex flex-col gap-1">
                            <h2 className="text-base leading-[130%] text-[#082B2E] dark:text-[#D1D7E5]">
                              {profile?.data?.name}
                            </h2>
                            <p className="text-[12px] leading-[150%] text-[#777980] dark:text-[#A5A5AB]">
                              {profile?.data?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[6px] pt-4 leading-[160%] text-[14px] tracking-[.123px] dark:text-[#C9CCD8] text-[#6A6C72]">
                          <Link
                            onClick={() => {
                              setShowDropdown(false);
                            }}
                            href="/user/editprofile"
                          >
                            <div className="flex items-center gap-[10px] py-[11px]">
                              <LuUserRoundPen className="text-xl" />
                              <p>Edit Profile</p>
                            </div>
                          </Link>

                          <Link
                            onClick={() => {
                              setShowDropdown(false);
                            }}
                            href="/user/allmessage"
                          >
                            <div className="flex items-center gap-[10px] py-[11px] pb-[23px] border-b dark:border-[#4A4C56] border-[#DFE1E7] ">
                              <IoDocumentTextOutline className="text-xl" />
                              <p>My Messages</p>
                            </div>
                          </Link>
                          <Link
                            onClick={() => {
                              setShowDropdown(false);
                            }}
                            href="/auth/signin"
                          >
                            <div
                              onClick={handleLogout}
                              className="flex items-center gap-[10px] py-[11px] pt-[23px] "
                            >
                              <MdOutlineLogout className="text-xl " />
                              <p className="text-[#EB3D4D]">Log out</p>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : isLoggedIn() ? (
                  // Show logout button when logged in
                  <button
                    onClick={handleLogout}
                    className="bg-[#070707] border border-[#070707] dark:bg-[#ffffff] text-white  dark:text-[#000000] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium lg:rounded-[99px] md:rounded-[50px] hidden md:block dark:hover:bg-[#e4e4e4] hover:bg-[#2a2c31] transition-colors duration-300"
                  >
                    Logout
                  </button>
                ) : pathname === "/" ? (
                  // Show both buttons on home page when not logged in
                  <div className="flex items-center gap-3">
                    <Link
                      href="/auth/signup"
                      className="bg-[#F3F6FE] dark:bg-[#F3F6FE] border border-[#070707] text-[#000] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium rounded-[99px] hidden md:block"
                    >
                      Sign Up
                    </Link>
                    <Link
                      href="/auth/signin"
                      className="bg-[#070707] border border-[#070707] text-[#E3E6EF] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium lg:rounded-[99px] md:rounded-[50px] hidden md:block"
                    >
                      Sign In
                    </Link>
                  </div>
                ) : pathname === "/auth/signin" ? (
                  // Show only Sign Up on signin page
                  <Link
                    href="/auth/signup"
                    className="bg-[#F3F6FE] dark:bg-[#F3F6FE] border border-[#070707] text-[#000] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium rounded-[99px] hidden md:block"
                  >
                    Sign Up
                  </Link>
                ) : (
                  // Show only Sign In on other pages
                  <Link
                    href="/auth/signin"
                    className="bg-[#070707] border border-[#070707] text-[#E3E6EF] lg:px-6 md:px-[10px] lg:py-[10px] md:py-[6px] text-base font-medium lg:rounded-[99px] md:rounded-[50px] hidden md:block"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
