import React, { useState, useEffect, useRef } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaEdit,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { LegalModal } from "./LegalModal";
import { useGetProfileQuery } from "@/app/store/api/authApi";

// At the top of your file
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to get token
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Helper: fetch website info (social links)
const fetchWebsiteInfo = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/website-info`);
    return await res.json();
  } catch {
    return { success: false };
  }
};

// Helper: update website info (admin only)
const updateWebsiteInfo = async (data) => {
  const token = getToken();
  try {
    const res = await fetch(`${API_BASE_URL}/admin/website-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return await res.json();
  } catch {
    return { success: false };
  }
};

const Footer = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("terms");

  // New state for social links
  const [socialLinks, setSocialLinks] = useState({
    facebook_url: "",
    instagram_url: "",
    linkedin_url: "",
  });
  const [loadingLinks, setLoadingLinks] = useState(true);

  // Tooltip state
  const [tooltip, setTooltip] = useState(null); // "facebook" | "instagram" | "linkedin" | null
  const [editMode, setEditMode] = useState(null); // same as above
  const [editValue, setEditValue] = useState("");

  // Get user profile
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const isAdmin = profile?.data?.type === "admin";
  // console.log("from footer", profile);
  // console.log("from footer", isAdmin);

  // Fetch social links on mount
  useEffect(() => {
    let mounted = true;
    setLoadingLinks(true);
    fetchWebsiteInfo().then((res) => {
      if (mounted && res.success && res.data) {
        setSocialLinks({
          facebook_url: res.data.facebook_url || "",
          instagram_url: res.data.instagram_url || "",
          linkedin_url: res.data.linkedin_url || "",
        });
      }
      setLoadingLinks(false);
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Tooltip close on outside click
  const tooltipRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setTooltip(null);
        setEditMode(null);
      }
    }
    if (tooltip) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [tooltip]);

  // Handle edit submit
  const handleEditSubmit = async (type) => {
    const newLinks = { ...socialLinks, [`${type}_url`]: editValue };
    const res = await updateWebsiteInfo(newLinks);
    if (res.success) {
      setSocialLinks(newLinks);
      setEditMode(null);
      setTooltip(null);
    } else {
      alert(res.message || "Failed to update link");
    }
  };

  // Social icon data
  const icons = [
    {
      type: "facebook",
      Icon: FaFacebook,
      url: socialLinks.facebook_url,
      label: "Facebook",
    },
    {
      type: "instagram",
      Icon: FaInstagram,
      url: socialLinks.instagram_url,
      label: "Instagram",
    },
    {
      type: "linkedin",
      Icon: FaLinkedin,
      url: socialLinks.linkedin_url,
      label: "LinkedIn",
    },
  ];

  const handleLegalClick = (type) => (e) => {
    e.preventDefault();
    setModalType(type);
    setShowModal(true);
  };

  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCookieClick = (e) => {
    e.preventDefault();
    // Dispatch a custom event to show the cookie banner
    const event = new CustomEvent("showCookieBanner");
    window.dispatchEvent(event);
  };

  return (
    <div className="dark:bg-[url('/shape-7.png')]  dark:bg-cover dark:bg-no-repeat md:pt-[64px] pt-[32px] md:pb-[52px] pb-[24px] px-6">
      <div className="bg-[#070707] text-white px-5 lg:px-24 md:px-12 py-12 lg:py-16 rounded-[12px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-[#65687280] pb-12">
          <div className=" max-w-[392px]">
            <h1 className=" text-3xl font-medium">SayThat.sh</h1>
            <p className="text-[#C9CCD8] font-normal mt-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-3 border-b md:border-b-0 border-[#65687280] pb-8 md:pb-0">
              <button
                onClick={() => handleNavigation("home")}
                className="text-left"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("leaderboard")}
                className="text-left"
              >
                Leaderboard
              </button>
              <button
                onClick={() => handleNavigation("faq")}
                className="text-left"
              >
                FAQ
              </button>
              <button
                onClick={() => handleNavigation("about")}
                className="text-left"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("contact")}
                className="text-left"
              >
                Contact
              </button>
            </div>
            <div className="pt-6 md:pt-0">
              <p className="font-medium">Social Connect</p>
              <div className="flex gap-6 mt-6 relative">
                {profileLoading ? (
                  <span>Loading...</span>
                ) : (
                  icons.map(({ type, Icon, url, label }) => (
                    <div key={type} className="relative">
                      {isAdmin ? (
                        <button
                          type="button"
                          className="bg-transparent border-none p-0 m-0 cursor-pointer"
                          onClick={() => {
                            setTooltip(type);
                            setEditMode(null);
                            setEditValue(url);
                          }}
                        >
                          <Icon size={24} className="cursor-pointer" />
                        </button>
                      ) : (
                        <a
                          href={url || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon size={24} className="cursor-pointer" />
                        </a>
                      )}
                      {/* Tooltip for admin */}
                      {isAdmin && tooltip === type && (
                        <div
                          ref={tooltipRef}
                          className="absolute z-50 left-1/2 -translate-x-1/2 top-10 bg-[#222] text-white rounded shadow-lg p-3 min-w-[220px]"
                        >
                          {editMode === type ? (
                            <div className="flex flex-col gap-2">
                              <input
                                className="text-black px-2 py-1 rounded"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                placeholder={`Enter ${label} URL`}
                              />
                              <div className="flex gap-2">
                                <button
                                  className="bg-green-600 px-2 py-1 rounded text-white"
                                  onClick={() => handleEditSubmit(type)}
                                >
                                  Save
                                </button>
                                <button
                                  className="bg-gray-500 px-2 py-1 rounded text-white"
                                  onClick={() => setEditMode(null)}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <a
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-400 underline"
                              >
                                <FaExternalLinkAlt size={14} /> View
                              </a>
                              <button
                                className="ml-2 text-yellow-400"
                                onClick={() => {
                                  setEditMode(type);
                                  setEditValue(url);
                                }}
                                title="Edit"
                              >
                                <FaEdit size={16} />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 font-normal flex flex-col md:flex-row justify-between items-center">
          <p>Copyright © 2025 SayThat.sh All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" onClick={handleLegalClick("terms")}>
              Terms
            </a>
            <a href="#" onClick={handleLegalClick("privacy")}>
              Privacy
            </a>
            <a href="#" onClick={handleCookieClick}>
              Cookies
            </a>
          </div>
        </div>

        <LegalModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          type={modalType}
        />
      </div>
    </div>
  );
};

export default Footer;
