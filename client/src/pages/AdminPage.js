// src/pages/AdminPage.js
import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminPage = () => {
  // User management state
  const [users, setUsers] = useState([]);

  // Upload form state
  const [bookId, setBookId] = useState(''); // You'd fetch books to populate a dropdown
  const [volumeId, setVolumeId] = useState('');
  const [chapterTitle, setChapterTitle] = useState('');
  const [chapterFile, setChapterFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await api.get('/admin/users');
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bookId', bookId);
    formData.append('volumeId', volumeId);
    formData.append('chapterTitle', chapterTitle);
    formData.append('chapterFile', chapterFile);

    try {
      setUploadStatus('Uploading...');
      const { data } = await api.post('/admin/chapters/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus(data.message);
    } catch (error) {
      setUploadStatus('Upload failed!');
    }
  };

  return (
    <div>
      <h1>Admin Panel</h1>

      <section>
        <h2>Content Upload</h2>
        <form onSubmit={handleUpload}>
          {/* Add inputs for bookId, volumeId, etc. A real app would have dropdowns */}
          <input type="text" placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} required />
          <input type="text" placeholder="Volume ID" value={volumeId} onChange={(e) => setVolumeId(e.target.value)} required />
          <input type="text" placeholder="New Chapter Title" value={chapterTitle} onChange={(e) => setChapterTitle(e.target.value)} required />
          <input type="file" onChange={(e) => setChapterFile(e.target.files[0])} required />
          <button type="submit">Upload Chapter</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </form>
      </section>

      <section>
        <h2>User Management</h2>
        {/* Display list of users here */}
      </section>
    </div>
  );
};

export default AdminPage;