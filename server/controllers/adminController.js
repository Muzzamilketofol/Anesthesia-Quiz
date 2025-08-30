// Add these imports at the top of adminController.js
const Book = require('../models/bookModel');
const csv = require('csv-parser');
const stream = require('stream');

// @desc    Upload a new chapter from a CSV file
// @route   POST /api/admin/chapters/upload
exports.uploadChapter = async (req, res) => {
  try {
    const { bookId, volumeId, chapterTitle } = req.body;
    const file = req.file; // The file comes from multer

    if (!file) {
      return res.status(400).json({ message: 'Please upload a CSV file' });
    }

    const questions = [];
    const bufferStream = new stream.PassThrough();
    bufferStream.end(file.buffer);

    bufferStream
      .pipe(csv())
      .on('data', (row) => {
        // Transform each row from the CSV into our question schema format
        const questionData = {
          questionNumber: parseInt(row.questionNumber, 10),
          questionText: row.questionText,
          options: {
            A: row.optionA,
            B: row.optionB,
            C: row.optionC,
            D: row.optionD,
            E: row.optionE,
          },
          correctAnswer: row.correctAnswer,
          explanation: row.explanation,
          keyPoints: row.keyPoints ? row.keyPoints.split(';') : [], // Assuming key points are semi-colon separated
        };
        questions.push(questionData);
      })
      .on('end', async () => {
        // After parsing the whole file, update the database
        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        const volume = book.volumes.id(volumeId);
        if (!volume) return res.status(404).json({ message: 'Volume not found' });

        volume.chapters.push({ title: chapterTitle, questions: questions });
        await book.save();

        res.status(201).json({ message: 'Chapter uploaded successfully' });
      });

  } catch (error) {
    res.status(500).json({ message: 'Server error during upload', error: error.message });
  }
};