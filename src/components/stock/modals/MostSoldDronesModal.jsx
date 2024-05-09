import React, {useEffect, useState} from "react";
import {Modal, ModalBody, ModalHeader} from "react-bootstrap";
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
                Drones más vendidos
            </ModalHeader>
            <ModalBody>
                <p><strong>Drones más vendidos</strong></p>

            </ModalBody>
        </Modal>
    )
}

export default MostSoldDronesModal;