import React from 'react'
import { Container, Row, Col, Button, FloatingLabel, Form } from 'react-bootstrap'

const WelcomeScreen = ({onClick}) => {
    return (
        <>
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col className="col-auto text-center">
                        <h1>Welcome to Tic-Tac-Toe</h1>
                        <h6 className='mb-3'>Select game mode:</h6>

                        <Row className="justify-content-center">
                            <Col className="col-auto">
                                <Button className='btn btn-dark game-button' onClick={onClick}>Single Player</Button>
                            </Col>

                            <Col className="col-auto">
                                <Button className='btn btn-dark game-button' onClick={onClick}>Multiplayer</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default WelcomeScreen
