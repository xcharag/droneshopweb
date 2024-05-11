import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Button, Form, Alert, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import { BsTrash } from 'react-icons/bs';
import CreditCardForm from './components/creditcardmethod.jsx';
import QRPayForm from './components/qrmethod.jsx';
import './cart.css';
import Header from "../header/header.jsx";
import TotalPriceSquare from "./components/totalPrice.jsx";
import { useMutation } from '@apollo/client';
import { ADD_ORDER_MUTATION } from './queries/queries.js';

const Cart = () => {
    const [paymentMethod, setPaymentMethod] = useState('creditCard');
    const [cartItems, setCartItems] = useState([]);
    const [showModal, setShowModal] = useState(false); // State variable for controlling modal visibility

    // Mutation hook for executing the add_order mutation
    const [addOrder] = useMutation(ADD_ORDER_MUTATION);

    // Load cart items from session storage
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

    const handleSubmit = async () => {
        try {
            const client = JSON.parse(localStorage.getItem('client')); // Retrieve client ID from localStorage

            // Prepare the order input object with required parameters
            const orderInput = {
                client: client.id,
                order: groupedCartItems.map(item => ({ id: item.id, quantity: item.quantity })),
                status: 'PENDIENTE'
            };

            // Execute the add_order mutation
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

            // Clear cart after successful submission
            setCartItems([]);
            sessionStorage.removeItem('cart');

            // Show the modal after successful submission
            setShowModal(true);
        } catch (error) {
            console.error('Error placing order:', error);
            // Optionally, display an error message to the user
        }
    };

    // Group items by ID and calculate the quantity
    const groupedItems = cartItems.reduce((grouped, item) => {
        if (!grouped[item.id]) {
            grouped[item.id] = { ...item, quantity: 0 };
        }
        grouped[item.id].quantity++;
        return grouped;
    }, {});

    // Convert grouped items back to an array
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
                {/* Modal for showing successful purchase */}
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
