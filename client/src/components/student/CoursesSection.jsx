import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";
import { useContext } from "react";

function CoursesSection() {
  const { allcourses } = useContext(AppContext);

  return (
    <div className="text-center">
      <h1 className="text-gray-500 mt-20 md:text-3xl text-xl">
        Explore Our Courses
      </h1>
      <p className="text-gray-600 mt-4">
        Choose from a variety of courses to enhance your skills.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10 md:mx-20 mx-5">
        {allcourses?.length > 0 ? (
          allcourses
            .slice(0, 4)
            .map((course, index) => (
              <CourseCard key={course._id || index} course={course} />
            ))
        ) : (
          <p className="col-span-full text-gray-500">No courses available</p>
        )}
      </div>

      <Link
        to="/course-list"
        className="inline-block mt-6 text-blue-500 hover:underline border-2 border-gray-900 px-6 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors"
      >
        View All Courses
      </Link>
    </div>
  );
}

export default CoursesSection;
