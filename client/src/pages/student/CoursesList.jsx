import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import SearchBar from "../../components/student/SearchBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/student/CourseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/student/Footer";

function CoursesList() {
  const { navigate, allcourses } = useContext(AppContext);
  const { input } = useParams();
  const [searchTerm, setSearchTerm] = useState([]);
  useEffect(() => {
    if (allcourses && allcourses.length > 0) {
      const tempcourses = allcourses.slice();
      input
        ? setSearchTerm(
            tempcourses.filter((item) =>
              item.courseTitle.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setSearchTerm(tempcourses);
    }
  }, [allcourses, input]);
  return (
    <div className="bg-black min-h-screen">
      <div className="flex items-center justify-between px-5 py-5 max-md:flex-col max-md:items-start">
        <div>
          <h2 className="text-white">Courses List</h2>
          <p className="text-gray-500">
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/")}
            >
              Home
            </span>{" "}
            / <span>Courses-List</span>
          </p>
        </div>
        <div className="w-[35vw] max-md:w-full max-md:mt-5">
          <SearchBar data={input} />
        </div>
      </div>
      {input && (
        <div className="inline-flex items-center gap-4 px-4 py-2 border mt-2 text-gray-300 ml-5 bg-gray-800 rounded-full max-md:text-sm">
          <p>{input}</p>
          <FontAwesomeIcon
            icon={faX}
            onClick={() => navigate("/course-list")}
            className="cursor-pointer"
          />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5 py-5">
        {searchTerm.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default CoursesList;
