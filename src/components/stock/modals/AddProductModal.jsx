import React from "react";
import {Button, Form, Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap";

const AddProductModal = ({show, handleClose, handleAdd}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Agregar Producto</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Form.Group controlId='formName'>
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control type='text' placeholder='Producto' ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formStock'>
                        <Form.Label>Cantidad del producto</Form.Label>
                        <Form.Control type='number' placeholder='Cantidad'
                                      min='1'></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formPrice'>
                        <Form.Label>Precio unitario</Form.Label>
                        <Form.Control placeholder='Precio'></Form.Control>
                        <Form.Text>Precio en Bs.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId='formModel'>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type='text'></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formSpecifications'>
                        <Form.Label>Especificaciones</Form.Label>
                        <Form.Control type='text'></Form.Control>
                    </Form.Group>
                </Form>
            </ModalBody>
            <Modal.Footer>
                <Button variant='primary'>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddProductModal