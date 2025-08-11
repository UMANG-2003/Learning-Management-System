import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import {
  faAngleDown,
  faPlay,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../../components/student/Loading";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import Rating from "../../components/student/Rating";

function Player() {
  const { enrolledCourses, calculateChapterTime, humanizeDuration } =
    useContext(AppContext);
  const { courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    const foundCourse = enrolledCourses.find((c) => c._id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    }
  }, [courseId, enrolledCourses]);

  if (!course) {
    return <Loading />;
  }

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-10 flex flex-col-reverse lg:grid lg:grid-cols-2 gap-8 lg:gap-12 lg:px-36 bg-black text-white">
        {/* Left column */}
        <div>
          <h2 className="text-lg sm:text-xl font-semibold">Course Structure</h2>
          <div className="pt-3 sm:pt-4">
            {course.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-700 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 select-none hover:bg-gray-800 transition-colors"
              >
                {/* Chapter header */}
                <div
                  className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
                  onClick={() => toggleSection(index)}
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={openSections[index] ? faAngleDown : faAngleUp}
                      className="cursor-pointer"
                    />
                    <p className="text-xs sm:text-sm lg:text-base mx-2 font-medium">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm lg:text-base">
                    {chapter.chapterContent.length} lectures -{" "}
                    <span>{calculateChapterTime(chapter)}</span>
                  </p>
                </div>

                {/* Chapter lectures */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSections[index] ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <ul className="list-disc pl-3 sm:pl-5 md:pl-8 pr-2 sm:pr-4 text-gray-300 border-t border-gray-700">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li
                        key={i}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer mt-2 sm:mt-3 w-full px-2 sm:px-4"
                      >
                        <FontAwesomeIcon
                          icon={faPlay}
                          className="text-gray-400 mr-2 mt-1"
                        />
                        <div className="flex flex-col sm:flex-row justify-between w-full">
                          <p className="text-sm sm:text-base">
                            {lecture.lectureTitle}
                          </p>
                          <div className="flex items-center justify-between gap-2 text-xs sm:text-sm mt-1 sm:mt-0">
                            {lecture.lectureUrl && (
                              <p
                                className="text-blue-500 cursor-pointer"
                                onClick={() =>
                                  setPlayerData({
                                    ...lecture,
                                    chapter: index + 1,
                                    lecture: i + 1,
                                  })
                                }
                              >
                                Watch
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
          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this Course</h1>
            <Rating initialRating={0} />
          </div>
        </div>

        {/* Right column (Video Player) */}
        <div className="lg:mt-10 w-full">
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                opts={{ playerVars: { autoplay: 1 } }}
                iframeClassName="w-full aspect-video rounded-lg"
              />
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-3 gap-2">
                <p className="text-sm sm:text-base">
                  {playerData.chapter}.{playerData.lecture}{" "}
                  {playerData.lectureTitle}
                </p>
                <button className="text-blue-600 text-sm sm:text-base">
                  {false ? "Completed" : "Mark Completed"}
                </button>
              </div>
            </div>
          ) : (
            <img
              src={course ? course.courseThumbnail : ""}
              alt="Course Thumbnail"
              className="w-full rounded-lg"
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Player;
