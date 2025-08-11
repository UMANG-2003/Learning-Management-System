import React from "react";
import Navbar from "../../components/educator/Navbar";
import Footer from "../../components/educator/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/educator/Sidebar";
function Educator() {
  return (
    <div>
      <div className="text-default min-h-screen bg-white">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Educator;
