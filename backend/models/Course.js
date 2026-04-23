const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    courseName: String,
    courseDescription: String,
    courseTags: [String],
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }]
});

module.exports = mongoose.model("Course", CourseSchema);
