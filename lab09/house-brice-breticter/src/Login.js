import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  function handleAuthentication() {
    fetch('http://127.0.0.1:5000/validate_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({'username':username, 'password':password}),
    })
    .then(response => {
      if (response.ok) {
        navigate("/predict")
      } else {
        throw new Error('Authentication failed');
      }
    })
    .then(data => setMessage(data.message))
    .catch(error => setMessage('Authentication failed. Incorrect username or password.'));};

    return (
      <>
        <div className="login-container">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
  
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
  
          <button onClick={handleAuthentication}>Submit</button>
  
          {message && <p className="error-message">{message}</p>}
        </div>
      </>
    );
  }
export default Login;