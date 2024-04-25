import React, { useEffect } from 'react'
import { ButtonContainer, IntroText, Landingbutton, Main, SubTitle, Title } from './index.sc'
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    const userInfo = localStorage.getItem('userInfo')
    useEffect(() => {
        if (userInfo) {
            navigate("/myNotes")
        }
    }, [userInfo, navigate])
    return (
        <Main>
            <Container>
                <Row>
                    <IntroText>
                        <div>
                            <Title>Welcome to Node Zipper</Title>
                            <SubTitle>One safe place for all your notes.</SubTitle>
                            <ButtonContainer>
                                <a href='/login'>
                                    <Landingbutton>
                                        Login
                                    </Landingbutton>
                                </a>

                                <a href='/register'>
                                    <Landingbutton>
                                        Register
                                    </Landingbutton>
                                </a>
                            </ButtonContainer>
                        </div>
                    </IntroText>
                </Row>
            </Container>
        </Main>
    )
}

export default LandingPage