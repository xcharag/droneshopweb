import React from "react";
import { Form } from "react-bootstrap";
import { RiPriceTag3Line } from "react-icons/ri";

const PriceFilter = ({ selectedPrice, maxPrice, handlePriceChange }) => {
    return (
        <Form.Group controlId="formPrice">
            <Form.Label><RiPriceTag3Line /> Precio Maximo:</Form.Label>
            <Form.Control
                type="range"
                className="form-range dark"
                min={1}
                max={maxPrice}
                value={selectedPrice}
                onChange={handlePriceChange}
                name="price"
                placeholder="Enter Price"
            />
            <div className="text-center">
                Precio Actual: ${selectedPrice}
            </div>
        </Form.Group>
    );
};

export default PriceFilter;
