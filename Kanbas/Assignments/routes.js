import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {

    app.post("/api/courses/:cid/assignments", async (req, res) => {
        const {cid} = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
        };
        const status = await dao.createAssignment(newAssignment)
        res.json(status);
    });

    app.delete("/api/assignments/:aid", async (req, res) => {
        const {aid} = req.params;
        const status = await dao.deleteAssignment(aid);
        res.json(status);
    });

    app.put("/api/assignments/:aid", async (req, res) => {
        const {aid} = req.params;
        const status = await dao.updateAssignment(aid, req.body);
        res.json(status);
    });

    app.get("/api/courses/:cid/assignments", async (req, res) => {
        const {cid} = req.params;
        const assignments = await dao.findAssignmentsByCourseId(cid);
        res.json(assignments);
    });
}