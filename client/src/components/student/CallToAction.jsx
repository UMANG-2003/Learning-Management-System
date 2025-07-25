import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function CallToAction() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center  text-white py-10 px-5 md:px-20">
        <h2 className="text-2xl font-bold">Join Our Learning Community</h2>
        <p className="mt-2 w-[80%] max-md:text-sm max-md:hidden">
          Sign up today and take your skills to the next level! Unlock expert
          insights, sharpen your techniques, and join a community that’s as
          driven as you are. The path to mastery starts here—let’s elevate your
          potential together.
        </p>
        <div className="flex gap-4 items-center">
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer">
            Get Started
          </button>
          <button className="mt-4 bg-white text-black py-2 px-4 rounded hover:bg-gray-200 cursor-pointer flex items-center gap-2">
            Learn more <FontAwesomeIcon icon={faArrowUp} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CallToAction;
