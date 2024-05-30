import React from "react";
import "./header.css";
import { Button, Container, Nav, Navbar, Badge } from "react-bootstrap";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { PiDrone } from "react-icons/pi";
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../AuthContext';

const Header = () => {
    const location = useLocation();
    const { isAuthorized, userType } = useAuth();
    const navigate = useNavigate();

    // Get cart items from sessionStorage
    const cartItems = JSON.parse(sessionStorage.getItem("cart")) || [];
    const cartItemCount = cartItems.length;

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("seller");
        localStorage.removeItem("client");
        sessionStorage.removeItem("cart");
        navigate("/");
        window.location.reload(); // Reload to reset context
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <strong>AirPixel</strong>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link as={Link} to="/" active={isActive("/")}>
                            <FaHome className="me-1" />
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/products" active={isActive("/products")}>
                            <PiDrone className="me-1" />
                            Productos
                        </Nav.Link>
                        {isAuthorized && userType === 'SELLER' && (
                            <Nav.Link as={Link} to="/admClient" active={isActive("/admClient")}>
                                <RiAdminFill className="me-1" />
                                Administración
                            </Nav.Link>
                        )}
                        <Nav.Link as={Link} to="/cart" disabled={!isAuthorized} active={isActive("/cart")}>
                            <FaShoppingCart className="me-1" />
                            Carrito
                            {cartItemCount > 0 && <Badge bg="secondary">{cartItemCount}</Badge>}
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-3">
                        {isAuthorized ? (
                            <Button onClick={handleLogout} variant="danger" className="ms-2 rounded-pill shadow">
                                Cerrar sesión
                            </Button>
                        ) : (
                            <Button as={Link} to="/login" variant="primary" className="ms-2 rounded-pill shadow">
                                Iniciar sesión
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
