import * as dao from "./dao.js";
import {findQuestionsByQuizzesId} from "../Questions/dao.js";
import {findQuizzesById} from "../Quizzes/dao.js";

export default function AnswersRoutes(app) {

    app.post("/api/quizzes/:qid/answers", async (req, res) => {
        const {qid} = req.params;

        if (!req.session["currentUser"]) {
            res.status(400).json({message: "No user is logged in"});
            return;
        }

        const userId = req.session["currentUser"]._id;
        const results = await dao.findAnswersByQuizzesIdAndUserId(qid, userId) || [];
        const quizzes = await findQuizzesById(qid);

        console.log(quizzes)
        console.log(results)

        if (results.length >= quizzes.manysAttempts) {
            res.status(400).json({message: "No answers attempts"});
            return;
        }

        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        let answers = [];
        let points = 0;
        let questions = await findQuestionsByQuizzesId(qid);

        if (keys.length > 0 && values.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let question = questions.find(question => question._id.toString() === keys[i]);
                if (question) {
                    const correct = question.correctAnswer.toLowerCase() === values[i].toLowerCase();
                    if (correct) {
                        points += question.points;
                    }
                    answers.push({
                        questionId: keys[i],
                        answer: values[i],
                        correct: correct,
                    });
                } else {
                    console.log("Question not found", keys[i])
                }
            }
        } else {
            res.status(400).json({message: "Invalid request"});
            return;
        }

        const newAnswer = {
            userAnswers: answers,
            points: points,
            quizzesId: qid,
            userId: req.session["currentUser"]._id
        };

        const status = await dao.createAnswers(newAnswer)

        res.json({score: points, status: status});
    });

    app.get("/api/quizzes/:qid/answers", async (req, res) => {
        const {qid} = req.params;
        if (!req.session["currentUser"]) {
            res.status(400).json({message: "No user is logged in"});
            return;
        }
        const answers = await dao.findAnswersByQuizzesIdAndUserId(qid, req.session["currentUser"]._id).sort({created: -1}).limit(1);
        res.json(answers[0] || []);
    });
}