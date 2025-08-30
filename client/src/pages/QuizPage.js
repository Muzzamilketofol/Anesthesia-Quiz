// src/pages/QuizPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const QuizPage = () => {
// Add this inside the QuizPage component, after the state declarations

useEffect(() => {
  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/quiz/question/${chapterId}`);
      if (response.data) {
        setQuestion(response.data);
        setIsAnswered(false);
        setSelectedAnswer('');
        setFeedback(null);
      } else {
        // No more questions means the quiz is complete
        setIsQuizComplete(true);
      }
    } catch (err) {
      setError('Failed to load the next question.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!isQuizComplete) {
    fetchQuestion();
  }
}, [chapterId, questionCount, isQuizComplete]); // Refetch when we go to the next question

const handleAnswerSubmit = async () => {
  if (!selectedAnswer) return; // Don't submit if nothing is selected

  try {
    const response = await api.post('/quiz/answer', {
      questionId: question._id,
      selectedAnswer: selectedAnswer,
    });

    setFeedback(response.data); // Save feedback (e.g., { isCorrect: true, explanation: "..." })
    if (response.data.isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    setIsAnswered(true);
  } catch (err) {
    setError('Could not submit your answer.');
    console.error(err);
  }
};

const handleNextQuestion = () => {
  setQuestionCount(prevCount => prevCount + 1); // This triggers the useEffect to fetch the next question
};
  const { chapterId } = useParams(); // Get chapterId from URL, e.g., "60f..."

  // State to manage the quiz
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [questionCount, setQuestionCount] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // We will add the data fetching logic here next

  if (loading) return <div>Loading quiz...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  if (isQuizComplete) {
    return (
      <div>
        <h2>Quiz Complete!</h2>
        <p>Your final score is: {score} / {questionCount}</p>
      </div>
    );
  }

  return (
    <div>
      <div>
  {question ? (
    <>
      <h3>Question {questionCount + 1}</h3>
      <p>{question.questionText}</p>

      {/* Answer Options */}
      <div>
        {Object.entries(question.options).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setSelectedAnswer(key)}
            disabled={isAnswered}
            style={{
              display: 'block', margin: '0.5rem 0',
              // Add styling for selected/correct/incorrect answers
              backgroundColor: isAnswered ?
                (feedback?.correctAnswer === key ? 'lightgreen' : (selectedAnswer === key ? 'salmon' : 'white'))
                : (selectedAnswer === key ? 'lightblue' : 'white'),
            }}
          >
            {key}: {value}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      {!isAnswered ? (
        <button onClick={handleAnswerSubmit}>Submit Answer</button>
      ) : (
        <button onClick={handleNextQuestion}>Next Question</button>
      )}

      {/* Feedback Area */}
      {isAnswered && feedback && (
        <div style={{ marginTop: '1rem', padding: '1rem', border: `2px solid ${feedback.isCorrect ? 'green' : 'red'}` }}>
          <h4>{feedback.isCorrect ? 'Correct!' : 'Incorrect'}</h4>
          <p>{feedback.explanation}</p>
        </div>
      )}
    </>
  ) : (
    <p>No question loaded.</p>
  )}
</div>
      {/* The question display and answer options will go here */}
    </div>
  );
};

export default QuizPage;