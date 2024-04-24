import React, { useEffect } from 'react'
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../Redux/actions/userActions';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin)

    const { userInfo } = userLogin;


    // useEffect(() => {
    //     navigate('/')
    // }, [userInfo])

    const logoutHandler = () => {
        dispatch(logout());
        navigate('/')
    }
    return (
        <Navbar expand="lg" bg='primary' className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href='/'>
                    <Link to={"/"} style={{ textDecoration: "none" }}>
                        NoteZipper
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className='m-auto'>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                        </Form>
                    </Nav>
                    <Nav
                        className="my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link as={Link} to="/mynotes">
                            <Link to='/mynotes' style={{ textDecoration: "none" }}>
                                My Notes
                            </Link>
                        </Nav.Link>

                        <NavDropdown title="Sayan Ghosh" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
