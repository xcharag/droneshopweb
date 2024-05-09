import React from 'react';
import {Button, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function staticSidebar() {
    return (
        <div style={{
            width: '200px',
            backgroundColor: '#212529',
            color:'white',
            padding: '20px',
            minHeight: '100vh', // Agregar esta línea
            display: 'flex', // Agregar esta línea
            flexDirection: 'column', // Agregar esta línea
        }}>
            <Nav className="flex-column" style={{ flexGrow: 1 }}>
                <Navbar.Brand as={Link} to="/" className="text-center w-100 mb-4" style={{ fontSize: '24px' }}>
                    <strong>AirPixel</strong>
                </Navbar.Brand>
                <div style={{marginTop: '50px', flexGrow: 1 }}>
                    <div className="d-grid gap-2">
                        <Button as={Link} to="/" variant="secondary" size= "sm" className="mb-2">Inicio</Button>
                        <Button as={Link} to="/admClient" variant="secondary" size= "sm" block>Administrar Clientes</Button>
                    </div>
                </div>
            </Nav>
        </div>
    );
}
export default staticSidebar;
