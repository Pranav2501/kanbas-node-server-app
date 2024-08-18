import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const createUser = async (req, res) => {
        try {
            const user = await dao.createUser(req.body);
            res.status(201).json(user);  // Return status 201 for resource creation
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    };

    const deleteUser = async (req, res) => {
        try {
            const status = await dao.deleteUser(req.params.userId);
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    };

    const findAllUsers = async (req, res) => {
        try {
            const { role, name } = req.query;

            if (role) {
                const users = await dao.findUsersByRole(role);
                return res.json(users);
            }

            if (name) {
                const users = await dao.findUsersByPartialName(name);
                return res.json(users);
            }

            const users = await dao.findAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: "Error finding users", error });
        }
    };

    const findUserById = async (req, res) => {
        try {
            const user = await dao.findUserById(req.params.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Error finding user", error });
        }
    };

    const updateUser = async (req, res) => {
        try {
            const { userId } = req.params;
            const status = await dao.updateUser(userId, req.body);
            if (status.nModified === 0) {
                return res.status(404).json({ message: "User not found or not updated" });
            }
            res.json(status);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    };

    const signup = async (req, res) => {
        try {
            const user = await dao.findUserByUsername(req.body.username);
            if (user) {
                return res.status(400).json({ message: "Username already taken" });
            }
            const currentUser = await dao.createUser(req.body);
            req.session.currentUser = currentUser;  // Set currentUser in session
            res.status(201).json(currentUser);  // Return status 201 for resource creation
        } catch (error) {
            res.status(500).json({ message: "Error signing up", error });
        }
    };

    const signin = async (req, res) => {
        try {
            const { username, password } = req.body;
            const currentUser = await dao.findUserByCredentials(username, password);
            console.log("Signed in user:", currentUser);
            if (currentUser) {
                req.session.currentUser = currentUser;  // Set currentUser in session
                res.json(currentUser);
            } else {
                res.status(401).json({ message: "Invalid username or password" });
            }
        } catch (error) {
            res.status(500).json({ message: "Error signing in", error });
        }
    };

    const signout = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error signing out", error: err });
            }
            res.sendStatus(200);
        });
    };

    const profile = async (req, res) => {
        const currentUser = req.session.currentUser;
        console.log("Current User:", currentUser);
        if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized: No user logged in" });
        }
        res.json(currentUser);
    };

    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}
