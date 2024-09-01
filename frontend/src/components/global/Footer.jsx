import React from 'react';

import facebook_icon from '/src/assets/facebook_icon.png';
import twitter_icon from '/src/assets/twitter_icon.png';
import linkedin_icon from '/src/assets/linkedin_icon.png';

const Footer = () => {
  return (
    <footer className="bg-[#323232] text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between md:items-start items-center space-y-8 md:space-y-0">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start">
          <img src="/logo.png" alt="Job Board Logo" className="h-40 w-40 mb-4 bg-transparent" />
        </div>

        {/* Company, Resources, and Get in Touch in a single row on larger screens */}
        <div className="flex flex-col md:flex-row md:space-x-8 w-full justify-between text-center md:text-left">
          {/* Company Links */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h2 className="font-bold text-xl mb-4">Company</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Contact</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Blog</a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <h2 className="font-bold text-xl mb-4">Resources</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">Job Listings</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Employer Profiles</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Resume Tips</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Interview Prep</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="font-bold text-xl mb-4">Get in Touch</h2>
            <ul>
              <li className="mb-2">
                <a href="tel:+44 20 7946 0958" className="hover:underline">+44 20 7946 0958</a>
              </li>
              <li className="mb-2">
                <a href="mailto:reach-us@jobboard.com" className="hover:underline">reach-us@jobboard.com</a>
              </li>
            </ul>
            <div className="flex mt-4">
              <a href="#" className="mr-4">
                <img src={facebook_icon} alt="Facebook" className="h-8 w-8" />
              </a>
              <a href="#" className="mr-4">
                <img src={twitter_icon} alt="Twitter" className="h-8 w-8" />
              </a>
              <a href="#">
                <img src={linkedin_icon} alt="LinkedIn" className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      <div className="text-center">
        <p>Copyright 2024 &copy; Jobboard.com - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
