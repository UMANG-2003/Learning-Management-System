import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import Stripe from "stripe";
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const userEnrolledCourses = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const userData = await User.findById(userId).populate("enrolledCourses");

    res.json({ success: true, enrolledCourses: userData.enrolledCourses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const purchaseCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    if (!courseId) {
      return res.json({ success: false, message: "Course ID is required" });
    }

    const userData = await User.findById(userId);
    const courseData = await Course.findById(courseId);

    if (!userData || !courseData) {
      return res.json({ success: false, message: "Data Not Found" });
    }

    if (userData.enrolledCourses.includes(courseId)) {
      return res.json({ success: false, message: "Already Enrolled" });
    }

    const amount = Number(
      (
        courseData.coursePrice -
        (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2)
    );

    // Create purchase record in DB
    const newPurchase = await Purchase.create({
      courseId: courseData._id,
      userId,
      amount,
      status: "pending",
    });

    // Stripe setup
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY?.toLowerCase() || "usd";

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: courseData.courseTitle,
              description: courseData.courseDescription || "Course purchase",
            },
            unit_amount: Math.round(amount * 100), // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/payment-success?purchaseId=${newPurchase._id}`,
      cancel_url: `${origin}/payment-failed?purchaseId=${newPurchase._id}`,
      metadata: {
        userId,
        courseId: courseData._id.toString(),
        purchaseId: newPurchase._id.toString(),
      },
    });

    return res.json({ success: true, sessionId: session.id, url: session.url });
  } catch (error) {
    console.error("Error in purchaseCourse:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};



export const updateUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId, lectureId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });

    if (progressData) {
      if (progressData.lectureCompleted.includes(lectureId)) {
        return res.json({
          success: true,
          message: "Lecture Already Completed",
        });
      }
      progressData.lectureCompleted.push(lectureId);
      await progressData.save();
    } else {
      await CourseProgress.create({
        userId,
        courseId,
        lectureCompleted: [lectureId],
      });
    }
    res.json({ success: true, message: "Progress Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getUserCourseProgress = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const { courseId } = req.body;
    const progressData = await CourseProgress.findOne({ userId, courseId });
    res.json({ success: true, progressData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const addUserRating = async (req, res) => {
  const userId = req.auth.userId;
  const { courseId, rating } = req.body;

  if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: "Invalid Details" });
  }

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.json({ success: false, message: "Course not found." });
    }

    const user = await User.findById(userId);

    if (!user || !user.enrolledCourses.includes(courseId)) {
      return res.json({
        success: false,
        message: "User has not purchased this course.",
      });
    }

    const existingRatingIndex = course.courseRatings.findIndex(
      (r) => r.userId == userId
    );

    if (existingRatingIndex > -1) {
      course.courseRatings[existingRatingIndex].rating = rating;
    } else {
      course.courseRatings.push({ userId, rating });
    }

    await course.save();
    return res.json({ success: true, message: "Rating added" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
