import React, { useEffect, useState } from 'react'
import MainScreen from '../../MainScreen'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '../../ErrorMessage/ErrorMessage'
import Loader from '../../Loader/Loader'
import { update } from '../../../Redux/actions/userActions'

const Profile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState("");
    const [message, setMessage] = useState(null);
    const [picMessage, setPicMessage] = useState(null);
    const [picLoading, setPicLoading] = useState(false);
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    const userUpdate = useSelector(state => state.userUpdate);
    const { error, success, loading } = userUpdate;

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPic(userInfo.pic)

        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password === confirmPassword) {

            dispatch(update({ name, email, password, pic }))
        }
    }

    const postDetails = (pics) => {
        if (!pics) {
            return setPicMessage("Please Select an Image");
        }
        setPicMessage(null);
        if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
            setPicLoading(true)
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', 'noteZipper');
            data.append('cloud_name', 'dczkssrlq');
            fetch('https://api.cloudinary.com/v1_1/dczkssrlq/image/upload', {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setPicLoading(false)
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return setPicMessage("Please Select an Image");
        }
    }
    return (
        <MainScreen title={"Update your Profile..."}>
            <div>
                <Row className='profileCointainer'>
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            {loading && <Loader />}
                            {success && <ErrorMessage varient='success'> Profile Updated Successfuly</ErrorMessage>}
                            {error && <ErrorMessage varient='danger'>{error}</ErrorMessage>}
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
                            {picLoading ?
                                <Loader size={50} />
                                :
                                <Form.Group controlId="formFileLg" className="mb-3">
                                    <Form.Label>Upload Profile Picture</Form.Label>
                                    <Form.Control type="file" size="lg" onChange={(e) => postDetails(e.target.files[0])} />
                                </Form.Group>
                            }
                            <Button variant="primary" type="submit">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                    {picLoading ? <Loader /> :

                        <img src={pic} alt={name} style={{ display: 'flex', width: "60%", alignItems: 'center', padding: 20 }} />
                        }
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default Profile