import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

function MyEnrollments() {
  const { enrolledCourses, calculateCourseDuration } = useContext(AppContext);

  return (
    <div className="bg-black min-h-screen text-white px-4 md:px-36 pt-10">
      <h2 className="text-2xl font-semibold mb-6">My Enrollments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead className="bg-gray-800 text-gray-300 text-sm uppercase">
            <tr>
              <th className="px-4 py-3 font-semibold text-left">Course</th>
              <th className="px-4 py-3 font-semibold text-left">Duration</th>
              <th className="px-4 py-3 font-semibold text-left">Completed</th>
              <th className="px-4 py-3 font-semibold text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td className="px-4 py-4 flex items-center gap-4">
                  <img
                    src={course.courseThumbnail}
                    className="w-14 sm:w-20 md:w-24 rounded-md object-cover"
                    alt="thumbnail"
                  />
                  <div>
                    <p className="text-base font-medium">{course.courseTitle}</p>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-4 text-sm">
                  5/10 <span className="text-gray-400">Lectures</span>
                </td>
                <td className="px-4 py-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    Ongoing
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyEnrollments;
