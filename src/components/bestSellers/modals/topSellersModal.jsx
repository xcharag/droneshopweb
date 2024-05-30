import { Button, ListGroup, Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_TOP_SELLER } from "../gql/query.js";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const TopSellersModal = ({ show, handleHide }) => {
    const [getTopSeller, { data, loading, error }] = useLazyQuery(GET_TOP_SELLER);
    const [topSellers, setTopSellers] = useState([]);

    useEffect(() => {
        getSellers()
    },[]);
    const getSellers = async () => {
        try {
            const { data } = await getTopSeller();
            if (data) {
                setTopSellers(data.getTopSellers);
            } else {
                console.error('No hay vendedores');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Modal show={show} onHide={handleHide}>
            <ModalHeader closeButton>
                <Modal.Title className="fw-bold">Mejores vendedores</Modal.Title>
            </ModalHeader>
            <ModalBody>
                <ListGroup as="ol" numbered>
                    {topSellers.map((seller) => (
                        <ListGroup.Item
                            key={seller.id}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{seller.name} {seller.lastName}</div>
                            </div>
                            <span className="badge bg-secondary rounded-pill">${seller.totalSpent}</span>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <Button variant="primary" onClick={handleHide}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default TopSellersModal;