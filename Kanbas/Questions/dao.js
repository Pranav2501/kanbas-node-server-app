import model from "./model.js";

export const createQuestions = (question) => {
    delete question._id
    return model.create(question);
}

export const deleteQuestions = (questionId) => model.deleteOne({_id: questionId});

export const updateQuestions = (questionId, question) => model.updateOne({_id: questionId}, {$set: question});

export const findAllQuestions = () => model.find();

export const findQuestionsByQuizzesId = (QuizzesId) => model.find({"quizzesId": QuizzesId});

export const findQuestionsById = (questionId) => model.findById(questionId);