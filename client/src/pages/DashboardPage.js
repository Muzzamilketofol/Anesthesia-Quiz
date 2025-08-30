// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react'; // Make sure useState and useEffect are imported
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProgressBar from '../components/ProgressBar';

const DashboardPage = () => {
  // This part was likely missing
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await api.get('/content/library');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to load library. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLibrary();
  }, []);

  // ... rest of the component code ...
  if (loading) { /* ... */ }
  if (error) { /* ... */ }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Your Quiz Library</h2>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id} style={{ border: '1px solid #ddd', margin: '1rem 0', padding: '1rem', borderRadius: '8px' }}>
            <h3>{book.title}</h3>
            {book.volumes.map((volume) => (
              <div key={volume._id} style={{ margin: '1rem 0', paddingLeft: '1rem' }}>
                <h4>{volume.title}</h4>
                {volume.chapters.map((chapter) => (
                  <div key={chapter._id} style={{ padding: '0.5rem', borderLeft: '2px solid #007bff', marginBottom: '1rem' }}>
                    <Link to={`/quiz/${chapter._id}`}>{chapter.title}</Link>
                    <ProgressBar 
                      attempted={chapter.progress.attemptedPercentage} 
                      correct={chapter.progress.correctPercentage} 
                    />
                  </div> // This div closes the chapter
                ))}
              </div> // This div closes the volume
            ))}
          </div> // This div closes the book
        ))
      ) : (
        <p>No books available yet.</p>
      )}
    </div> // This is the main closing div
  );
};

export default DashboardPage;