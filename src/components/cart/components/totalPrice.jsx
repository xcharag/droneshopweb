import React from 'react';
import { Card } from 'react-bootstrap';

const TotalPriceSquare = ({ totalPrice }) => {
    return (
        <Card className="rounded-pill p-3 text-center mt-3">
            <h5>Precio Total</h5>
            <h4>${totalPrice.toFixed(2)}</h4>
        </Card>
    );
};

export default TotalPriceSquare;
