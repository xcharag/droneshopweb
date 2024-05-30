import React, {useState} from 'react';
import {Button, Nav, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useQuery} from "@apollo/client";
import TopSellersModal from "../bestSellers/modals/topSellersModal.jsx";

function staticSidebar() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [showTopSellersModal, setShowTopSellersModal] = useState(false);
    const openTopSellersModal = () => {
        setShowTopSellersModal(true);
    };
    const closeTopSellersModal = () => {
        setShowTopSellersModal(false);
    };

    return (
        <div style={{
            width: '200px',
            backgroundColor: '#212529',
            color:'white',
            padding: '20px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            zIndex: 1000,
        }}>
            <Nav className="flex-column" style={{ flexGrow: 1 }}>
                <Navbar.Brand as={Link} to="/" className="text-center w-100 mb-4" style={{ fontSize: '24px' }}>
                    <strong>AirPixel</strong>
                </Navbar.Brand>
                <div style={{marginTop: '50px', flexGrow: 1 }}>
                    <div className="d-grid gap-2">
                        <Button as={Link} to="/" variant="secondary" size= "sm" className="mb-2">Inicio</Button>
                        <Button as={Link} to="/admClient" variant="secondary" size= "sm" block>Administrar Clientes</Button>
                        <Button as={Link} to="/stock" variant="secondary" size= "sm" block>Administrar Productos</Button>
                        <Button as={Link} to="/orders" variant="secondary" size= "sm" block>Ver Órdenes</Button>
                        <Button variant='success' size='sm' onClick={openTopSellersModal}>Mejores vendedores</Button>
                    </div>
                </div>
            </Nav>
            <TopSellersModal show={showTopSellersModal} handleHide={closeTopSellersModal} />
        </div>
    );
}
export default staticSidebar;
