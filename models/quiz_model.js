// quizResult.js

const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel",
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  wrongAnswers: {
    type: Number,
    required: true,
  },
  unansweredQuestions: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  obtainedMarks: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  questionResults: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionModel",
      },
      correct: Boolean,
      wrong: Boolean,
      unanswered: Boolean,
      marks: Number,
    },
  ],
});

const QuizResultModel = mongoose.model("QuizResultModel", quizResultSchema);

module.exports = QuizResultModel;
