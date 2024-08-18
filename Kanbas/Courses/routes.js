import * as dao from "./dao.js";

export default function CourseRoutes(app) {

    app.post("/api/courses", async (req, res) => {
        const currentUser = req.session["currentUser"];

        if (currentUser && currentUser.role !== "FACULTY") {
            res.json({'message': "You are not authorized to create a course"});
            return;
        }

        const course = {
            ...req.body,
            author: currentUser._id
        };

        const status = await dao.createCourse(course);
        res.json(status);
    });

    app.delete("/api/courses/:id", async (req, res) => {
        const {id} = req.params;
        const status = await dao.deleteCourse(id);
        res.json(status);
    });

    app.put("/api/courses/:id", async (req, res) => {
        const {id} = req.params;
        const course = req.body;
        const status = await dao.updateCourse(id, course);
        res.json(status);
    });

    app.get("/api/courses", async (req, res) => {
        const currentUser = req.session.currentUser;

        if (currentUser && currentUser.role === "FACULTY") {
            const courses = await dao.findCoursesByAuthor(currentUser._id);
            res.json(courses);
            return;
        }
        const courses = await dao.findAllCourses();
        res.json(courses);

    });
}