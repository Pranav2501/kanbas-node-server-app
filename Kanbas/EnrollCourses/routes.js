import * as dao from "./dao.js";

export default function EnrollCourseRoutes(app) {

    app.post("/api/enroll/courses", async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        if (currentUser.role !== "STUDENT") {
            res.json({'message': "You are not authorized to enroll a course"});
            return;
        }
        const course = {
            ...req.body,
            user: currentUser._id
        };
        // console.log(course)
        const status = await dao.createCourse(course);
        res.json(status);
    });

    app.delete("/api/enroll/courses/:id", async (req, res) => {
        const {id} = req.params;
        const status = await dao.deleteCourse(id);
        res.json(status);
    });


    app.get("/api/enroll/courses", async (req, res) => {
        const currentUser = req.session["currentUser"];

        if (!currentUser) {
            res.sendStatus(401);
            return;
        }

        try {
            const courses = await dao.findEnrollCoursesByUserId(currentUser._id);
            console.log(currentUser._id)
            res.json(courses);
        } catch (e) {
            console.log(e)
            res.sendStatus(500);
        }
    });
}