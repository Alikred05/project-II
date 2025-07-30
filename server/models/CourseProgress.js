import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  lectureCompleted: [
    {
      type: mongoose.Schema.Types.ObjectId, // assuming lecture IDs are ObjectIds
      ref: "Lecture", // if you have a Lecture model
    },
  ],
}, { timestamps: true, minimize: false });

export const CourseProgress = mongoose.model("CourseProgress", courseProgressSchema);
