import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS_QUERY } from "./queries/queries.js";
import {RiPriceTag3Line} from "react-icons/ri";
import {BsSearch} from "react-icons/bs";
import Header from "../header/header.jsx";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [getProducts, {data}] = useLazyQuery(GET_PRODUCTS_QUERY);

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    useEffect(() => {
        if (data) {
            console.log(data);
            setProducts(data.getAllProducts);
        }
    }, [data]);

    return (
        <Container className="pb-5 mb-5">
            <Header />
            <h1 className="text-center mt-5 text-success fw-bold">Todos los productos</h1>
            <div className="round-corner-square justify-content-center">
                <Row>
                    <Row className="gx-2 justify-content-evenly">
                        <Col xs={6} sm={4} md={3}>
                            <Form.Group controlId="formPrice">
                                <Form.Label><RiPriceTag3Line /> Price Range:</Form.Label>
                                <Form.Control type="range" className="form-range dark" min={10} name="price" placeholder="Enter Price" />
                            </Form.Group>
                        </Col>
                        <Col xs={6} sm={4} md={3}>
                            <Form.Group controlId="formName">
                                <Form.Label><BsSearch /> Name:</Form.Label>
                                <Form.Control type="text" name="name" placeholder="Enter Name" />
                            </Form.Group>
                        </Col>
                        <Col xs={12} sm={4} md={3}>
                            <Form.Group controlId="formModel">
                                <Form.Label><BsSearch /> Model:</Form.Label>
                                <Form.Control type="text" name="model" placeholder="Enter Model" />
                            </Form.Group>
                        </Col>
                    </Row>
                </Row>
            </div>

            <div className="round-corner-square">
                {products.map((product, index) => (
                    <Card key={index}>
                        <Card.Img variant="top" src={product.image.toString()}/>
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.specifications}</Card.Text>
                            <div className="position-absolute top-0 start-0 mt-2 ms-2">
                                <span className="badge bg-success badge-pill" style={{ fontSize: "1.25rem" }}>Precio: ${product.price}</span>
                            </div>
                            <Button variant="success">Agregar al Carrito</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default ProductPage;
