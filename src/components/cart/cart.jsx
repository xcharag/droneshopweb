import React, { useState } from 'react';
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import CreditCardForm from './components/creditcardmethod.jsx';
import QRPayForm from './components/qrmethod.jsx';
import './cart.css';
import Header from "../header/header.jsx"; // Importing CSS for styling

const Cart = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');

    // Example product data
    const cartItems = [
        { id: 1, name: 'Product 1', price: '$10.99', image: './src/assets/products-img/dron-1.jpg' },
        { id: 2, name: 'Product 2', price: '$15.99', image: './src/assets/products-img/dron-3.jpg' }
    ];

    return (
        <Container className="cart-container">
            <Header />
            <Row>
                <Col>
                    <h2 className="text-success fw-bold">Tu Carrito</h2>
                    <ListGroup>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.id}>
                                <Row>
                                    <Col>
                                        <img src={item.image} alt={item.name} className="cart-item-image" />
                                    </Col>
                                    <Col className="d-flex align-items-center justify-content-center">
                                        <div>
                                            <h4>{item.name}</h4>
                                            <p>{item.price}</p>
                                            <Button variant="danger">
                                                <BsTrash /> Remove
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col>
                    <h2 className="text-white fw-bold">Metodo de Pago</h2>
                    <Form>
                        <Form.Select onChange={(e) => setPaymentMethod(e.target.value)}>
                            <option value="creditCard">Tarjeta de Credito/Debito</option>
                            <option value="qrPay">Pago QR</option>
                        </Form.Select>
                        {paymentMethod === 'creditCard' ? <CreditCardForm /> : <QRPayForm />}
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Cart;
