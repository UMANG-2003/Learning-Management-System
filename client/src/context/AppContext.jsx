import { createContext, use, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
export const AppContext = createContext();
import { useNavigate } from "react-router-dom";

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [allcourses, setallCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses,setEnrolledCourses]=useState([]);
  const navigate = useNavigate();

  const fetchCourses = () => {
    setallCourses(dummyCourses);
  };

  const humanizeDuration = (duration, options) => {
    const ms = duration % 1000;
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
    let result = '';
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0) result += `${minutes}m `;
    if (seconds > 0) result += `${seconds}s`;
    
    return result.trim();
  };

  const calculateRating = (course) => {
    if (course.courseRatings.length === 0) {
      return 0;
    }
    let total = 0;
    course.courseRatings.forEach((rating) => {
      total += rating.rating;
    });
    return total / course.courseRatings.length;
  };
 
  const calculateChapterTime=(chapter)=>{
   let time=0;
   chapter.chapterContent.map((lecture)=>{
     time+=lecture.lectureDuration;
   })
   return humanizeDuration(time*60*1000,{units:["h","m"]});
  }


  const calculateCourseDuration=(course)=>{
   let time=0;
   course.courseContent.map((chapter)=>{
    chapter.chapterContent.map((lecture)=>{
     time+=lecture.lectureDuration;
    })
   })
   return humanizeDuration(time*60*1000,{units:["h","m"]});
  }
 
  const calculateNoOfLectures=(course)=>{
   let totalLectures=0;
    course.courseContent.forEach((chapter)=>{
      if(Array.isArray(chapter.chapterContent)){
        totalLectures+=chapter.chapterContent.length;
      }
    })
    return totalLectures;
  }

  const fetchUserEnrolledCourses = async ()=>{
    setEnrolledCourses(dummyCourses)
  }

  useEffect(() => {
    fetchCourses();
    fetchUserEnrolledCourses();
  }, []);


  const value = {
    currency,
    allcourses,
    calculateRating,
    isEducator,
    setIsEducator,
    navigate,
    calculateChapterTime,
    calculateCourseDuration,  
    calculateNoOfLectures,
    humanizeDuration,
    enrolledCourses,
    setEnrolledCourses,
    fetchUserEnrolledCourses
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
