import * as dao from "./dao.js";

export default function QuizzesRoutes(app) {

    app.post("/api/courses/:cid/quizzes", async (req, res) => {
        const {cid} = req.params;
        const newQuizzes = {
            ...req.body,
            course: cid,
        };
        const status = await dao.createQuizzes(newQuizzes)
        res.json(status);
    });

    app.delete("/api/quizzes/:aid", async (req, res) => {
        const {aid} = req.params;
        const status = await dao.deleteQuizzes(aid);
        res.json(status);
    });

    app.put("/api/quizzes/:aid", async (req, res) => {
        const {aid} = req.params;
        const status = await dao.updateQuizzes(aid, req.body);
        res.json(status);
    });

    app.get("/api/courses/:cid/quizzes", async (req, res) => {
        const {cid} = req.params;
        const quizzes = await dao.findQuizzesByCourseId(cid);
        res.json(quizzes);
    });

    app.get("/api/quizzes/:qid", async (req, res) => {
        const {qid} = req.params;
        const quizzes = await dao.findQuizzesById(qid);
        res.json(quizzes);
    });
}