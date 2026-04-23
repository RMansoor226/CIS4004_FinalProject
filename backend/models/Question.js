const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: String,
    answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }]
});

module.exports = mongoose.model("Question", QuestionSchema);
