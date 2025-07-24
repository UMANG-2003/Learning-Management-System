import { createContext, use, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
export const AppContext = createContext();
import { useNavigate } from "react-router-dom";

export const AppContextProvider = (props) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [allcourses, setallCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const navigate = useNavigate();

  const fetchCourses = () => {
    setallCourses(dummyCourses);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const value = {
    currency,
    allcourses,
    calculateRating,
    isEducator,
    setIsEducator,
    navigate,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
