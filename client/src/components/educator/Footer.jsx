import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 px-6 flex flex-col md:flex-row items-center justify-between">
      <p className="text-sm">© 2025 Readme. All rights reserved.</p>

      <img src="/logo.png" alt="Readme Logo" className="h-6 mt-2 md:mt-0" />
    </footer>
  );
}

export default Footer;
