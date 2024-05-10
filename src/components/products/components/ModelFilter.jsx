import React from "react";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const ModelFilter = ({ searchModel, handleModelSearchChange }) => {
    return (
        <Form.Group controlId="formModel">
            <Form.Label><BsSearch /> Modelo:</Form.Label>
            <Form.Control
                type="text"
                name="model"
                placeholder="Enter Model"
                value={searchModel}
                onChange={handleModelSearchChange}
            />
        </Form.Group>
    );
};

export default ModelFilter;
