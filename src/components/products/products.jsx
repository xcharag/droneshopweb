import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCTS_QUERY } from "./queries/queries.js";
import Header from "../header/header.jsx";
import ProductCard from "./components/ProductCard.jsx";
import PriceFilter from "./components/PriceFilter.jsx";
import NameFilter from "./components/NameFilter.jsx";
import ModelFilter from "./components/ModelFilter.jsx";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [getProducts, { data }] = useLazyQuery(GET_PRODUCTS_QUERY);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitleColor, setModalTitleColor] = useState("");
    const [modalContent, setModalContent] = useState("");
    const [minPrice, setMinPrice] = useState(1);
    const [maxPrice, setMaxPrice] = useState(1); // Initially set to 1
    const [selectedPrice, setSelectedPrice] = useState(1); // Initially set to minimum price
    const [searchName, setSearchName] = useState(""); // State for name search
    const [searchModel, setSearchModel] = useState(""); // State for model search
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State for logged in status

    useEffect(() => {
        getProducts();
        // Check if user is logged in when component mounts
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, [getProducts]);

    useEffect(() => {
        if (data) {
            const updatedProducts = data.getAllProducts.map(product => {
                const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
                const totalQuantityInCart = cart.reduce((total, item) => {
                    if (item.id === product.id) {
                        return total + 1;
                    }
                    return total;
                }, 0);
                const remainingStock = product.stock - totalQuantityInCart;
                return { ...product, remainingStock };
            });
            setProducts(updatedProducts);
            // Calculate the maximum price from the products data
            const maxPriceFromProducts = Math.max(...updatedProducts.map(product => product.price));
            setMaxPrice(maxPriceFromProducts);
        }
    }, [data]);

    const handleAddToCart = (product) => {
        // Calculate total quantity of the same product in the cart
        const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
        const totalQuantityInCart = cart.reduce((total, item) => {
            if (item.id === product.id) {
                return total + 1;
            }
            return total;
        }, 0);

        // Check if there is enough stock available
        const remainingStock = product.stock - totalQuantityInCart;
        if (remainingStock > 0) {
            // Add the product to the cart
            const updatedCart = [...cart, product];
            sessionStorage.setItem("cart", JSON.stringify(updatedCart));
            setModalMessage("¡Producto añadido al carrito!");
            setModalTitleColor("text-success");
            setModalContent("¡Gracias, este producto te encantará!");
            // Update the remaining stock for the added product
            const updatedProducts = products.map(p => {
                if (p.id === product.id) {
                    return { ...p, remainingStock: p.remainingStock - 1 };
                }
                return p;
            });
            setProducts(updatedProducts);
        } else {
            setModalMessage("¡Stock insuficiente!");
            setModalTitleColor("text-danger");
            setModalContent("¡Lo siento, no hay suficiente stock para este producto!");
        }
        setShowModal(true);
    };

    const handlePriceChange = (event) => {
        const newPrice = parseInt(event.target.value);
        setSelectedPrice(newPrice);
    };

    const handleNameSearchChange = (event) => {
        setSearchName(event.target.value);
    };

    const handleModelSearchChange = (event) => {
        setSearchModel(event.target.value);
    };

    return (
        <Container className="pb-5 mb-5">
            <Header />
            <h1 className="text-center mt-5 fw-bold">Todos los productos</h1>
            <div className="round-corner-square justify-content-center">
                <Row>
                    <Row className="gx-2 justify-content-evenly">
                        <Col xs={6} sm={4} md={3}>
                            <PriceFilter
                                selectedPrice={selectedPrice}
                                maxPrice={maxPrice}
                                handlePriceChange={handlePriceChange}
                            />
                        </Col>
                        <Col xs={6} sm={4} md={3}>
                            <NameFilter
                                searchName={searchName}
                                handleNameSearchChange={handleNameSearchChange}
                            />
                        </Col>
                        <Col xs={12} sm={4} md={3}>
                            <ModelFilter
                                searchModel={searchModel}
                                handleModelSearchChange={handleModelSearchChange}
                            />
                        </Col>
                    </Row>
                </Row>
            </div>

            <div className="round-corner-square">
                {products
                    .filter(product => product.price <= selectedPrice) // Filter products based on selected price
                    .filter(product => product.name.toLowerCase().includes(searchName.toLowerCase())) // Filter products based on name search
                    .filter(product => product.model.toLowerCase().includes(searchModel.toLowerCase())) // Filter products based on model search
                    .map((product, index) => (
                        <ProductCard
                            key={index}
                            product={product}
                            handleAddToCart={handleAddToCart}
                            isLoggedIn={isLoggedIn} // Pass isLoggedIn prop to ProductCard
                        />
                    ))}
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title className={modalTitleColor + " fw-bold"}>{modalMessage}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={modalTitleColor}>
                    {modalContent}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProductPage;
