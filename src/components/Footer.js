import React from "react";

const Footer = () => {
  return (
    <footer className="bg-cream h-12 flex items-center justify-center shadow-inner">
      <p className="text-gray-700 text-sm">
        © {new Date().getFullYear()} Credit Phone Lock Admin. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
