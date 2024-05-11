import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { GET_PRODUCTS_QUERY } from "./queries/queries.js";
import { useLazyQuery } from "@apollo/client";
import { TbDrone } from "react-icons/tb";
import { FaCamera, FaEnvelope } from "react-icons/fa";

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // UseLazyQuery to fetch products
    const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS_QUERY);

    // Fetch products when component mounts
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // Update state with fetched products
    useEffect(() => {
        if (data) {
            const fetchedProducts = [...data.getAllProducts]; // Create a copy of the fetched products array
            const randomProducts = fetchedProducts
                .sort(() => Math.random() - 0.5)
                .slice(0, 6); // Randomize and select 6 products
            setProducts(randomProducts);
        }
    }, [data]);

    const handleClickProducts = () => {
        navigate("/products");
    };

    return (
        <div className="home">
            <section className="home-banner drone-scroll-animation">
                <div className="home-banner-content">
                    <h1 className="text-success">AirPixel</h1>
                    <p className="text-white">
                        Lleva el la altura de tus fotos al siguiente nivel
                    </p>
                    <Button onClick={handleClickProducts} variant="success">
                        Ver Productos
                    </Button>
                </div>
            </section>

            <section className="home-topproducts">
                <Container>
                    <h2 className="text-center title-products">Productos Destacados</h2>
                    <div className="round-corner-square">
                        {products.map((product, index) => (
                            <Card key={index}>
                                <Card.Img variant="top" src="" />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>{product.specifications}</Card.Text>
                                    <div className="position-absolute top-0 start-0 mt-2 ms-2">
                                        <span className="badge bg-success badge-pill" style={{ fontSize: "1.25rem" }}>Precio: ${product.price}</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                        <div className="button-container">
                            <Button onClick={handleClickProducts} variant="primary" className="mt-3">
                                Ir a Productos
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="home-about">
                <Container>
                    <h2 className="text-center title-about text-success fw-bold mb-4">Sobre Nosotros</h2>
                    <Row className="justify-content-center">
                        <Col md={4} className="text-center">
                            <div className="about-icon">
                                <TbDrone size={50} className="text-success mb-3" />
                            </div>
                            <h3 className="text-white mb-3">Productos de Calidad</h3>
                            <p className="text-white">
                                Ofrecemos drones de alta calidad diseñados para fotografía aérea y videografía.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="about-icon">
                                <FaCamera size={50} className="text-success mb-3" />
                            </div>
                            <h3 className="text-white mb-3">Captura Increíble</h3>
                            <p className="text-white">
                                Descubre nuevas perspectivas y captura imágenes impresionantes desde el aire.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="about-icon">
                                <FaEnvelope size={50} className="text-success mb-3" />
                            </div>
                            <h3 className="text-white mb-3">Contáctanos</h3>
                            <p className="text-white">
                                ¿Tienes alguna pregunta? ¡Estamos aquí para ayudarte! Contáctanos para obtener más
                                información.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    );
};

export default Home;
