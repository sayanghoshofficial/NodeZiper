import React from 'react'
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';

const Header = () => {
    return (
        <Navbar expand="lg" bg='primary' className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">NoteZipper</Navbar.Brand>
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
                        <Nav.Link href="/notes">My Notes</Nav.Link>
                       
                        <NavDropdown title="Sayan Ghosh" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/">My Profile</NavDropdown.Item>
                            
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header