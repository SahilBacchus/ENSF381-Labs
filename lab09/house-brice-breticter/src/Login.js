import React, { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import './Login.css'

const navigate = useNavigate();

function AuthenticationForm() {
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
    <div class="login_form">
      <label>
        Username:
        </label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>
            Password:
          </label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button onClick={handleAuthentication}>Submit</button>
          <br />
          <p>{message}</p>
      </div>


      );
    };
export default AuthenticationForm;