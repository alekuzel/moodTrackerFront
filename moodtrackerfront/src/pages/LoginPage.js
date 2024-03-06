// Import necessary modules and hooks from React, react-router-dom, and react-bootstrap
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

// Define the Login component
function Login() {
  // Initialize state variables for email, password, and error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Define the handleLogin function which is triggered when the form is submitted
  const handleLogin = async (e) => {
    // Prevent the default form submission
    e.preventDefault();

    try {
      // Make a POST request to the login endpoint with the email and password
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // If the response is not ok, throw an error
      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Parse the JSON response to get the token and _id
      const responseData = await response.json();
      const { token, _id } = responseData;

      // Store the token and _id in local storage
      localStorage.setItem('accessToken', token);
      localStorage.setItem('userid', _id);

      // Clear the email, password, and error states
      setEmail('');
      setPassword('');
      setError('');

      // Navigate to the home page
      navigate('/');

      // Log a success message to the console
      console.log('Login successful');
    } catch (error) {
      // If there's an error, set the error state and log the error to the console
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  // Render the login form
  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2 className="mt-5 mb-4">Log in the Mood Tracker</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>

            {/* Show an error alert if there's an error */}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button variant="primary" type="submit" className="mt-3">
              Login
            </Button>
          </Form>
          <p className="mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

// Export the Login component for use in other parts of the application
export default Login;