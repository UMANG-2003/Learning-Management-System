import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

function CourseCard({ course }) {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link
      to={`/courses/${course._id}`}
      className="border border-gray-500 bg-green-50 pb-2 overflow-hidden rounded-lg hover:shadow-2xl transition-shadow shadow-purple-700 duration-300"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img
        className="w-full"
        src={course.courseThumbnail}
        alt={course.courseTitle || "Course Thumbnail"}
      />
      <div className="p-4 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator?.name || "Unknown Educator"}</p>

        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={
                  index < Math.floor(calculateRating(course))
                    ? "https://pngimg.com/d/star_PNG41507.png"
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
                }
                className="w-3.5 h-3.5"
                alt="Star"
              />
            ))}
          </div>
          <p className="text-gray-500">
            {course.courseRatings?.length || 0} Ratings
          </p>
        </div>

        <p className="text-gray-800 font-semibold text-base">
          {currency}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
