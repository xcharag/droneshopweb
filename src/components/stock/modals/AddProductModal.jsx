import React, {useState} from "react";
import {Button, Form, Modal, ModalBody, ModalHeader, ModalTitle} from "react-bootstrap";
import {useMutation} from "@apollo/client";
import {NEW_PRODUCT} from "../gql/mutations.js";

const AddProductModal = ({show, handleClose, reloadProducts}) => {
    const [addProduct, {loading, error}] = useMutation(NEW_PRODUCT);
    const [formData, setFormData] = useState({
        name: '',
        stock: 0,
        price: 0,
        model: '',
        specifications: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }

    const handleAddProduct = async () => {
        try {
           await addProduct({
                variables: {
                    input: {
                        name: formData.name,
                        stock: parseInt(formData.stock),
                        price: parseFloat(formData.price),
                        model: formData.model,
                        specifications: formData.specifications
                    }
                }
            });

            setFormData({
                name: '',
                stock: 0,
                price: 0,
                model: '',
                specifications: ''
            });
            reloadProducts();
            handleClose();
        } catch (e) {
            console.error('Error adding product', error);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader closeButton>
                <ModalTitle>Agregar Producto</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <Form.Group controlId='formName'>
                        <Form.Label>Nombre del Producto</Form.Label>
                        <Form.Control type='text'
                                      placeholder='Producto'
                                      name="name"
                                      value={formData.name}
                                      onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='formStock'>
                        <Form.Label>Cantidad del producto</Form.Label>
                        <Form.Control type='number'
                                      placeholder='Cantidad'
                                      min='1'
                                      name='stock'
                                      value={formData.stock}
                                      onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='formPrice'>
                        <Form.Label>Precio unitario</Form.Label>
                        <Form.Control placeholder='Precio'
                                      name='price'
                                      value={formData.price}
                                      onChange={handleInputChange}
                        />
                        <Form.Text>Precio en Bs.</Form.Text>
                    </Form.Group>

                    <Form.Group controlId='formModel'>
                        <Form.Label>Modelo</Form.Label>
                        <Form.Control type='text'
                                      name='model'
                                      value={formData.model}
                                      onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Form.Group controlId='formSpecifications'>
                        <Form.Label>Especificaciones</Form.Label>
                        <Form.Control type='text-area'
                                      rows={5}
                                      name='specifications'
                                      value={formData.specifications}
                                      onChange={handleInputChange}

                        />
                    </Form.Group>
                </Form>
            </ModalBody>
            <Modal.Footer>
                <Button variant='primary'
                        onClick={() => handleAddProduct()}
                        disabled={loading}
                >
                    {loading ? "Agregando" : "Guardar Cambios"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default AddProductModal