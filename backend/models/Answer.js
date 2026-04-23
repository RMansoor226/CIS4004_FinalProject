const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    answerText: String,
    isCorrect: Boolean
});

module.exports = mongoose.model("Answer", AnswerSchema);
