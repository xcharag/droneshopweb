import React, {useEffect, useState} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader} from "react-bootstrap";

const EditProductModal = ({show, handleClose, productData}) => {
    const [editedProduct, setEditedProduct] = useState(null);

    useEffect(() => {
        setEditedProduct(productData)
    }, [productData]);

    if(!editedProduct) {
        return null;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton={true}>
                <Modal.Title>Editar Producto</Modal.Title>
            </ModalHeader>

            <ModalBody>
                <Form>
                    <Form.Group controlId='formName'>
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control type='text' placeholder='Ingrese el nombre' value={editedProduct.name}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formStock'>
                        <Form.Label>Cantidad del producto</Form.Label>
                        <Form.Control type='number' min='1' value={editedProduct.stock}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formPrice'>
                        <Form.Label>Precio Unitario</Form.Label>
                        <Form.Control value={editedProduct.price}></Form.Control>
                        <Form.Text>Precio en Bs.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId='formModel'>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type='text' value={editedProduct.model}></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formSpecifications'>
                        <Form.Label>Especificaciones</Form.Label>
                        <Form.Control type='text' value={editedProduct.specifications}></Form.Control>
                    </Form.Group>
                </Form>
            </ModalBody>

            <Modal.Footer>
                <Button variant='primary'>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditProductModal;