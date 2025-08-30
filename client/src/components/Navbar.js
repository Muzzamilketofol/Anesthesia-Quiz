// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import our custom hook

const Navbar = () => {
  const { user, logout } = useAuth(); // Get user and logout function from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  const navStyle = { /* ... your styles ... */ };
  const linkStyle = { /* ... your styles ... */ };

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Home</Link>

      {/* Conditional Rendering: Show different links based on user state */}
      {user ? (
        <>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          <span style={{ color: '#fff', marginLeft: 'auto', marginRight: '1rem' }}>
            Welcome, {user.username}
          </span>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            Logout
          </button>
        </>
      ) : (
        <Link to="/login" style={linkStyle}>Login</Link>
      )}
    </nav>
  );
};

export default Navbar;