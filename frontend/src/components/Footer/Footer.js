import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterWpr>
            <Container>
                <Row>
                <Col className='text-center py-3'> CopyWrite &copy; Note Zipper</Col>
                </Row>
            </Container>
        </FooterWpr>
    )
}

export default Footer;

const FooterWpr = styled.div`
position: relative;
bottom: 0;
width: 100%;
display: flex;
justify-content: center;
`