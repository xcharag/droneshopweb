import React from 'react';
import { Form, Button } from 'react-bootstrap';

const CreditCardForm = () => {
    return (
        <div className="mt-3">
            <Form.Group className="mb-3">
                <Form.Label>Card Number</Form.Label>
                <Form.Control type="text" placeholder="Enter card number" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="text" placeholder="MM/YY" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" placeholder="CVV" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit Payment
            </Button>
        </div>
    );
};

export default CreditCardForm;
