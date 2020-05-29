import React from "react";
import imgBulbOff from './bulb-off.png'
import imgBulbOn from './bulb-on.png'
import {Button, Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import './button.css'

class BulbSwitcher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isBulbOn: false};

        this.toggleLight = this.toggleLight.bind(this);
    }

    toggleLight() {
        this.setState(state => ({
            isBulbOn: !state.isBulbOn
        }));
    }

    render() {
        return (
            <Container id='bulbBox'>
                <Row>
                    <Col>
                        <Bulb isOn={this.state.isBulbOn}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <BulbButton onClick={this.toggleLight} isBulbOn={this.state.isBulbOn}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function Bulb(props) {
    if (props.isOn) {
        return <img src={imgBulbOn} alt='bulb-on'/>
    }
    return <img src={imgBulbOff} alt='bulb-off'/>
}

function BulbButton(props) {
    return (
        <Button variant='primary' onClick={props.onClick}>
            {props.isBulbOn ? 'Zgaś' : 'Zapal'}
        </Button>
    );
}

export default BulbSwitcher;