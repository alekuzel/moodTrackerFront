import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      // Send login request to the API
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      // Parse the response body as JSON
      const responseData = await response.json();
  
      // Extract the authentication token and user ID from the response
      const { token, _id } = responseData;
  
      // Log the user ID
      console.log('User ID:', _id);
  
      // Store the token and user ID in local storage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userid', _id);
  
      // Reset form fields and error message
      setEmail('');
      setPassword('');
      setError('');
  
      // Redirect to home page upon successful login
      navigate('/');
  
      console.log('Login successful');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };
  
  
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
}

export default Login;
