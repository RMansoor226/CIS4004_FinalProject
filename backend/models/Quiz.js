const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    quizName: String,
    quizDescription: String,
    quizTags: [String],
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }]
});

module.exports = mongoose.model("Quiz", QuizSchema);
