import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom"; // Import useHistory hook
import {Button, Card, Container} from "react-bootstrap";

const Home = () => {
    const navigate = useNavigate(); // Obtener la historia de un objeto de navegación

    // Funcion para ejecutar luego de un click
    const handleClickBanner = () => {
        //Navigate to Products Page
        navigate("/login");
    };

    const handleClickProducts = () => {
        //Navigate to Products Page
        navigate("/products");
    }

    return (
        <div className="home">
            <section className="home-banner">
                <div className="home-banner-content">
                    <h1 className="text-success">AirPixel</h1>
                    <p className="text-white">Lleva el la altura de tus fotos al siguiente nivel</p>
                    <Button onClick={handleClickBanner} variant="success">Ver Productos</Button>
                </div>
            </section>

            <section className="home-topproducts">
                <Container>
                    <h2 className="text-center title-products">Productos Destacados</h2>
                    <div className="round-corner-square">
                        {[...Array(6)].map((_, index) => (
                            <Card key={index}>
                                <Card.Img variant="top" src={`src/assets/products-img/dron-${index+1}.jpg`} />
                                <Card.Body>
                                    <Card.Title>Producto {index + 1}</Card.Title>
                                    <Card.Text>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc ultricies lacinia.
                                    </Card.Text>
                                    <Button variant="success">Agregar al Carrito</Button>
                                </Card.Body>
                            </Card>
                        ))}
                        <div className="button-container"> {/* Wrap the button in its own div */}
                            <Button onClick={handleClickProducts} variant="primary" className="mt-3">Ir a Productos</Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="home-about">
                <Container>
                    <h2 className="text-center title-about">Sobre Nosotros</h2>
                    <p className="text-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec odio vitae nunc ultricies
                        lacinia. Sed ac risus sit amet nunc vestibulum fermentum. Nulla facilisi. Nullam nec turpis
                        tempor, ultricies risus sit amet, fermentum justo. Nullam nec turpis tempor, ultricies risus
                        sit amet, fermentum justo.
                    </p>
                </Container>
            </section>
        </div>
    );
}

export default Home;







