import React, { useState, useEffect } from 'react';
import { Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function ResponsiveSideBar() {
    const [show, setShow] = useState(true);
    const location = useLocation();
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (location.pathname === '/admClient') {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [location.pathname]);

    return (
        <>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menú</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/login">Iniciar sesión</Nav.Link>
                        <Nav.Link as={Link} to="/admClient">Administrar clientes</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default ResponsiveSideBar;