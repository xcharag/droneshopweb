import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Alert, Modal } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';
import CreditCardForm from './components/creditcardmethod.jsx';
import QRPayForm from './components/qrmethod.jsx';
import './cart.css';
import Header from "../header/header.jsx";
import TotalPriceSquare from "./components/totalPrice.jsx";
import { useMutation } from '@apollo/client';
import { ADD_ORDER_MUTATION } from './queries/queries.js';
import jsPDF from 'jspdf';

const Cart = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [addOrder] = useMutation(ADD_ORDER_MUTATION);

    useEffect(() => {
        const cartFromStorage = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(cartFromStorage);
    }, []);

    const handleRemoveItem = (itemId) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === itemId) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null;
                }
            } else {
                return item;
            }
        }).filter(Boolean);

        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.text("Receipt", 10, 10);
        doc.text("Order Summary:", 10, 20);
        groupedCartItems.forEach((item, index) => {
            doc.text(`${item.name} - Quantity: ${item.quantity} - Price: ${item.price}`, 10, 30 + (index * 10));
        });
        doc.text(`Total Price: ${totalPrice}`, 10, 30 + (groupedCartItems.length * 10));
        doc.save("receipt.pdf");
    };

    const handleSubmit = async () => {
        try {
            const client = JSON.parse(localStorage.getItem('client'));

            const orderInput = {
                client: client.id,
                order: groupedCartItems.map(item => ({ id: item.id, quantity: item.quantity })),
                status: 'PENDIENTE'
            };

            await addOrder({
                variables: {
                    input: orderInput
                },
                context: {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                }
            });

            setCartItems([]);
            sessionStorage.removeItem('cart');

            setShowModal(true);
            generatePDF(); // Generate and download the PDF after successful submission
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const groupedItems = cartItems.reduce((grouped, item) => {
        if (!grouped[item.id]) {
            grouped[item.id] = { ...item, quantity: 0 };
        }
        grouped[item.id].quantity++;
        return grouped;
    }, {});

    const groupedCartItems = Object.values(groupedItems);

    const totalPrice = groupedCartItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);

    return (
        <Container className="cart-container">
            <div>
                <Header />
                <Row>
                    <Col>
                        <h2 className="text-success fw-bold">Tu Carrito</h2>
                        {groupedCartItems.length === 0 ? (
                            <div className="empty-cart-message">
                                <Alert variant="danger" className="rounded p-4 text-center">
                                    <h4 className="mb-0">Carrito Vacío</h4>
                                </Alert>
                            </div>
                        ) : (
                            <div className="cart-items-container">
                                <ListGroup>
                                    {groupedCartItems.map((item) => (
                                        <ListGroup.Item key={item.id}>
                                            <Row>
                                                <Col className="d-flex align-items-center justify-content-center">
                                                    <div>
                                                        <h4>{item.name}</h4>
                                                        <p>{item.price}</p>
                                                        <Button variant="danger" onClick={() => handleRemoveItem(item.id)}>
                                                            <BsTrash /> Remove
                                                        </Button>
                                                        <p>Quantity: {item.quantity}</p>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        )}
                    </Col>

                    <Col>
                        <h2 className="text-white fw-bold">Metodo de Pago</h2>
                        <Form>
                            <Form.Select onChange={(e) => setPaymentMethod(e.target.value)}>
                                <option value="creditCard">Tarjeta de Credito/Debito</option>
                                <option value="qrPay">Pago QR</option>
                            </Form.Select>
                            {paymentMethod === 'creditCard' ? <CreditCardForm /> : <QRPayForm />}
                            <TotalPriceSquare totalPrice={totalPrice} />
                            <Button variant="primary" onClick={handleSubmit} className="btn-success">Confirmar Orden</Button>
                        </Form>
                    </Col>
                </Row>
                <Header />
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Compra Exitosa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Tu compra fue exitosa.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Container>
    );
};

export default Cart;
