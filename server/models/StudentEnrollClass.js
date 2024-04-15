import mongoose from "mongoose";
import { studentSchema, Student } from "./studentmodel.js";

// Define the schema for the StudentEnrollClass collection
const studentEnrollClassSchema = new mongoose.Schema({
  class: {
    type: String,
    require: true,
  },

  teacher: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now(),
  },

  student: {
    type: studentSchema,
    require: true,
  },
});

// Create the StudentEnrollClass model
export const StudentEnrollClass = mongoose.model(
  "StudentEnrollClass",
  studentEnrollClassSchema
);
