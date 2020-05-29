import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import './list.css';


function List(props) {
    const items = props.items;
    const listItems = items.map((item, index) =>
        <ListItem key={index} content={item}/>
    );
    return (
        <Container className='list-box'>
            {listItems}
        </Container>
    );
}

function ListItem(props) {
    const content = props.content;
    return (
        <Row>
            <Col>
                <div className='list-item'>
                    {content}
                </div>
            </Col>
        </Row>
    );
}

export default List;