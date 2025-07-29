import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faPlay } from "@fortawesome/free-solid-svg-icons";

function CourseDetails() {
  const { id } = useParams();
  const { allcourses } = useContext(AppContext);
  const [course, setCourse] = useState(null);
  const {
    calculateRating,
    calculateNoOfLectures,
    calculateChapterTime,
    calculateCourseDuration,
    humanizeDuration,
  } = useContext(AppContext);

  const fetchCourseDetails = async () => {
    const foundCourse = allcourses.find((c) => c._id === id);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [allcourses, id]);

  if (!course) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-36 py-10 flex flex-col md:flex-row gap-10 items-start relative">
      <div className="absolute inset-0 bg-black opacity-80 -z-10"></div>
      {/* Left column */}
      <div className="max-w-xl z-10 text-white">
        <h1 className="text-3xl font-bold mb-4">{course.courseTitle}</h1>
        <p
          className="md:text-base leading-relaxed py-4 text-sm"
          dangerouslySetInnerHTML={{
            __html: course.courseDescription.slice(0, 200),
          }}
        ></p>

        <div className="flex items-center space-x-2">
          <p>{calculateRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <img
                src={
                  index < Math.floor(calculateRating(course))
                    ? "https://pngimg.com/d/star_PNG41507.png"
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
                }
                className="w-3.5 h-3.5"
                alt="Star"
                key={index}
              />
            ))}
          </div>
          <p className="text-gray-500">
            ({course.courseRatings.length}
            {course.courseRatings.length > 1 ? " ratings" : " rating"})
          </p>
          <p className="px-2">
            {course.enrolledStudents.length}{" "}
            {course.enrolledStudents.length > 1 ? "students" : "student"}{" "}
            enrolled
          </p>
        </div>
        <p className="text-sm">
          Course by <span className="text-blue-500 underline">Artemis</span>
        </p>
        <div className="pt-8 text-gray-200">
          <h2 className="text-xl font-semibold">Course Structure</h2>
          <div className="pt-4">
            {course.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-4 mb-4 select-none hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center ">
                    <FontAwesomeIcon
                      className="cursor-pointer"
                      icon={faAngleDown}
                    />
                    <p className="text-xs  mx-2 my-3 font-medium md:text-base">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-xs md:text-base">
                    {chapter.chapterContent.length} lectures -{" "}
                    <span>{calculateChapterTime(chapter)}</span>
                  </p>
                </div>
                <div className="overow-hidden transition-all duration-300 max-h-96">
                  <ul className="list-disc md:pl-10 pl-4 pr-4 text-gray-300 border-t border-gray-700">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 mb-2 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer mt-4 w-full px-4"
                      >
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="text-gray-400 mr-2 mt-1"
                        />
                        <div className="flex justify-between w-full">
                          <p className="text-sm md:text-base">
                            {lecture.lectureTitle}
                          </p>
                          <div className="flex items-center justify-between gap-2 text-xs md:text-default">
                            {lecture.isPreviewFree && (
                              <p className="text-blue-500 cursor-pointer">
                                Preview{" "}
                              </p>
                            )}
                            <p>
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right column */}
      <div className="flex-1 z-10"></div>
    </div>
  );
}

export default CourseDetails;
