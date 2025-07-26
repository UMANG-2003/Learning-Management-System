import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";


function CoursesSection() {
    const { allcourses } = React.useContext(AppContext);
    
  return (
    <div>
      <h1 className="text-gray-500 mt-20 md:text-3xl text-xl ">Explore Our Courses</h1>
      <p className="text-gray-600 mt-4">
        Choose from a variety of courses to enhance your skills.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-10 md:mx-20 mx-5">
        {allcourses.slice(0, 4).map((course,index) => ( <CourseCard key={index} course={course} /> ))}
      </div>

      <Link
        to="/course-list"
        className="inline-block mt-4 text-blue-500 hover:underline border-2 border-gray-900 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        View All Courses
      </Link>
    </div>
  );
}

export default CoursesSection;
