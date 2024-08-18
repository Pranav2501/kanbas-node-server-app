import mongoose from "mongoose";
const {Schema} = mongoose;

const enrollCourseSchema = new mongoose.Schema({
        user: {type: Schema.Types.ObjectId, ref: "UserModel"},
        course: {type: Schema.Types.ObjectId, ref: "CourseModel"}
    },
    {collection: "enroll_courses"}
);

export default enrollCourseSchema;