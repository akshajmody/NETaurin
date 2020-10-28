import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link , useHistory } from 'react-router-dom';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError('Log in failed - please verify credentials')
    }

    setLoading(false)
  }

  return (
    //FRAGMENT
    <>
      <div className="w-100" style={{ maxWidth: '425px' }}>
        <Card className="d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
          <Card.Body>
            <h1 className="text-center mb-3">NETaurin</h1>
            <h6 className="text-center mb-3">Sign in as an existing user</h6>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">LOG IN</Button>
            </Form>
          </Card.Body>
          <div className="w-100 text-center mb-3">
            <Link to="/signup">Don't have an account? Sign up here!</Link>
          </div>
        </Card>
      </div>
    </>
  )
}