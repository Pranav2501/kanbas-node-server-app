import mongoose from "mongoose";

const answersSchema = new mongoose.Schema({
        quizzesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QuizzesModel"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserModel"
        },
        points: {
            type: Number,
            default: 0
        },
        userAnswers: [
            {
                questionId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "QuestionsModel"
                },
                answer: String,
                correct: Boolean
            }
        ],
        created: {
            type: Date,
            default: Date.now
        }
    },
    {collection: "answers"}
);

export default answersSchema;