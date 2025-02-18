import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black text-white px-5 md:px-24 py-12 md:py-16">
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
            <a href="#">Home</a>
            <a href="#">Leaderboard</a>
            <a href="#">FAQ</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className="pt-6 md:pt-0">
            <p className="font-medium">Social Connect</p>
            <div className="flex gap-4 mt-6">
              <FaFacebook size={24} className="cursor-pointer" />
              <FaInstagram size={24} className="cursor-pointer" />
              <FaTwitter size={24} className="cursor-pointer" />
              <FaLinkedin size={24} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 font-normal flex flex-col md:flex-row justify-between items-center">
        <p>Copyright © 2025 SayThat.sh All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
