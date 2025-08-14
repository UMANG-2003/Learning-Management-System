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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-6 shadow-card border border-blue-500 p-4 rounded-md bg-white w-full"
          >
            <FontAwesomeIcon
              icon={stat.icon}
              className="text-blue-500 text-3xl flex-shrink-0"
            />
            <div className="truncate">
              <p className="text-xl sm:text-2xl font-medium text-gray-700">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Enrolments */}
      <div className="w-full">
        <h2 className="pb-4 text-lg font-semibold text-gray-800">
          Latest Enrolments
        </h2>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <div className="w-full rounded-xl bg-white shadow-lg border border-gray-100 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-800 text-sm">
                  <th className="px-6 py-3 font-semibold text-center">#</th>
                  <th className="px-6 py-3 font-semibold text-left">Student Name</th>
                  <th className="px-6 py-3 font-semibold text-left">Course Title</th>
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
                    <td className="px-6 py-4 text-center text-gray-500">
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

        {/* Mobile Card View */}
        <div className="md:hidden flex flex-col gap-4 pb-4">
          {dashboardData.enrolledStudentsData.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex items-center gap-4"
            >
              <img
                src={item.student.imageUrl}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-900">
                  {item.student.name}
                </span>
                <span className="text-sm text-gray-500">{item.courseTitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Dashboard;
