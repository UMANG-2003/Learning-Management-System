import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const isCourseListPage = window.location.pathname.includes("/course-list");
  const { user } = useUser();
  const { signOut, openSignIn } = useClerk();
  return (
    <nav
      className="flex justify-between items-center  px-2  sm:px-4 md:px-14 lg:px-36 py-3 border-b-2 border-gray-800 shadow-2xl shadow-gray-100 bg-gray-950  
      "
    >
      <img
        src="/logo.png"
        alt="Logo"
        className="w-28 lg:w-40 cursor-pointer rounded-4xl"
      />
      <div className="hidden  md:flex items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {user && (
            <>
              {" "}
              <button>Become Educator</button>
              <div>|</div>
              <Link to="/my-enrollments">My Enrollments</Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton className="text-gray-500" />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-white px-5 py-2 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>

      {/* phone screen */}
      <div className="md:hidden  flex items-center gap-2 sm:gap-5 text-gray-500">
        <div className="flex items-center gap-1 sm:gap-4">
          {user && (
            <>
              <button className="max-md:text-xs ">Become Educator</button>
              <div>|</div>
              <Link className="max-md:text-xs " to="/my-enrollments">
                My Enrollments
              </Link>
            </>
          )}
        </div>
        {user ? (
          <UserButton className="text-gray-500" />
        ) : (
          <button
            onClick={() => openSignIn()}
            className="bg-blue-600 text-xs text-white px-3 py-3 rounded-full"
          >
            Create Account
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
