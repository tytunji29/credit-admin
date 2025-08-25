
import React,{ useEffect, useState } from "react";

const Header = () => {
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    const storedName = sessionStorage.getItem("fullName");
    if (storedName) {
      setFullName(storedName);
    }
  }, []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="bg-cream h-16 flex items-center justify-between px-6 shadow-md">
      {/* Hamburger for collapsing sidebar */}
      <button className="mr-4 md:hidden">
        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
        <span className="block w-6 h-0.5 bg-gray-700"></span>
      </button>

      {/* Bouncing title */}
      <div className="flex-1 overflow-hidden mx-4">
        <div className="whitespace-nowrap animate-bounce-slide text-gray-800 font-semibold text-xl">
          Credit Phone Lock Admin
        </div>
      </div>

      {/* Profile */}
      <div className="relative">
       <button
  onClick={toggleDropdown}
  className="flex items-center space-x-2 focus:outline-none"
>
  {/* Profile image */}
  {/* <img
    src="https://via.placeholder.com/32"
    alt="Profile"
    className="w-8 h-8 rounded-full border-2 border-gray-300"
  /> */}
  
  {/* Name */}
   {fullName ? (
          <span className="hidden md:inline text-gray-800 font-medium">Welcome, {fullName}</span>
        ) : (
          <span>Admin</span>
        )}
 

  {/* Dropdown arrow */}
  <svg
    className="w-4 h-4 text-gray-600"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
</button>


        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Edit Profile
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Tailwind CSS animation */}
      <style>
        {`
          @keyframes bounce-slide {
            0% { transform: translateX(0%); }
            50% { transform: translateX(calc(100% - 100vw)); }
            100% { transform: translateX(0%); }
          }
          .animate-bounce-slide {
            display: inline-block;
            animation: bounce-slide 6s ease-in-out infinite;
          }
        `}
      </style>
    </header>
  );
};

export default Header;
