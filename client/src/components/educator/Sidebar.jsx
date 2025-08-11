import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "../../context/AppContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlus, faBook, faCheck } from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    { name: "Dashboard", path: "/educator/educator", icon: faHome },
    { name: "Add Course", path: "/educator/add-course", icon: faPlus },
    { name: "My Courses", path: "/educator/my-courses", icon: faBook },
    { name: "Student Enrolled", path: "/educator/student-enrolled", icon: faCheck }
  ];

  return isEducator && (
    <div className="md:w-64 w-16 border-r border-gray-800 min-h-screen bg-[#121212] py-2 flex flex-col">
      {menuItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.name}
          end={item.path === '/educator'}
          className={({ isActive }) =>
            `flex items-center md:flex-row flex-col md:justify-start justify-center py-3 md:px-6 gap-3 text-sm transition-colors duration-200 ${
              isActive
                ? "text-purple-400 border-r-2 border-purple-400 bg-[#1a1a1a]"
                : "text-gray-400 hover:text-purple-300 hover:bg-[#1a1a1a]"
            }`
          }
        >
          <FontAwesomeIcon icon={item.icon} />
          <p className="md:block hidden">{item.name}</p>
        </NavLink>
      ))}
    </div>
  );
}

export default Sidebar;
