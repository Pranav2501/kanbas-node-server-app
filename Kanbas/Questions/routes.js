import * as dao from "./dao.js";
import {findQuizzesById, updateQuizzes} from "../Quizzes/dao.js";

export default function QuestionsRoutes(app) {

    app.post("/api/quizzes/:qid/questions", async (req, res) => {
        const {qid} = req.params;
        const newQuestions = {
            ...req.body,
            quizzesId: qid,
        };
        const status = await dao.createQuestions(newQuestions)

        // update the quizzes questionIds
        const questions = await dao.findQuestionsByQuizzesId(qid);

        const quizzes = await findQuizzesById(qid);

        quizzes.questions = questions.map(question => question._id);

        await quizzes.save();

        res.json(status);
    });

    app.delete("/api/questions/:qid", async (req, res) => {
        const {qid} = req.params;

        const question = await dao.findQuestionsById(qid);

        const quizzesId = question.quizzesId;

        const status = await dao.deleteQuestions(qid);

        // update the quizzes questionIds
        const questions = await dao.findQuestionsByQuizzesId(quizzesId);

        const quizzes = await findQuizzesById(quizzesId);

        quizzes.questions = questions.map(question => question._id);

        await quizzes.save();

        res.json(status);
    });

    app.put("/api/questions/:qid", async (req, res) => {
        const {qid} = req.params;
        const status = await dao.updateQuestions(qid, req.body);
        res.json(status);
    });

    app.get("/api/quizzes/:qid/questions", async (req, res) => {
        const {qid} = req.params;
        const questions = await dao.findQuestionsByQuizzesId(qid);
        res.json(questions);
    });

    app.get("/api/questions/:qid", async (req, res) => {
        const {qid} = req.params;
        const question = await dao.findQuestionsById(qid);
        res.json(question);
    });
}