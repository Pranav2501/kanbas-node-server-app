import mongoose from "mongoose";
import QuestionsModel from "../Questions/model.js"

const quizzesSchema = new mongoose.Schema({
        title: String,
        course: String,
        type: {
            type: String,
            default: "Graded Quiz",
            enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"]
        },
        description: String,
        points: Number,
        assignmentGroup: {
            type: String,
            default: "Quizzes",
            enum: ["Quizzes", "Exams", "Assignments", "Project"]
        },
        shuffleAnswers: {
            type: Boolean,
            default: true
        },
        timeLimit: {
            type: Number,
            default: 20 // unit minutes
        },
        multipleAttempts: {
            type: Boolean,
            default: false
        },
        manysAttempts: {
            type: Number,
            default: 1
        },
        showCorrectAnswers: {
            type: Boolean,
            default: true
        },
        accessCode: {
            type: String,
            default: ""
        },
        oneQuestionAtTime: {
            type: Boolean,
            default: true
        },
        webcamRequired: {
            type: Boolean,
            default: false
        },
        lockQuestionsAfterAnswering: {
            type: Boolean,
            default: false
        },
        publish: {
            type: Boolean,
            default: false
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "QuestionsModel"
            }
        ],
        available: Date,
        due: Date,
        until: Date,
    },
    {collection: "quizzes"}
);

export default quizzesSchema;