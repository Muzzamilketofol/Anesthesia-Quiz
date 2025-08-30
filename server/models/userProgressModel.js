const mongoose = require('mongoose');

const userProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Creates a link to the User model
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // Note: This refers to the ID of a question nested inside the Book model
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book', // Creates a link to the Book model
  },
  answerGiven: { // The option key the user selected, e.g., "B"
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
}, {
  timestamps: true // Records when the answer was submitted
});

const UserProgress = mongoose.model('UserProgress', userProgressSchema);

module.exports = UserProgress;