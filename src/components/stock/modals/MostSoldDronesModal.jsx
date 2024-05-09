import React, {useEffect, useState} from "react";
import {Button, ListGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "react-bootstrap";
import {useLazyQuery, useMutation} from "@apollo/client";
import {GET_TOP_SELLING_PRODUCTS} from "../gql/query.js";
const MostSoldDronesModal = ({show, handleHide}) => {
    const [getTopSellingProducts] = useLazyQuery(GET_TOP_SELLING_PRODUCTS);
    const [topSellingProducts, setTopSellingProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        try {
            const products = await getTopSellingProducts();

            if(products) {
                setTopSellingProducts(products.data.getTopSoldProducts);
            }
            else {
                console.error('No hay productos')
            }
        } catch (e) {
            throw new Error(e);
        }
    }

    return (
        <Modal show={show} onHide={handleHide}>
            <ModalHeader closeButton>
                <Modal.Title className='fw-bold'>Drones más vendidos</Modal.Title>
            </ModalHeader>
            <ModalBody>
                <ListGroup as='ol' numbered>
                    {topSellingProducts.map((product) => (
                        <ListGroup.Item key={product.id}
                                        as='li'
                                        className='d-flex justify-content-between align-items-start'
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{product.name}</div>
                                <p>Cantidad vendida: {product.totalQuantity}</p>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <Button variant='primary' onClick={handleHide}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default MostSoldDronesModal;