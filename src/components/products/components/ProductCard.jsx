import React from "react";
import { Card, Button } from "react-bootstrap";

const ProductCard = ({ product, handleAddToCart, isLoggedIn }) => {
    return (
        <Card>
            <Card.Img variant="top" src="" />
            <Card.Body>
                <Card.Title>{product.name} - {product.model}</Card.Title>
                <Card.Text>{product.specifications}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <span className="badge bg-primary badge-pill" style={{ fontSize: "1.25rem" }}>Precio: ${product.price}</span>
                    </div>
                    <div className="p-3">
                        Stock Restante: {product.remainingStock}
                    </div>
                    <div>
                        <Button
                            variant="success"
                            onClick={() => handleAddToCart(product)}
                            disabled={!isLoggedIn} // Disable button if not logged in
                        >
                            Agregar al Carrito
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;
