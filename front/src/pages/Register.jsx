import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../api/axios-client';

export default function Register() {
  const [info, setInfo] = useState({ email: '', password: '', country: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('/auth/register', { ...info })
      .then(() => {
        setInfo({ email: '', password: '', country: '' });
        navigate('/login');
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ maxWidth: '35rem', marginInline: 'auto' }}>
      <h1 className="mb-5">Register</h1>
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

        <Form.Group className="mb-3" controlId="formBasicCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Country"
            value={info.country}
            onChange={handleChange}
            name="country"
          />
        </Form.Group>

        <div className="d-flex justify-content-between align-items-end">
          <Button variant="primary" type="submit">
            Create account
          </Button>
          <Link to="/login">Already have an account?</Link>
        </div>
      </Form>
    </div>
  );
}
