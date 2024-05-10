import React from "react";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

const NameFilter = ({ searchName, handleNameSearchChange }) => {
    return (
        <Form.Group controlId="formName">
            <Form.Label><BsSearch /> Nombre:</Form.Label>
            <Form.Control
                type="text"
                name="name"
                placeholder="Enter Name"
                value={searchName}
                onChange={handleNameSearchChange}
            />
        </Form.Group>
    );
};

export default NameFilter;
