import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap'; // Import Bootstrap components

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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

      const responseData = await response.json();
      const { token, _id } = responseData;

      localStorage.setItem('accessToken', token);
      localStorage.setItem('userid', _id);

      setEmail('');
      setPassword('');
      setError('');

      navigate('/');

      console.log('Login successful');
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

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

export default Login;
