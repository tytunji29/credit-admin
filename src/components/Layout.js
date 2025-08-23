import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 transform-none">
        <Header />
        <main className="flex-1 p-6 bg-gray-50 text-gray-900 antialiased subpixel-antialiased">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
