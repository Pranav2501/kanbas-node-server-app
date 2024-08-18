import model from "./model.js";

export const createCourse = (course) => {
    delete course._id
    return model.create(course);
}

export const deleteCourse = (objectId) => model.deleteOne({_id: objectId});

export const findAllEnrollCourses = () => model.find();

export const findEnrollCoursesByUserId = (userId) => model.find({user: userId}).populate("course").populate("user").exec();