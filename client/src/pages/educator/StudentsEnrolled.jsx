import React, { useEffect, useState } from "react";
import { dummyStudentEnrolled } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

function StudentsEnrolled() {
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const {backendUrl,getToken,isEducator}=useContext(AppContext);

 const fetchEnrolledStudents = async () => {
  try {
    const token = await getToken()
    const { data } = await axios.get(backendUrl + '/api/educator/enrolled-students', { headers: { Authorization: `Bearer ${token}` } })
    if (data.success){
      setEnrolledStudents(data.enrolledStudents.reverse())
    } else {
      toast.error(data.message)
    }

  } catch (error) {
    toast.error(error.message)
  }
}


  useEffect(() => {
    if(isEducator){
     fetchEnrolledStudents();
    }
  }, [isEducator]);

  return enrolledStudents ? (
    <div className="min-h-screen w-full flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-3 py-3 text-center hidden sm:table-cell">#</th>
              <th className="px-7 py-3 text-left">Student Name</th>
              <th className="px-3 py-3 text-left">Course Title</th>
              <th className="px-3 py-3 text-left hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {enrolledStudents.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-3 py-2 text-center hidden sm:table-cell font-medium text-gray-500">
                  {index + 1}
                </td>
                <td className="px-3 py-4 font-medium flex gap-1 items-center"><img src={item.student.imageUrl} className="w-8 rounded-full" alt="" />{item.student.name}</td>
                <td className="px-3 py-4">{item.courseTitle}</td>
                <td className="px-3 py-4 hidden sm:table-cell text-gray-500">
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default StudentsEnrolled;
