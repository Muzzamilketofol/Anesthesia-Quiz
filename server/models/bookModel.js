const mongoose = require('mongoose');

 Schema for a single question (the smallest unit)
const questionSchema = new mongoose.Schema({
  questionNumber {
    type Number,
    required true,
  },
  questionText {
    type String,
    required true,
  },
  options {
    type Map,
    of String,  e.g., { A Option text 1, B Option text 2 }
    required true,
  },
  correctAnswer {
    type String,  Will store the key of the correct option, e.g., C
    required true,
  },
  explanation {
    type String,
    required true,
  },
  keyPoints {
    type [String],  An array of strings
  },
});

 Schema for a chapter, which contains multiple questions
const chapterSchema = new mongoose.Schema({
  title {
    type String,
    required true,
  },
  questions [questionSchema],  An array of question documents
});

 Schema for a volume, which contains multiple chapters
const volumeSchema = new mongoose.Schema({
  title {
    type String,
    required true,
  },
  chapters [chapterSchema],  An array of chapter documents
});

 The main Book schema, which contains volumes
const bookSchema = new mongoose.Schema({
  title {
    type String,
    required true,
  },
  description {
    type String,
  },
  volumes [volumeSchema],  An array of volume documents
}, {
  timestamps true  Adds createdAt and updatedAt timestamps
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;