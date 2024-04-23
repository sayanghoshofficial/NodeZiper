import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Main, Title } from '../LandingPage/index.sc';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';



const LoginPage = () => {
  const navigate=useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

 

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true);
      const { data } = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      }, config);
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  }

  return (
    <>
        <Container>
          <Row className='py-3'>
            <Title>Login</Title>
          </Row>
          {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
          {loading && <Loader />}
          <Row className='py-3'>
            <Form onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Row>
          <Row className='py-3'>
            <Col>New User? <Link to={'/register'}>Register Here</Link></Col>
          </Row>
        </Container>
    </>
  )
}

export default LoginPage