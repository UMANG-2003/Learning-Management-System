import { useContext, useState, useEffect } from "react";
import { useActionData, useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/student/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faPlay,
  faAngleUp,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../../components/student/Footer";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import axios from "axios";
function CourseDetails() {
  const { id } = useParams();
  const { allcourses } = useContext(AppContext);
  const [course, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const {
    calculateRating,
    calculateNoOfLectures,
    calculateChapterTime,
    calculateCourseDuration,
    humanizeDuration,
    currency,
    backendUrl,
    userData,
    getToken,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/course/` + id);

      if (data.success) {
        setCourseData(data.courseData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const enrolledCourses = async () => {
    try {
      if (!userData) {
        return toast.warn("Login to Enroll");
      }
      if (!course) {
        return toast.error("Course not loaded yet");
      }
      if (isAlreadyEnrolled) {
        return toast.warn("Already Enrolled");
      }

      const token = getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/purchase`,
        { courseId: course._id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.session_url) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message || "Unable to start checkout session");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);
  useEffect(() => {
    if (userData && course) {
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(course._id));
    }
  }, [userData, course]);

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
      <div className="min-h-screen bg-black text-white px-4 sm:px-6 md:px-12 lg:px-36 py-10 md:py-20 flex flex-col-reverse md:flex-row gap-8 md:gap-10 items-start relative justify-between">
        <div className="absolute inset-0 bg-black opacity-80 -z-10"></div>
        {/* Left column */}
        <div className="w-full md:max-w-xl z-10 text-white">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
            {course.courseTitle}
          </h1>
          <p
            className="text-sm sm:text-base leading-relaxed py-2 sm:py-4"
            dangerouslySetInnerHTML={{
              __html: course.courseDescription.slice(0, 200),
            }}
          ></p>

          <div className="flex flex-wrap items-center space-x-2">
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
            Course by{" "}
            <span className="text-blue-500 underline">
              {course.educator.name}
            </span>
          </p>
          <div className="pt-6 sm:pt-8 text-gray-200">
            <h2 className="text-lg sm:text-xl font-semibold">
              Course Structure
            </h2>
            <div className="pt-3 sm:pt-4 ">
              {course.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-700 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 select-none hover:bg-gray-800 transition-colors"
                >
                  <div
                    className="flex items-center justify-between gap-2 mb-2 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center ">
                      <FontAwesomeIcon
                        icon={openSections[index] ? faAngleDown : faAngleUp}
                        className="cursor-pointer"
                      />
                      <p className="text-xs mx-2 my-2 sm:my-3 font-medium sm:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-xs sm:text-base">
                      {chapter.chapterContent.length} lectures -{" "}
                      <span>{calculateChapterTime(chapter)}</span>
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc pl-3 sm:pl-6 md:pl-10 pr-2 sm:pr-4 text-gray-300 border-t border-gray-700">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li
                          key={i}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-2 py-2 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer mt-2 sm:mt-4 w-full px-2 sm:px-4"
                        >
                          <FontAwesomeIcon
                            icon={faPlay}
                            className="text-gray-400 mr-2 mt-1"
                          />
                          <div className="flex flex-col sm:flex-row justify-between w-full">
                            <p className="text-sm sm:text-base">
                              {lecture.lectureTitle}
                            </p>
                            <div className="flex items-center justify-between gap-2 text-xs sm:text-default mt-1 sm:mt-0">
                              {lecture.isPreviewFree && (
                                <p
                                  className="text-blue-500 cursor-pointer"
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                >
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
          <div className="pt-6 sm:pt-8 px-2 sm:px-4 lg:px-8 text-gray-200">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
              Course Description
            </h3>
            <p
              className="text-xs sm:text-sm text-gray-600 leading-relaxed transition-all duration-300 ease-in-out"
              dangerouslySetInnerHTML={{
                __html: course.courseDescription,
              }}
            ></p>
          </div>
        </div>
        {/* Right column */}
        <div className="w-full sm:w-[430px] md:max-w-xl z-10 bg-black rounded-lg p-4 sm:p-6 text-white overflow-hidden shadow-2xl shadow-gray-600 mb-6 md:mb-0">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={course.courseThumbnail}
              alt=""
              className="w-full h-auto rounded-md"
            />
          )}
          <div className="pt-4 sm:pt-5 ">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon className="w-3.5 text-red-600" icon={faClock} />
              <p className="text-red-500 text-xs sm:text-sm">
                <span>5 days</span> left at this price
              </p>
            </div>

            <div className="pt-3 sm:pt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              <p className="text-xl sm:text-2xl font-bold mt-2">
                {currency}
                {(
                  course.coursePrice -
                  (course.discount * course.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                (Inclusive of all taxes)
              </p>
              <p className="text-base sm:text-lg font-semibold text-green-500 line-through">
                {currency}
                {course.coursePrice}
              </p>
              <p className="text-xs sm:text-sm text-gray-400">
                {course.discount}% off
              </p>
            </div>

            <div className="flex flex-wrap items-center text-xs sm:text-sm md:text-default gap-2 sm:gap-4 pt-2 sm:pt-4 text-gray-700">
              <div className="flex items-center gap-2">
                <img
                  src="https://pngimg.com/d/star_PNG41507.png"
                  alt=""
                  className="w-4 h-4 inline-block"
                />
                <p>{calculateRating(course)}</p>
              </div>
              <span>|</span>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Total Lectures</p>
                <p className="font-semibold">{calculateNoOfLectures(course)}</p>
              </div>
              <span>|</span>
              <div className="flex items-center gap-2">
                <p className="text-gray-400">Total Duration</p>
                <p className="font-semibold">
                  {calculateCourseDuration(course)}
                </p>
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <button
                className={`w-full py-2 sm:py-3 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                  isAlreadyEnrolled
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                onClick={enrolledCourses}
                disabled={isAlreadyEnrolled}
              >
                {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
              </button>

              <button
                className="w-full py-2 sm:py-3 px-4 bg-gray-700 text-white rounded-lg font-semibold mt-2 sm:mt-3 transition-colors duration-300 hover:bg-gray-600"
                onClick={() => {}}
              >
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className="pt-10 sm:pt-8 text-gray-200">
            <p className="text-gray-300 font-bold">What's in the course</p>
            <ul className="text-gray-700 list-disc p-4">
              <li>Lifetime access with free updates.</li>
              <li>Access on mobile and TV.</li>
              <li>Certificate of completion.</li>
              <li>24/7 support.</li>
              <li>30-day money-back guarantee.</li>
              <li>Access to private community.</li>
              <li>Exclusive webinars and Q&A sessions.</li>
              <li>Downloadable resources and materials.</li>
              <li>Access to future course updates.</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CourseDetails;
