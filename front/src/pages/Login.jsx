import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../api/axios-client';
import { useAuth } from '../global/auth';
import { refresh } from '../utils/refresh';

export default function Login() {
  const [info, setInfo] = useState({ email: '', password: '' });
  const setLoggedIn = useAuth((state) => state.setLoggedIn);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Axios.post('/auth/login', { ...info });
    setLoggedIn(true);
    setInfo({ email: '', password: '' });
    navigate('/');
    await refresh();
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ maxWidth: '35rem', marginInline: 'auto' }}>
      <h1 className="mb-5">Login</h1>
      <Form onSubmit={handleSubmit} method="POST">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={info.email}
            onChange={handleChange}
            name="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={info.password}
            onChange={handleChange}
            name="password"
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-end">
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Link to="/register">Or create an account</Link>
        </div>
      </Form>
    </div>
  );
}
