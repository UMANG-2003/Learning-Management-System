import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { dummyDashboardData } from "../../assets/assets";
import Loading from "../../components/student/Loading";
import {
  faUser,
  faBook,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  const { currency } = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
 
    setDashboardData(dummyDashboardData);
  }, []);

  const stats = dashboardData
    ? [
        {
          label: "Total Enrolments",
          value: dashboardData.enrolledStudentsData.length,
          icon: faUser,
        },
        {
          label: "Total Courses",
          value: dashboardData.totalCourses,
          icon: faBook,
        },
        {
          label: "Total Earnings",
          value: `${currency}${dashboardData.totalEarnings}`,
          icon: faDollarSign,
        },
      ]
    : [];

  return dashboardData ? (
    <div className="min-h-screen flex flex-col items-start gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0">
     
      <div className="flex flex-wrap gap-10 items-center">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-8 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white"
          >
            <FontAwesomeIcon
              icon={stat.icon}
              className="text-blue-500 text-3xl"
            />
            <div>
              <p className="text-2xl font-medium text-gray-700">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full">
        <h2 className="pb-4 text-lg font-semibold text-gray-800">
          Latest Enrolments
        </h2>
        <div className="overflow-hidden max-w-4xl w-full rounded-xl bg-white shadow-lg border border-gray-100">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-800 text-sm">
                <th className="px-6 py-3 font-semibold text-center hidden sm:table-cell">
                  #
                </th>
                <th className="px-6 py-3 font-semibold text-left">
                  Student Name
                </th>
                <th className="px-6 py-3 font-semibold text-left">
                  Course Title
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.enrolledStudentsData.map((item, index) => (
                <tr
                  key={index}
                  className={`transition-colors duration-200 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-4 text-center hidden sm:table-cell text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <img
                      src={item.student.imageUrl}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                    />
                    <span className="truncate font-medium text-gray-900">
                      {item.student.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700 truncate">
                    {item.courseTitle}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
