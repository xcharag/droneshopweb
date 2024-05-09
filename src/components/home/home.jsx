import React, {useEffect} from "react";
import "./home.css";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import { FaCamera, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'; // Import icons from react-icons library
import { TbDrone } from 'react-icons/tb';
import Header from "../header/header.jsx"; // Import custom icon

const Home = () => {
    const navigate = useNavigate(); // Obtener la historia de un objeto de navegación

    const handleClickProducts = () => {
        //Navigate to Products Page
        navigate("/products");
    }

    return (
        <div className="home">
            <Header/>
            <section className="home-banner drone-scroll-animation">
                <div className="home-banner-content">
                    <h1 className="text-success">AirPixel</h1>
                    <p className="text-white">Lleva el la altura de tus fotos al siguiente nivel</p>
                    <Button onClick={handleClickProducts} variant="success">Ver Productos</Button>
                </div>
            </section>

            <section className="home-topproducts">
                <Container>
                    <h2 className="text-center title-products">Productos Destacados</h2>
                    <div className="round-corner-square">
                        {[...Array(6)].map((_, index) => (
                            <Card key={index}>
                                <Card.Img variant="top" src={`src/assets/products-img/dron-${index + 1}.jpg`}/>
                                <Card.Body>
                                    <Card.Title>Producto {index + 1}</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae
                                        nunc ultricies lacinia.
                                    </Card.Text>
                                    <Button variant="success">Agregar al Carrito</Button>
                                </Card.Body>
                            </Card>
                        ))}
                        <div className="button-container"> {/* Wrap the button in its own div */}
                            <Button onClick={handleClickProducts} variant="primary" className="mt-3">Ir a
                                Productos</Button>
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
                                <TbDrone size={50} className="text-success mb-3"/>
                            </div>
                            <h3 className="text-white mb-3">Productos de Calidad</h3>
                            <p className="text-white">
                                Ofrecemos drones de alta calidad diseñados para fotografía aérea y videografía.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="about-icon">
                                <FaCamera size={50} className="text-success mb-3"/>
                            </div>
                            <h3 className="text-white mb-3">Captura Increíble</h3>
                            <p className="text-white">
                                Descubre nuevas perspectivas y captura imágenes impresionantes desde el aire.
                            </p>
                        </Col>
                        <Col md={4} className="text-center">
                            <div className="about-icon">
                                <FaEnvelope size={50} className="text-success mb-3"/>
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
}

export default Home;







