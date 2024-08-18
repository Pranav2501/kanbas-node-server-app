import model from "./model.js";

export const createQuizzes = (quizzes) => {
    delete quizzes._id
    return model.create(quizzes);
}

export const deleteQuizzes = (quizzesId) => model.deleteOne({_id: quizzesId});

export const updateQuizzes = (quizzesId, quizzes) => model.findByIdAndUpdate(quizzesId, quizzes, {new: true});

export const findQuizzesByCourseId = (courseId) => model.find({"course": courseId}).populate("questions").exec();

export const findQuizzesById = (quizzesId) => model.findById(quizzesId).populate("questions").exec();