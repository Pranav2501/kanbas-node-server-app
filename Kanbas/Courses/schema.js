import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
        name: String,
        number: String,
        startDate: Date,
        endDate: Date,
        department: String,
        credits: Number,
        cover: String,
        author: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel"},
        description: String,
    },
    {collection: "courses"}
);

export default courseSchema;