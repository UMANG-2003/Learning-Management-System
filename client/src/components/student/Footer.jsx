import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-4 sm:px-8 md:px-20 lg:px-36 text-left w-full ">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start items-center py-6 gap-8">
        <div className="flex flex-col items-center md:items-start space-y-4 w-full md:w-1/3">
          <img className="w-28 sm:w-32 h-auto" src="/logo.png" alt="Logo" />
          <p className="mt-4 text-center md:text-left text-xs sm:text-sm text-gray-400">
            Readme is a leading provider of educational resources and services,
            dedicated to empowering students and educators worldwide.
          </p>
        </div>

        <div className="flex flex-col  space-y-4 w-full md:w-1/3">
          <h2 className="text-base sm:text-lg font-semibold ">Company</h2>
          <ul className="flex flex-col  space-y-2 w-full text-xs sm:text-sm text-gray-400">
            <li className="bg-gray-900 p-2 md:w-62 hover:bg-gray-700">
              <a href="#">Home</a>
            </li>
            <li className="bg-gray-900 p-2 md:w-62 hover:bg-gray-700">
              <a href="#">About Us</a>
            </li>
            <li className="bg-gray-900 p-2 md:w-62 hover:bg-gray-700">
              <a href="#">Services</a>
            </li>
            <li className="bg-gray-900 p-2 md:w-62 hover:bg-gray-700">
              <a href="#">Contact</a>
            </li>

            <li className="bg-gray-900 p-2 md:w-62 hover:bg-gray-700">
              <a href="#">Help Center</a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start  w-full md:w-1/3">
          <h2 className="text-base sm:text-lg font-semibold text-center md:text-left">
            Subscribe to our newsletter
          </h2>
          <form className="flex flex-col sm:flex-row items-center w-full gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto px-4 py-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-center md:text-left text-xs sm:text-sm text-gray-400">
            Stay updated with our latest news and offers.
          </p>
          <p className="mt-2 text-center md:text-left text-xs sm:text-sm text-gray-400">
            We respect your privacy and will never share your information.
          </p>
          <p className="mt-2 text-center md:text-left text-xs sm:text-sm text-gray-400">
            You can unsubscribe at any time.
          </p>
          <p className="mt-2 text-center md:text-left text-xs sm:text-sm text-gray-400">
            For more information, visit our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
          <p className="mt-2 text-center md:text-left text-xs sm:text-sm text-gray-400">
            By subscribing, you agree to our{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
      <hr className="border-gray-700" />
      <p className="text-xs sm:text-sm py-4 text-gray-400 text-center">
        © 2025 Readme. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
