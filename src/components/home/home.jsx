import React, { useEffect, useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container } from "react-bootstrap";
import { GET_PRODUCTS_QUERY } from "./queries/queries.js";
import { useLazyQuery } from "@apollo/client";
import Header from "../header/header.jsx";

const Home = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    // UseLazyQuery to fetch products
    const [getProducts, { loading, data }] = useLazyQuery(GET_PRODUCTS_QUERY);

    // Fetch products when component mounts
    useEffect(() => {
        getProducts();
    }, [getProducts]);

    // Update state with fetched products
    useEffect(() => {
        if (data) {
            setProducts(data.getAllProducts);
        }
    }, [data]);

    const handleClickProducts = () => {
        navigate("/products");
    };

    return (
        <div className="home">
            <Header />
            <section className="home-banner drone-scroll-animation">
                {/* Banner Content */}
            </section>

            <section className="home-topproducts">
                <Container>
                    <h2 className="text-center title-products">Productos Destacados</h2>
                    <div className="round-corner-square">
                        {products.map((product, index) => (
                            <Card key={index}>
                                <Card.Img variant="top" src={`src/assets/products-img/dron-${index + 1}.jpg`} />
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
                        <div className="button-container">
                            <Button onClick={handleClickProducts} variant="primary" className="mt-3">
                                Ir a Productos
                            </Button>
                        </div>
                    </div>
                </Container>
            </section>

            <section className="home-about">
                {/* About Section */}
            </section>
        </div>
    );
};

export default Home;
