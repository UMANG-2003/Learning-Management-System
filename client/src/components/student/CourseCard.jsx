import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai"; 

function CourseCard({ course }) {
  const { currency, calculateRating } = useContext(AppContext);

  const rating = calculateRating(course) || 0;
  const discount = course.discount || 0;
  const finalPrice = (
    course.coursePrice -
    (discount * course.coursePrice) / 100
  ).toFixed(2);

  return (
    <Link
      to={`/courses/${course._id}`}
      className="border border-gray-200 bg-white pb-2 overflow-hidden rounded-lg hover:shadow-xl transition duration-300"
      onClick={() => window.scrollTo(0, 0)}
    >
      <img
        className="w-full h-40 object-cover"
        src={course.courseThumbnail || "/default-thumbnail.png"}
        alt={course.courseTitle || "Course Thumbnail"}
      />
      <div className="p-4 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">{course.educator?.name || "Unknown Educator"}</p>

        <div className="flex items-center space-x-2 mt-1">
          <p className="font-medium">{rating.toFixed(1)}</p>
          <div className="flex">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(rating) ? (
                <AiFillStar key={index} className="text-yellow-500 w-4 h-4" />
              ) : (
                <AiOutlineStar key={index} className="text-yellow-500 w-4 h-4" />
              )
            )}
          </div>
          <p className="text-gray-500 text-sm">
            {course.courseRatings?.length || 0} Ratings
          </p>
        </div>

        <p className="text-gray-800 font-semibold text-base mt-2">
          {currency}{finalPrice}
        </p>
      </div>
    </Link>
  );
}

export default CourseCard;
