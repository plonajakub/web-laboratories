import React from "react";
import './welcome.css';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import img_path from './welcome.jpg'

function WelcomePage(props) {
    return (
        <Container className="WelcomePage">
            <Row>
                <Col>
                    <Logo/>
                </Col>
            </Row>
            <Row>
                <Col xs={{span: 8, offset: 2}} className="Box">
                    <Title title={props.title}/>
                </Col>
            </Row>
            <Row>
                <Col className="CBox">
                    <WelcomeText/>
                </Col>
            </Row>
        </Container>
    );
}

function Logo() {
    return (
        <div>
            <img src={img_path} alt="Logo" height="15%" width="40%"/>
        </div>
    );
}

function Title(props) {
    return (
        <h1>Witaj na {props.title}!</h1>
    );
}

function WelcomeText() {
    return (
        <p>
            Miło nam powitać Ciebie na najlepszym portalu dla fanów muzyki filmowej. <br/>
            Znajdziesz tutaj najlepsze pozycje do posłuchania ze świata filmów, gier, animacji, a nawet
            ciekawe propozycje muzyki klasycznej. <br/> <br/>
            Zapraszamy do korzystania z serwisu!
        </p>
    );
}

export default WelcomePage;