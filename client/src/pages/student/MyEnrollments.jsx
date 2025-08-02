import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {Line} from "rc-progress";
import Footer from '../../components/student/Footer'

function MyEnrollments() {
  const { enrolledCourses, calculateCourseDuration,navigate} = useContext(AppContext);
  const [progressArray, setProgressArray] = useState([
    { lecturesCompleted: 2, totalLectures: 4 },
    { lecturesCompleted: 4, totalLectures: 5 },
    { lecturesCompleted: 1, totalLectures: 6 },
    { lecturesCompleted: 4, totalLectures: 4 },
    { lecturesCompleted: 2, totalLectures: 3 },
    { lecturesCompleted: 5, totalLectures: 6 },
    { lecturesCompleted: 10, totalLectures: 10 },
    { lecturesCompleted: 3, totalLectures: 7 },
  ]);

  return <>
    <div className="bg-black min-h-screen text-white px-4 md:px-36 py-20">
      <h2 className="text-2xl font-semibold mb-6">My Enrollments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-900 min-w-[600px]">
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
                    <p className="text-base font-medium">
                      {course.courseTitle}
                    </p>
                    <Line strokeColor={"red"} strokeWidth={2} percent={(progressArray[index].lecturesCompleted/progressArray[index].totalLectures)*100} className="bg-gray-100 rounded-full" />
                  </div>
                </td>
                <td className="px-4 py-4 text-sm">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-4 text-sm">
                  {progressArray[index] && (
                    <>
                      {`${progressArray[index].lecturesCompleted}/${progressArray[index].totalLectures}`}
                      <span className="text-gray-400"> - Lectures</span>
                    </>
                  )}
                </td>
                <td className="px-4 py-4">
                  <button className={`${progressArray[index].lecturesCompleted !== progressArray[index].totalLectures ? "bg-blue-600 hover:bg-blue-700" : "bg-green-600 hover:bg-green-700"} text-white px-3 py-1 rounded text-sm w-[100px]`} onClick={()=>navigate("/player/"+course._id)}>
                    {(progressArray[index].lecturesCompleted===progressArray[index].totalLectures)? "Completed":"Ongoing"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Footer />
  </>

  
}

export default MyEnrollments;
