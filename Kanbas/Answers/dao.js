import model from "./model.js";

export const createAnswers = (answer) => {
    delete answer._id
    return model.create(answer);
}

export const findAnswersByQuizzesIdAndUserId = (QuizzesId, userId) => model.find({
    "quizzesId": QuizzesId,
    "userId": userId
});