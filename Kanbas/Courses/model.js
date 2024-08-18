import mongoose from "mongoose";
import schema from "./schema.js";

const CourseModel = mongoose.model("CourseModel", schema);


export default CourseModel;