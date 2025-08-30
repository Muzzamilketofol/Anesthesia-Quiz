// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import the provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Everything inside AuthProvider now has access to the auth context */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);