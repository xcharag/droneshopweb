import React from "react";
import "./footer.css";
import {Container, Navbar} from "react-bootstrap";

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
            <Container>
                <Navbar.Text>Copyright © 2024 AirPixel</Navbar.Text>
            </Container>
        </Navbar>
    );
}

export default Footer;