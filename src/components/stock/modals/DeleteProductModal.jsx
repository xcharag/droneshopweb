import React, {useEffect, useState} from "react";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {DELETE_PRODUCT} from "../gql/mutations.js";

const DeleteProductModal = ({show, handleClose, product, reloadProducts}) => {
    const [productToDelete, setProductToDelete] = useState(null);
    const [deleteProduct, {loading, error}] = useMutation(DELETE_PRODUCT);

    useEffect(() => {
        setProductToDelete(product);
    }, [product]);
    console.log(productToDelete);

    if(!productToDelete) {
        return null;
    }
    const handleDelete = async() => {
        await deleteProduct({
            variables: {
                deleteProductId: productToDelete.id
            }
        });

        setProductToDelete({
            name: '',
            stock: 0,
            price: 0,
            model: '',
            specifications: ''
        });
        reloadProducts();
        handleClose();
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Eliminar Producto</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <p>¿Estás seguro de que quieres eliminar este producto?</p>
            </ModalBody>

            <ModalFooter>
                <Button variant='secondary' onClick={() => handleClose()}>
                    Cancelar
                </Button>

                <Button variant='danger' onClick={() => handleDelete()}>
                    Eliminar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteProductModal;