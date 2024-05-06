import React from "react";
import "./header.css";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="#"><strong>AirPixel</strong></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <Nav.Link href="#">Inicio</Nav.Link>
                        <Nav.Link href="#">Productos</Nav.Link>
                        <Nav.Link href="#" disabled>
                            <i className="fas fa-shopping-cart"></i>
                        </Nav.Link>
                    </Nav>
                    <Nav className="ms-3">
                        <Button onClick={handleClick} variant="primary" className="ms-2 rounded-pill shadow">Iniciar sesión</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;