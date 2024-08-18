import mongoose from "mongoose";
import QuizzesModel from "../Quizzes/model.js"

const questionsSchema = new mongoose.Schema({
        quizzesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizzesModel"
        },
        title: String,
        type: {
            type: String,
            default: "Multiple Choice",
            enum: ["Multiple Choice", "True/False", "Fill in Blanks"]
        },
        description: String,
        points: {
            type: Number,
            default: 0
        },
        answers: [String],
        correctAnswer: String
    },
    {collection: "questions"}
);

export default questionsSchema;