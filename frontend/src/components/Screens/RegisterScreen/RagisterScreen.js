import React, { useEffect, useState } from 'react'
import { Main, Title } from '../LandingPage/index.sc'
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loader from '../../Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../Redux/actions/userActions';

const RagisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState("https://github.com/sayanghoshofficial/NodeZiper/assets/99132893/66485cb1-0a16-4dc4-b6cc-f30dc7000e9f");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  useEffect(() => {
    userInfo && navigate('/mynotes');
  }, [userInfo]);
  

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does Not Match!!!")
    } else {
      dispatch(register(name, email, password, pic))
    }

  }

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'noteZipper');
      data.append('cloud_name', 'dczkssrlq');
      fetch('https://api.cloudinary.com/v1_1/dczkssrlq/image/upload', {
        method: "post",
        body: data
      }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  }

  return (
    <Main>
      <Container>
        <Row className='py-3'>
          <Title>Ragister</Title>
        </Row>
        {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
        {message && <ErrorMessage varient='danger'>{message}</ErrorMessage>}
        {loading && <Loader />}
        <Row className='py-3'>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Your Name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="ConfirmPassword">
              <Form.Label>Confirn Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password..."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            {picMessage && <ErrorMessage varient='danger'>{picMessage}</ErrorMessage>}
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Upload Profile Picture</Form.Label>
              <Form.Control type="file" size="lg" onChange={(e) => postDetails(e.target.files[0])} />
            </Form.Group>


            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
        <Row className='py-3'>
          <Col>Already a User? <Link to={'/login'}>Login Here</Link></Col>
        </Row>
      </Container>
    </Main>
  )
}

export default RagisterPage