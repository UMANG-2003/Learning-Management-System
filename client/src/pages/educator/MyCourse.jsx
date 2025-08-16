import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import axios from "axios";

function MyCourse() {
  const { currency, backendUrl, isEducator, getToken } = useContext(AppContext);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + "/api/educator/courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      data.success && setCourses(data.courses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if(isEducator){
    fetchEducatorCourses();
    }
  }, [isEducator]);

  if (loading) {
    return (
     <Loading />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-start md:p-8 p-4 bg-gray-50">
      <div className="w-full">
        <h2 className="pb-4 text-lg md:text-xl font-semibold text-gray-800">
          My Courses
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto w-full rounded-xl shadow-sm bg-white border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 text-left">
              <tr>
                <th className="px-4 py-3 font-medium truncate">All Courses</th>
                <th className="px-4 py-3 font-medium truncate">Earnings</th>
                <th className="px-4 py-3 font-medium truncate">Students</th>
                <th className="px-4 py-3 font-medium truncate">Published On</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr
                  key={course._id}
                  className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 truncate">
                    <span className="font-medium text-gray-900 flex gap-5">
                      <img
                        src={course.courseThumbnail}
                        className="w-12 h-12 object-cover rounded-md"
                        alt=""
                      />{" "}
                      {course.courseTitle}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {currency}{" "}
                    {Math.floor(
                      course.enrolledStudents.length *
                        (course.coursePrice -
                          (course.discount * course.coursePrice) / 100)
                    ).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {course.enrolledStudents.length}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-6 text-center text-gray-400"
                  >
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-3"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-16 h-16 rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {course.courseTitle}
                    </span>
                    <span className="text-sm text-gray-500">
                      Published on{" "}
                      {new Date(course.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>
                    Earnings:{" "}
                    <strong>
                      {currency}{" "}
                      {Math.floor(
                        course.enrolledStudents.length *
                          (course.coursePrice -
                            (course.discount * course.coursePrice) / 100)
                      ).toLocaleString()}
                    </strong>
                  </span>
                  <span>
                    Students: <strong>{course.enrolledStudents.length}</strong>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">
              No courses found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourse;
