import React from 'react';
// import styled from 'styled-components';
import { Container, Row } from 'react-bootstrap'
import { MainScreenWpr,Page,Heading } from './index.sc';

const MainScreen = ({ title, children }) => {
    return (
        <MainScreenWpr>
            <Container>
                <Row>
                    <Page>
                        {title &&
                            <>
                                <Heading>{title}</Heading>
                                <hr />
                            </>
                        }
                        {children}
                    </Page>
                </Row>
            </Container>
        </MainScreenWpr>
    )
}

export default MainScreen;

